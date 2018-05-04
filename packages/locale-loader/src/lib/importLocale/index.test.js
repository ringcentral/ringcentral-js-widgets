import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import { transform } from 'babel-core';
import importLocale from './';
import exportLocale from '../exportLocale';
import defaultConfig from '../../defaultConfig';

const {
  supportedLocales,
  sourceLocale,
} = defaultConfig;

const babelOptions = {
  presets: ['es2015', 'stage-0'],
  plugins: [
    'transform-runtime'
  ],
};

/* global describe it before after beforeEach afterEach */
/* eslint { no-eval: 0} */

const testFolder = './testData';
const localizationFolder = './localization';

async function clean() {
  await fs.emptyDir(testFolder);
  await fs.emptyDir(localizationFolder);
}

function encodeValue(str) {
  return `@#@${JSON.stringify(str)}@#@`;
}

async function generateSource() {
  await fs.writeFile(path.resolve(testFolder, 'loadLocale.js'), '/* loadLocale */');
  await fs.writeFile(path.resolve(testFolder, 'en-US.js'), `
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
    sourceFolder: testFolder,
    supportedLocales: ['en-US', 'en-GB']
  };
  beforeEach(async () => {
    await clean();
    await generateSource();
    await exportLocale(config);
  });
  afterEach(clean);
  it('should import generated xlf files', async () => {
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
    const filePath = path.resolve(testFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).to.equal(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelOptions).code);
    }).to.not.throw();
    expect(json.modern).to.equal('rogue');
    expect(json.whisky).to.equal('Changed');
    expect(json.testKey).to.equal('testValueChanged');
  });
  it('should generate annotations', async () => {
    await importLocale(config);
    const filePath = path.resolve(testFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).to.equal(true);
    const content = await fs.readFile(filePath, 'utf8');
    expect(content.indexOf(`// @key: ${encodeValue('modern')} @source: ${encodeValue('rogue')}`) > -1).to.equal(true);
    expect(content.indexOf(`// @key: ${encodeValue('whisky')} @source: ${encodeValue('Vault')}`) > -1).to.equal(true);
    expect(content.indexOf(`// @key: ${encodeValue('[obj.key]')} @source: ${encodeValue('testValue')}`) > -1).to.equal(true);
    expect(content.indexOf(`// @key: ${encodeValue('newline')} @source: ${encodeValue('containes\nnewline')}`) > -1).to.equal(true);
  });
  it('should only import keys that exist in current source', async () => {
    await fs.writeFile(path.resolve(testFolder, 'en-US.js'), `
      const obj = {
        key: 'testKey',
      };

      export default {
        modern: 'rogue',
      };
    `);
    await importLocale(config);
    const filePath = path.resolve(testFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).to.equal(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelOptions).code);
    }).to.not.throw();
    expect(json.modern).to.equal('rogue');
    expect(json.whisky).to.equal(undefined);
    expect(json.testKey).to.equal(undefined);
  });
  it('should only import keys where its source value is identical to current source', async () => {
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
    const filePath = path.resolve(testFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).to.equal(true);
    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transform(content, babelOptions).code);
    }).to.not.throw();
    expect(json.modern).to.equal('rogue');
    expect(json.whisky).to.equal(undefined);
    expect(json.testKey).to.equal(undefined);
  });
  it('it should work for files without trailing comma', async () => {
    await fs.writeFile(path.resolve(testFolder, 'en-US.js'), `
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
    const filePath = path.resolve(testFolder, 'en-GB.js');
    expect(await fs.exists(filePath)).to.equal(true);
    const content = await fs.readFile(filePath, 'utf8');
    expect(() => {
      const json = eval(transform(content, babelOptions).code);
    }).to.not.throw();
  });
});
