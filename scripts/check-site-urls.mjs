import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname } from 'node:path';

// This is the deployment contract, deliberately independent of site configuration.
const expectedOrigin = 'https://blog.zsms.me';
const dist = new URL('../dist/', import.meta.url);
const base = process.argv[2] ? new URL(process.argv[2]) : null;
const images = new Set();

if (base) {
  assert(['https:', 'http:'].includes(base.protocol), 'Expected an HTTP(S) verification URL.');
}

const files = await readdir(dist, { recursive: true });
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const sitemaps = files.filter((file) => /^sitemap.*\.xml$/.test(file));
assert(htmlFiles.includes('index.html'), 'Build the site before checking URLs.');
assert(sitemaps.includes('sitemap-index.xml'), 'Missing sitemap index.');

async function readOutput(file) {
  if (!base) return readFile(new URL(file, dist), 'utf8');

  const pathname = file === 'index.html' ? '/' : `/${file.replace(/index\.html$/, '')}`;
  const response = await fetch(new URL(pathname, base), { signal: AbortSignal.timeout(15000) });
  assert(
    response.ok || (file === '404.html' && response.status === 404),
    `${pathname}: unexpected HTTP ${response.status}`,
  );
  return response.text();
}

async function checkUrl(value, label, image = false) {
  assert(value, `${label}: missing URL`);
  const url = new URL(value);
  assert.equal(url.origin, expectedOrigin, `${label}: incorrect production origin`);

  if (image) {
    images.add(url.pathname);
  } else if (label !== '404.html canonical' && label !== '404.html og:url') {
    const path = url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname;
    assert((await stat(new URL(`.${path}`, dist))).isFile(), `${label}: target not in build`);
  }
}

for (const file of htmlFiles) {
  const html = await readOutput(file);
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  await checkUrl(canonical, `${file} canonical`);

  for (const key of ['og:url', 'og:image', 'twitter:image']) {
    const tag = html.match(new RegExp(`<meta\\b[^>]*(?:property|name)="${key}"[^>]*content="([^"]+)"`));
    await checkUrl(tag?.[1], `${file} ${key}`, key.endsWith(':image'));
  }
}

for (const file of ['rss.xml', ...sitemaps]) {
  const xml = await readOutput(file);
  const tag = file === 'rss.xml' ? 'link' : 'loc';
  const urls = [...xml.matchAll(new RegExp(`<${tag}>([^<]+)</${tag}>`, 'g'))];
  assert(urls.length > 0, `${file}: no URLs found`);
  for (const [, url] of urls) await checkUrl(url, file);
}

const robots = await readOutput('robots.txt');
assert(robots.includes(`Sitemap: ${expectedOrigin}/sitemap-index.xml`), 'robots sitemap URL mismatch');

for (const path of images) {
  assert((await stat(new URL(`.${path}`, dist))).isFile(), `Missing image: ${path}`);
  if (base) {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, `Image ${path}: HTTP ${response.status}`);
    assert(response.headers.get('content-type')?.startsWith('image/'), `Not an image: ${path}`);
    await response.body?.cancel();
  } else {
    assert(extname(path), `Expected an image filename: ${path}`);
  }
}

console.log(`Verified ${htmlFiles.length} HTML pages, RSS, ${sitemaps.length} sitemaps, robots, and ${images.size} images against ${expectedOrigin} (${base ? base.origin : 'local build'}).`);
