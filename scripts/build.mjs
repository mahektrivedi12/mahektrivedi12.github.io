import { cp, mkdir, rm, writeFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('The output folder must be this project’s dist folder.');
}

// Only website source and public assets enter the published directory.
const entries = ['index.html', 'styles.css', 'script.js', 'assets'];
for (const entry of entries) {
  if ((await lstat(path.join(root, entry))).isSymbolicLink()) {
    throw new Error(`Unexpected symbolic link: ${entry}`);
  }
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true, dereference: false });
}
await writeFile(path.join(output, '.nojekyll'), '');
console.log('Built dist/ with only the page, styles, JavaScript, and public assets.');
