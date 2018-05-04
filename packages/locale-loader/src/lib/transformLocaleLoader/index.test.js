import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import gulp from 'gulp';
import transformLocaleLoader from './';
import formatLocale from '../formatLocale';

/* global describe it before after */

const testFolder = './testData';

const files = [
  'en_us.js',
  'FR-FR.JS',
  'aa-AAAA-ZZ.JS',
];

function transform() {
  return new Promise((resolve, reject) => {
    gulp.src(path.resolve(testFolder, 'loadLocale.js'))
    .pipe(transformLocaleLoader())
    .pipe(gulp.dest(path.resolve(testFolder, 'output')))
    .on('end', resolve)
    .on('error', reject);
  });
}

describe('transformLocaleLoader', () => {
  before(async () => {
    await Promise.all(files.map(f => (
      fs.ensureFile(path.resolve(testFolder, f))
    )));
  });
  after(async () => {
    await fs.emptyDir(testFolder);
  });
  it('should transform loader comment to code', async () => {
    const content = '/* loadLocale */';
    await fs.writeFile(path.resolve(testFolder, 'loadLocale.js'), content);
    await transform();
    const outputPath = path.resolve(testFolder, 'output', 'loadLocale.js');
    expect(await fs.exists(outputPath)).to.equal(true);
    expect(await fs.readFile(outputPath, 'utf8')).to.not.equal(content);
  });
  it('should skip non loader files', async () => {
    const content = '/* not a loader */';
    await fs.writeFile(path.resolve(testFolder, 'loadLocale.js'), content);
    await transform();
    const outputPath = path.resolve(testFolder, 'output', 'loadLocale.js');
    expect(await fs.exists(outputPath)).to.equal(true);
    expect(await fs.readFile(outputPath, 'utf8')).to.equal(content);
  });
});
