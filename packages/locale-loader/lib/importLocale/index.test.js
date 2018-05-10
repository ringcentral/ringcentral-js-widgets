import fs from 'fs-extra';
import path from 'path';
import { transform } from 'babel-core';
import babelrc from 'babel-settings';
import importLocale from './';
import exportLocale from '../exportLocale';
import defaultConfig from '../../defaultConfig';

const {
  supportedLocales,
  sourceLocale,
} = defaultConfig;

const sourceFolder = './testData-importLocale';
const localizationFolder = './localization-importLocale';

async function clean() {
  await fs.remove(sourceFolder);
  await fs.remove(localizationFolder);
}

function encodeValue(str) {
  return `@#@${JSON.stringify(str)}@#@`;
}

async function generateSource() {
  await fs.ensureDir(sourceFolder);
  await fs.writeFile(path.resolve(sourceFolder, 'loadLocale.js'), '/* loadLocale */');
  await fs.writeFile(path.resolve(sourceFolder, 'en-US.js'), `
    const obj = {
      key: 'testKey',
    };

    export default {
      modern: 'rogue',
      whisky: 'Vault',
      [obj.key]: 'testValue',
      newline: 'containes\\nnewline',
      'single-quote': 'Single Quote',
      "double-'quote'": "Double Quote",
    };
  `);
}

describe('importLocale', () => {
  const config = {
    localizationFolder,
    sourceFolder,
    supportedLocales: ['en-US', 'en-GB']
  };
  beforeEach(async () => {
    await clean();
    await generateSource();
    await exportLocale(config);
  });
  afterEach(clean);
  test('should import generated xlf files', async () => {
    const xlfPath = path.resolve(localizationFolder, 'en-GB.xlf');
    const xlfContent = await fs.readFile(xlfPath, 'utf8');
    await fs.writeFile(xlfPath, xlfContent.replace(
      '<target>Vault</target',
      '<target>Changed</target>'
    ).replace(
      '<target>testValue</target',
      '<target>testValueChanged</target>'
      ));
    await importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelrc).code);
    }).not.toThrow();
    expect(json.modern).toBe('rogue');
    expect(json.whisky).toBe('Changed');
    expect(json.testKey).toBe('testValueChanged');
  });
  test('should generate annotations', async () => {
    await importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    expect(content.indexOf(`// @key: ${encodeValue('modern')} @source: ${encodeValue('rogue')}`) > -1).toBe(true);
    expect(content.indexOf(`// @key: ${encodeValue('whisky')} @source: ${encodeValue('Vault')}`) > -1).toBe(true);
    expect(content.indexOf(`// @key: ${encodeValue('[obj.key]')} @source: ${encodeValue('testValue')}`) > -1).toBe(true);
    expect(content.indexOf(`// @key: ${encodeValue('newline')} @source: ${encodeValue('containes\nnewline')}`) > -1).toBe(true);
  });
  test('should only import keys that exist in current source', async () => {
    await fs.writeFile(path.resolve(sourceFolder, 'en-US.js'), `
      const obj = {
        key: 'testKey',
      };

      export default {
        modern: 'rogue',
      };
    `);
    await importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelrc).code);
    }).not.toThrow();
    expect(json.modern).toBe('rogue');
    expect(json.whisky).toBe(undefined);
    expect(json.testKey).toBe(undefined);
  });
  test('should only import keys where its source value is identical to current source', async () => {
    const xlfPath = path.resolve(localizationFolder, 'en-GB.xlf');
    const xlfContent = await fs.readFile(xlfPath, 'utf8');
    await fs.writeFile(xlfPath, xlfContent.replace(
      '<source>Vault</source',
      '<source>Changed</source>'
    ).replace(
      '<source>testValue</source',
      '<source>testValueChanged</source>'
      ));
    await importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelrc).code);
    }).not.toThrow();
    expect(json.modern).toBe('rogue');
    expect(json.whisky).toBe(undefined);
    expect(json.testKey).toBe(undefined);
  });
  test('it should work for files without trailing comma', async () => {
    await fs.writeFile(path.resolve(sourceFolder, 'en-US.js'), `
      const obj = {
        key: 'testKey',
      };

      export default {
        modern: 'rogue',
        whisky: 'Vault',
        [obj.key]: 'testValue',
        newline: 'containes\\nnewline',
        'single-quote': 'Single Quote',
        "double-'quote'": "Double Quote",
        newKey: 'newKey'
      };
    `);
    await exportLocale(config);
    await importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    expect(() => {
      const json = eval(transform(content, babelrc).code);
    }).not.toThrow();
  });
});
