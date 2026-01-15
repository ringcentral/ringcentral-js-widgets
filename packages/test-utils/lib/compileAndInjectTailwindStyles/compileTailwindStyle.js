/**
 * This script compiles the Tailwind CSS styles and injects them into the Jest preview.
 * It is used by the Jest preview to compile the Tailwind CSS styles and inject
 * them into
 * the Jest preview.
 *
 * `node compileTailwindStyle.js ${projectRootPath} ${scssFilePath}`
 *
 * @example
 * `node compileTailwindStyle.js /Users/xyz/app-demo /src/main.global.scss`
 */

/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const sass = require('sass');
const tailwindcss = require('tailwindcss');

async function compileAndCacheTailwindStyles(
  sassRootPath,
  tailwindConfigPath,
  cacheFilePath,
) {
  const result = await sass.compileAsync(sassRootPath);

  // Process the compiled CSS with Tailwind
  const processedResult = await postcss([
    tailwindcss(tailwindConfigPath),
    require('autoprefixer'),
  ]).process(result.css.toString(), { from: undefined });

  // Save to cache file
  try {
    await fs.ensureDir(path.dirname(cacheFilePath));
    await fs.writeFile(cacheFilePath, processedResult.css, 'utf-8');
    console.log('write cache file success:', cacheFilePath);
  } catch (error) {
    console.log('Failed to write cache file:', error);
  }
}

const [projectRootPath, scssFilePath] = process.argv.slice(2);

const finalUrl = './node_modules/jest-preview/cli/server/tailwind.css';
const cacheFilePath = path.join(projectRootPath, '../../', finalUrl);
const sassRootPath = path.join(projectRootPath, scssFilePath);
const tailwindConfigPath = path.join(projectRootPath, './tailwind.config.js');

if (
  !fs.pathExistsSync(sassRootPath) ||
  !fs.pathExistsSync(tailwindConfigPath)
) {
  console.log(
    `The file ${sassRootPath} does not exist. Skipping compiling and injecting Tailwind CSS.`,
  );
}

console.log('compileAndInjectTailwindStyles', projectRootPath);
// Check if cache exists and is valid

(async () => {
  await compileAndCacheTailwindStyles(
    sassRootPath,
    tailwindConfigPath,
    cacheFilePath,
  );
})();
