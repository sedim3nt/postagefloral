# Postage Floral Mirror

Static GitHub Pages mirror of `https://www.postagefloral.com`.

## Commands

- `npm run mirror` downloads the current site pages and Squarespace-hosted images into `site/`.
- `npm run verify` compares local output against the live site for page text, titles, and downloaded asset references.

## Deploy

Push to `main` and GitHub Pages will publish the `site/` directory. The custom domain is set via `site/CNAME`.
