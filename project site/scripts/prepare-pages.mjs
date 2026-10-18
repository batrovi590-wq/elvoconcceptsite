import {
  cpSync,
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
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

const html = readFileSync(join(output, 'index.html'), 'utf8');
if (
  !html.includes(`${base}assets/`) ||
  !html.includes(`${base}favicon.svg`) ||
  !html.includes(`${base}images/hero-complex.jpg`)
) {
  throw new Error('GitHub Pages paths were not applied to the generated site.');
}

const scriptFiles = readdirSync(join(output, 'assets')).filter((file) => file.endsWith('.js'));
const scripts = scriptFiles.map((file) => readFileSync(join(output, 'assets', file), 'utf8'));
const imagePaths = [
  'hero-complex.jpg',
  'philosophy-terrace.jpg',
  'architecture-card.jpg',
  'interior-main.jpg',
  'optimized/gallery-terrace-view.webp',
  'optimized/interior-kitchen.webp',
];

if (!scripts.some((script) => script.includes(base))) {
  throw new Error('Site image URLs are missing the GitHub Pages base path.');
}

for (const imagePath of imagePaths) {
  if (
    !scripts.some((script) => script.includes(`images/${imagePath}`)) ||
    !existsSync(join(output, 'images', imagePath))
  ) {
    throw new Error(`Referenced site image not found: ${imagePath}`);
  }
}

console.log('Prepared GitHub Pages files in project site/.pages-site');