import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const css = await readFile(path.join(root, 'styles.css'), 'utf8');
const failures = [];
const requireCheck = (condition, message) => { if (!condition) failures.push(message); };
const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]);
const idSet = new Set(ids);
requireCheck(ids.length === idSet.size, 'HTML ids must be unique.');
requireCheck(/<html\b[^>]*\blang=["']en["']/i.test(html), 'Set the page language to English.');
requireCheck((html.match(/<h1\b/gi) || []).length === 1, 'Use exactly one main heading.');
requireCheck(/<main\b/i.test(html), 'Add a main landmark.');
requireCheck(/<nav\b/i.test(html), 'Add a navigation landmark.');
requireCheck(/<title>[^<]+<\/title>/i.test(html), 'Add a page title.');
requireCheck(/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html), 'Add a page description.');
requireCheck(/name=["']viewport["']/i.test(html), 'Add responsive viewport metadata.');
requireCheck(/property=["']og:title["']/i.test(html), 'Add social title metadata.');
requireCheck(/property=["']og:image["']/i.test(html), 'Add a social sharing image.');
requireCheck(/rel=["']canonical["']/i.test(html), 'Add the canonical site URL.');
requireCheck(/:focus-visible|:focus\b/.test(css), 'Add visible keyboard focus styling.');
requireCheck(/prefers-reduced-motion/.test(css), 'Respect the reduced-motion preference.');

const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
let previous = 0;
for (const [, level, content] of headings) {
  requireCheck(Number(level) <= previous + 1, `Heading levels should not skip from h${previous} to h${level}.`);
  requireCheck(content.replace(/<[^>]*>/g, '').trim().length > 0, 'Headings need readable text.');
  previous = Number(level);
}
for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
  requireCheck(/\balt\s*=\s*["'][^"']*["']/i.test(tag), 'Every image needs alt text, empty for decoration.');
}
for (const [tag, href] of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']*)["'][^>]*>/gi)) {
  requireCheck(Boolean(href) && href !== '#', 'Links need a meaningful destination.');
  requireCheck(!/^javascript:/i.test(href), 'Avoid JavaScript links.');
  if (/target=["']_blank["']/i.test(tag)) {
    requireCheck(/\brel=["'][^"']*noopener/i.test(tag), 'New-tab links need rel="noopener".');
  }
}

let localAssets = 0;
for (const [, url] of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
  if (url.startsWith('#')) {
    requireCheck(idSet.has(decodeURIComponent(url.slice(1))), `Missing in-page destination ${url}.`);
    continue;
  }
  if (/^(?:https?:|mailto:|tel:|data:)/i.test(url)) continue;
  const relative = decodeURIComponent(url.split(/[?#]/)[0]);
  const asset = path.resolve(root, relative);
  requireCheck(asset.startsWith(path.resolve(root) + path.sep), `Local asset escapes project: ${url}`);
  try {
    requireCheck((await stat(asset)).isFile(), `Not a file: ${url}`);
    localAssets++;
  } catch { failures.push(`Missing local asset: ${url}`); }
}
const resumePath = path.join(root, 'assets', 'Mahek-Trivedi-Resume.pdf');
try {
  const resume = await readFile(resumePath);
  requireCheck(resume.subarray(0, 5).toString() === '%PDF-', 'The resume must be a valid PDF file.');
  requireCheck(/href=["'](?:\.\/)?assets\/Mahek-Trivedi-Resume\.pdf["'][^>]*\bdownload\b/i.test(html), 'Provide a downloadable resume link.');
} catch { failures.push('The public resume PDF is missing.'); }

if (failures.length) {
  console.error(failures.map(message => `- ${message}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Site checks passed: ${headings.length} headings, ${ids.length} unique anchors, ${localAssets} local references, resume, metadata and accessibility hooks.`);
}
