import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import getLoaderFiles from './';

/* global describe it before after */

const testFolder = './testData';
const loaderContent = '/* loadLocale */';
const loaderFiles = [
  'file1.js',
  'file2.js',
  path.normalize('dir/file3.js'),
].sort();
const otherFiles = [
  'dummy1.js',
  'dummy2.js',
  path.normalize('dir/dummy3.js'),
].sort();

describe('getLoaderFiles', () => {
  before(async () => {
    await fs.remove(testFolder);
    await fs.ensureDir(path.resolve(testFolder, './dir'));
    await Promise.all(loaderFiles.map(file => (
      fs.writeFile(path.resolve(testFolder, file), loaderContent)
    )));
    await Promise.all(otherFiles.map(file => (
      fs.writeFile(path.resolve(testFolder, file), (new Date()).toISOString())
    )));
  });
  after(async () => {
    await fs.remove(testFolder);
  });
  it('should get all the loader files', async () => {
    const files = await getLoaderFiles(testFolder);
    expect(files.map(file => path.relative(testFolder, file)).sort()).to.deep.equal(loaderFiles);
  });
});
