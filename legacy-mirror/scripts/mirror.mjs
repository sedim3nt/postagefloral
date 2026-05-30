import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const siteDir = path.join(projectRoot, 'site');
const sourceOrigin = 'https://www.postagefloral.com';
const deployOrigin = 'https://postagefloral.spirittree.dev';
const imageHosts = new Set([
  'images.squarespace-cdn.com',
  'static1.squarespace.com'
]);

const seedPaths = ['/', '/about', '/contact', '/offerings', '/portfolio', '/snail-mail-club', '/cart'];

function normalizePagePathname(inputPathname) {
  let pathname = inputPathname || '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  pathname = pathname.replace(/\/+$/, '') || '/';
  return pathname;
}

function pageFileForPathname(pathname) {
  if (pathname === '/') return path.join(siteDir, 'index.html');
  const withoutLeadingSlash = pathname.replace(/^\/+/, '');
  return path.join(siteDir, withoutLeadingSlash, 'index.html');
}

function ensurePosix(p) {
  return p.split(path.sep).join('/');
}

function pageRelativeAssetPath(pagePathname, assetOutputFile) {
  const fromDir = path.dirname(pageFileForPathname(pagePathname));
  let relative = path.relative(fromDir, assetOutputFile);
  relative = ensurePosix(relative);
  if (!relative || relative === '') return './';
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return relative;
}

function normalizeUrlToken(token, baseUrl) {
  if (!token) return null;
  if (
    token === 'true' ||
    token === 'false' ||
    token.startsWith('data:') ||
    token.startsWith('mailto:') ||
    token.startsWith('tel:') ||
    token.startsWith('javascript:') ||
    token.startsWith('#')
  ) {
    return null;
  }

  try {
    const url = new URL(token, baseUrl);
    if (imageHosts.has(url.hostname) || url.hostname.endsWith('squarespace.com')) {
      url.protocol = 'https:';
    }
    if (url.hash) url.hash = '';
    return url;
  } catch {
    return null;
  }
}

function splitSrcset(value) {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => entry.split(/\s+/)[0])
    .filter(Boolean);
}

function collectUrlOccurrences(html, baseUrl) {
  const occurrences = [];
  const seen = new Set();
  const add = (raw) => {
    const trimmed = raw.trim();
    const url = normalizeUrlToken(trimmed, baseUrl);
    if (!url) return;
    const key = `${trimmed} -> ${url.toString()}`;
    if (seen.has(key)) return;
    seen.add(key);
    occurrences.push({ raw: trimmed, absolute: url.toString(), host: url.hostname, pathname: url.pathname });
  };

  const attrRegex = /(?:href|src|poster|data-src|data-image|data-load|data-animation-url|data-srcset|srcset)=["']([^"']+)["']/g;
  for (const match of html.matchAll(attrRegex)) {
    const rawValue = match[1];
    if (rawValue.includes(',')) {
      for (const item of splitSrcset(rawValue)) add(item);
    } else {
      add(rawValue);
    }
  }

  const cssUrlRegex = /url\(([^)]+)\)/g;
  for (const match of html.matchAll(cssUrlRegex)) {
    const rawValue = match[1].trim().replace(/^['"]|['"]$/g, '');
    add(rawValue);
  }

  const rawUrlRegex = /https?:\/\/[^"'()<>\s]+|\/\/[^"'()<>\s]+/g;
  for (const match of html.matchAll(rawUrlRegex)) add(match[0]);

  return occurrences;
}

function shouldQueuePage(url) {
  if (url.hostname !== 'www.postagefloral.com') return false;
  if (url.search) return false;
  if (/\.(?:jpg|jpeg|png|gif|svg|webp|ico|css|js|json|woff2?|ttf|eot|pdf|mp4)$/i.test(url.pathname)) {
    return false;
  }
  return true;
}

function shouldDownloadAsset(url) {
  if (!imageHosts.has(url.hostname)) return false;
  return /\.(?:jpg|jpeg|png|gif|svg|webp|ico)$/i.test(url.pathname);
}

function canonicalAssetUrlString(input) {
  const url = new URL(input);
  url.search = '';
  url.hash = '';
  return url.toString();
}

function sanitizeSegment(segment) {
  return segment.replace(/[^a-zA-Z0-9._-]/g, '_') || 'index';
}

function assetPathForUrl(absoluteUrl) {
  const url = new URL(absoluteUrl);
  const segments = url.pathname.split('/').filter(Boolean).map(sanitizeSegment);
  const lastSegment = segments.pop() || 'index';
  const ext = path.extname(lastSegment);
  const baseName = ext ? lastSegment.slice(0, -ext.length) : lastSegment;
  const suffix = url.search ? `__${createHash('sha1').update(url.search).digest('hex').slice(0, 10)}` : '';
  const finalName = `${baseName}${suffix}${ext || '.bin'}`;
  return path.join(siteDir, '_assets', sanitizeSegment(url.hostname), ...segments, finalName);
}

async function fetchWithRetry(url, mode) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      }
      if (mode === 'text') return response.text();
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function fetchText(url) {
  return fetchWithRetry(url, 'text');
}

async function fetchBuffer(url) {
  return fetchWithRetry(url, 'buffer');
}

function extractTitle(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1].trim() || '';
}

function hash(text) {
  return createHash('sha256').update(text).digest('hex');
}

function stripText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  await rm(siteDir, { recursive: true, force: true });
  await mkdir(siteDir, { recursive: true });

  const crawlQueue = [...seedPaths];
  const crawled = new Map();

  while (crawlQueue.length) {
    const pendingPath = normalizePagePathname(crawlQueue.shift());
    if (crawled.has(pendingPath)) continue;

    const pageUrl = new URL(pendingPath, sourceOrigin).toString();
    const html = await fetchText(pageUrl);
    const occurrences = collectUrlOccurrences(html, pageUrl);

    crawled.set(pendingPath, {
      pathname: pendingPath,
      url: pageUrl,
      title: extractTitle(html),
      sourceHtml: html,
      occurrences
    });

    for (const occurrence of occurrences) {
      const url = new URL(occurrence.absolute);
      if (!shouldQueuePage(url)) continue;
      const normalized = normalizePagePathname(url.pathname);
      if (!crawled.has(normalized)) crawlQueue.push(normalized);
    }
  }

  const assetMap = new Map();
  for (const page of crawled.values()) {
    for (const occurrence of page.occurrences) {
      const assetUrl = new URL(occurrence.absolute);
      if (!shouldDownloadAsset(assetUrl)) continue;
      const canonicalAssetUrl = canonicalAssetUrlString(assetUrl.toString());
      if (assetMap.has(canonicalAssetUrl)) continue;
      assetMap.set(canonicalAssetUrl, assetPathForUrl(canonicalAssetUrl));
    }
  }

  for (const [assetUrl, outputFile] of assetMap) {
    const buffer = await fetchBuffer(assetUrl);
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, buffer);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceOrigin,
    deployOrigin,
    pages: [],
    assets: []
  };

  for (const [assetUrl, outputFile] of assetMap) {
    manifest.assets.push({
      url: assetUrl,
      file: ensurePosix(path.relative(projectRoot, outputFile))
    });
  }

  for (const page of [...crawled.values()].sort((a, b) => a.pathname.localeCompare(b.pathname))) {
    let html = page.sourceHtml;

    html = html.replaceAll(sourceOrigin, deployOrigin);
    html = html.replaceAll(sourceOrigin.replace('https://', 'http://'), deployOrigin);

    for (const occurrence of page.occurrences) {
      const assetOutputFile = assetMap.get(canonicalAssetUrlString(occurrence.absolute));
      if (!assetOutputFile) continue;
      const relativeAssetPath = pageRelativeAssetPath(page.pathname, assetOutputFile);
      html = html.split(occurrence.raw).join(relativeAssetPath);
    }

    const pageOutputFile = pageFileForPathname(page.pathname);
    await mkdir(path.dirname(pageOutputFile), { recursive: true });
    await writeFile(pageOutputFile, html);

    manifest.pages.push({
      pathname: page.pathname,
      url: page.url,
      title: page.title,
      file: ensurePosix(path.relative(projectRoot, pageOutputFile)),
      sourceHash: hash(page.sourceHtml),
      outputHash: hash(html),
      sourceTextHash: hash(stripText(page.sourceHtml)),
      outputTextHash: hash(stripText(html))
    });
  }

  const rootHtml = await readFile(path.join(siteDir, 'index.html'), 'utf8');
  await writeFile(path.join(siteDir, '404.html'), rootHtml);
  await writeFile(path.join(siteDir, '.nojekyll'), '');
  await writeFile(path.join(siteDir, 'CNAME'), 'postagefloral.spirittree.dev\n');
  await writeFile(path.join(projectRoot, 'mirror-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`Mirrored ${manifest.pages.length} pages and ${manifest.assets.length} Squarespace-hosted assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
