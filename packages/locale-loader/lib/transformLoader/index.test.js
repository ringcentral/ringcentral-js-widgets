import fs from 'fs-extra';
import gulp from 'gulp';
import path from 'path';

import transformLocaleLoader from './';

const sourceFolder = './testData-transformLocaleLoader';

const files = ['en_us.js', 'FR-FR.JS', 'aa-AAAA-ZZ.JS'];

function transform(globs = path.resolve(sourceFolder, 'loadLocale.js')) {
  return new Promise((resolve, reject) => {
    gulp
      .src(globs)
      .pipe(transformLocaleLoader())
      .pipe(gulp.dest(path.resolve(sourceFolder, 'output')))
      .on('end', resolve)
      .on('error', reject);
  });
}

describe('transformLocaleLoader', () => {
  beforeAll(async () => {
    await Promise.all(
      files.map((f) => fs.ensureFile(path.resolve(sourceFolder, f))),
    );
  });
  afterAll(async () => {
    await fs.remove(sourceFolder);
  });
  test('should transform loader comment to code', async () => {
    const content = '/* loadLocale */';
    await fs.writeFile(path.resolve(sourceFolder, 'loadLocale.js'), content);
    await transform();
    const outputPath = path.resolve(sourceFolder, 'output', 'loadLocale.js');
    expect(await fs.exists(outputPath)).toBe(true);
    expect(await fs.readFile(outputPath, 'utf8')).not.toBe(content);
  });
  test('should skip non loader files', async () => {
    const content = '/* not a loader */';
    await fs.writeFile(path.resolve(sourceFolder, 'loadLocale.js'), content);
    await transform();
    const outputPath = path.resolve(sourceFolder, 'output', 'loadLocale.js');
    expect(await fs.exists(outputPath)).toBe(true);
    expect(await fs.readFile(outputPath, 'utf8')).toBe(content);
  });
  test('should support transform folder (by ignore NULL content resource)', async () => {
    const content = '/* loadLocale */';
    await fs.writeFile(path.resolve(sourceFolder, 'loadLocale.js'), content);
    await transform(sourceFolder);
    const outputPath = path.resolve(sourceFolder, 'output', 'loadLocale.js');
    expect(await fs.exists(outputPath)).toBe(true);
    expect(await fs.readFile(outputPath, 'utf8')).not.toBe(content);
  });
});
