import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(projectRoot, 'mirror-manifest.json');

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

function extractTitle(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1].trim() || '';
}

function canonicalizeLiveImage(match) {
  try {
    const url = new URL(match.startsWith('//') ? `https:${match}` : match);
    url.protocol = 'https:';
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return match;
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const failures = [];

  for (const asset of manifest.assets) {
    const assetPath = path.join(projectRoot, asset.file);
    try {
      await access(assetPath);
    } catch {
      failures.push(`Missing asset: ${asset.file}`);
    }
  }

  for (const page of manifest.pages) {
    const liveHtml = await fetch(page.url).then((response) => response.text());
    const localHtml = await readFile(path.join(projectRoot, page.file), 'utf8');

    if (extractTitle(liveHtml) !== extractTitle(localHtml)) {
      failures.push(`Title mismatch on ${page.pathname}`);
    }

    if (stripText(liveHtml) !== stripText(localHtml)) {
      failures.push(`Text content mismatch on ${page.pathname}`);
    }

    const liveImageCount = [
      ...new Set(
        (
          liveHtml.match(
            /(?:https?:)?\/\/(?:images\.squarespace-cdn\.com|static1\.squarespace\.com)[^"'()<>\s]+\.(?:jpg|jpeg|png|gif|svg|webp|ico)(?:\?[^"'()<>\s]+)?/gi
          ) || []
        ).map(canonicalizeLiveImage)
      )
    ].length;
    const localImageCount = [
      ...new Set(
        localHtml.match(
          /(?:\.\.?\/|\/)_assets\/[^"'()<>\s]+\.(?:jpg|jpeg|png|gif|svg|webp|ico)/gi
        ) || []
      )
    ].length;

    if (liveImageCount !== localImageCount) {
      failures.push(`Image reference count mismatch on ${page.pathname}: live=${liveImageCount} local=${localImageCount}`);
    }
  }

  if (failures.length) {
    console.error('Verification failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Verified ${manifest.pages.length} pages and ${manifest.assets.length} assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
