import fs from 'fs-extra';
import path from 'path';
import { transform } from 'babel-core';
import { babelrc } from 'babel-settings';
import importLocale from './';
import exportLocale from '../exportLocale';

const sourceFolder = './testData/importLocale';
const localizationFolder = './localization/importLocale';

async function clean() {
  await fs.emptyDir(sourceFolder);
  await fs.emptyDir(localizationFolder);
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
      concat: 'item1' + 'item2',
      template: \`hello
      world\`,
      419: 'number as key',
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
    exportLocale(config);
  });
  afterEach(clean);
  test('should throw when supportedLocales is not defined', () => {
    expect(() => importLocale()).toThrow('options.supportedLocales is missing');
  });
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
    importLocale(config);
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
    expect(json.concat).toBe('item1item2');
    expect(json.template).toBe(`hello
      world`);
    expect(json[419]).toBe('number as key');
  });
  test('should generate annotations', async () => {
    importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    expect(content.indexOf(`// @key: ${encodeValue('modern')} @source: ${encodeValue('rogue')}`) > -1).toBe(true);
    expect(content.indexOf(`// @key: ${encodeValue('whisky')} @source: ${encodeValue('Vault')}`) > -1).toBe(true);
    expect(content.indexOf(`// @key: ${encodeValue('[obj.key]')} @source: ${encodeValue('testValue')}`) > -1).toBe(true);
    expect(content.indexOf(`// @key: ${encodeValue('newline')} @source: ${encodeValue('containes\nnewline')}`) > -1).toBe(true);
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
    importLocale(config);
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

  test('should skip keys that no longer exist', async () => {
    const xlfPath = path.resolve(localizationFolder, 'en-GB.xlf');
    const xlfContent = await fs.readFile(xlfPath, 'utf8');
    await fs.writeFile(xlfPath, xlfContent.replace(
      '<source>Vault</source',
      '<source>Changed</source>'
    ).replace(
      '<source>testValue</source',
      '<source>testValueChanged</source>'
    ));
    importLocale(config);
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

  test('should remove keys that no longer exist in source', async () => {
    importLocale(config);
    const xlfPath = path.resolve(localizationFolder, 'en-GB.xlf');
    await fs.remove(xlfPath);
    await fs.writeFile(path.resolve(sourceFolder, 'en-US.js'), `
      const obj = {
        key: 'testKey',
      };

      export default {
        whisky: 'Vault',
        [obj.key]: 'testValue',
        'single-quote': 'Single Quote',
        "double-'quote'": "Double Quote",
      };
    `);
    importLocale(config);

    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelrc).code);
    }).not.toThrow();
    expect(json.modern).toBe(undefined);
    expect(json.newline).toBe(undefined);
  });

  test('should remove keys that the source value has changed', async () => {
    importLocale(config);
    const xlfPath = path.resolve(localizationFolder, 'en-GB.xlf');
    await fs.remove(xlfPath);
    await fs.writeFile(path.resolve(sourceFolder, 'en-US.js'), `
      const obj = {
        key: 'testKey',
      };

      export default {
        modern: 'changed',
        whisky: 'Vault',
        [obj.key]: 'testValue',
        newline: 'alsoChanged',
        'single-quote': 'Single Quote',
        "double-'quote'": "Double Quote",
        concat: 'item1' + 'item2',
        template: \`hello
        world\`,
      };
    `);
    importLocale(config);

    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelrc).code);
    }).not.toThrow();
    expect(json.modern).toBe(undefined);
    expect(json.newline).toBe(undefined);
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
    exportLocale(config);
    importLocale(config);
    const filePath = path.resolve(sourceFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, 'utf8');
    expect(() => {
      eval(transform(content, babelrc).code);
    }).not.toThrow();
  });
});
