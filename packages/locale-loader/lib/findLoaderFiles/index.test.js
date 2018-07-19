import fs from 'fs-extra';
import path from 'path';
import findLoaderFiles from './';

const sourceFolder = './testData/getLoaderFiles';
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

describe('findLoaderFiles', () => {
  beforeAll(async () => {
    await fs.remove(sourceFolder);
    await fs.ensureDir(path.resolve(sourceFolder, './dir'));
    await Promise.all(loaderFiles.map(file => (
      fs.writeFile(path.resolve(sourceFolder, file), loaderContent)
    )));
    await Promise.all(otherFiles.map(file => (
      fs.writeFile(path.resolve(sourceFolder, file), (new Date()).toISOString())
    )));
  });
  afterAll(async () => {
    await fs.remove(sourceFolder);
  });
  test('should find all the loader files', async () => {
    const files = findLoaderFiles(sourceFolder);
    expect(files.map(file => path.relative(sourceFolder, file)).sort()).toEqual(loaderFiles);
  });
});
