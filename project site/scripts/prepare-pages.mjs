import {
  cpSync,
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const base = '/elvoconcceptsite/';
const projectRoot = resolve('project site');
const source = join(projectRoot, 'dist');
const output = join(projectRoot, '.pages-site');

if (!existsSync(join(source, 'index.html'))) {
  throw new Error('Production build not found at project site/dist.');
}

rmSync(output, { recursive: true, force: true });
cpSync(source, output, { recursive: true });

function rewritePaths(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      rewritePaths(path);
    } else if (/\.(html|js|css)$/.test(entry.name)) {
      const contents = readFileSync(path, 'utf8')
        .replaceAll('/assets/', `${base}assets/`)
        .replaceAll('/images/', `${base}images/`)
        .replaceAll('/favicon.svg', `${base}favicon.svg`);
      writeFileSync(path, contents);
    }
  }
}

rewritePaths(output);

const html = readFileSync(join(output, 'index.html'), 'utf8');
if (!html.includes(`${base}assets/`) || !html.includes(`${base}favicon.svg`)) {
  throw new Error('GitHub Pages paths were not applied to the generated site.');
}

console.log('Prepared GitHub Pages files in project site/.pages-site');