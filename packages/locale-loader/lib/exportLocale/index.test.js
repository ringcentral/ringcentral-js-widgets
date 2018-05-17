import fs from 'fs-extra';
import path from 'path';
import exportLocale from './';

const sourceFolder = './testData/exportLocale';
const localizationFolder = './localization/exportLocale';
const sourceLocale = 'en-US';
const supportedLocales = ['en-GB', 'fr-FR'];

async function clean() {
  await fs.emptyDir(sourceFolder);
  await fs.emptyDir(localizationFolder);
}

async function generateLoader() {
  await fs.ensureDir(sourceFolder);
  await fs.writeFile(path.resolve(sourceFolder, 'loadLocale.js'), '/* loadLocale */');
}

describe('exportLocale', () => {
  beforeAll(clean);
  afterEach(clean);

  describe('exported .xlf', () => {
    beforeEach(async () => {
      await generateLoader();
      await fs.writeFile(path.resolve(sourceFolder, 'en-US.js'), `
        const a = 'a';
        const b = 'b';
        export default {
          modern: 'rogue',
          whisky: 'Vault',
          [obj.key]: 'test',
          newline: 'contains\\nnewline',
          'single-quote': 'Single Quote',
          "double-'quote'": 'Double Quote',
          [a + b]: 'Odd Key',
          4: 'number key',
        };
        `);
    });
    afterEach(clean);
    test('should throw when supportedLocales is not defined', () => {
      expect(() => exportLocale()).toThrow('options.supportedLocales is missing');
    });
    test('should have a .xlf for each supported locales except the src', async () => {
      exportLocale({
        sourceLocale,
        supportedLocales,
        sourceFolder,
        localizationFolder,
      });
      const files = await fs.readdir(localizationFolder);
      expect(files.map(f => path.basename(f, '.xlf')).sort())
        .toEqual(supportedLocales.filter(l => l !== sourceLocale).sort());
    });
    test('should contain all the key-value pairs in the exported file', async () => {
      exportLocale({
        sourceLocale,
        supportedLocales,
        sourceFolder,
        localizationFolder,
      });
      const files = await fs.readdir(localizationFolder);
      await Promise.all(
        files.map(async (f) => {
          const content = await fs.readFile(path.resolve(localizationFolder, f), 'utf8');
          expect(content.indexOf('modern') > -1).toBe(true);
          expect(content.indexOf('rogue') > -1).toBe(true);
          expect(content.indexOf('whisky') > -1).toBe(true);
          expect(content.indexOf('Vault') > -1).toBe(true);
          expect(content.indexOf('[obj.key]') > -1).toBe(true);
          expect(content.indexOf('test') > -1).toBe(true);
          expect(content.indexOf('newline') > -1).toBe(true);
          expect(content.indexOf('contains\nnewline') > -1).toBe(true);
          expect(content.indexOf('single-quote') > -1).toBe(true);
          expect(content.indexOf("double-'quote'") > -1).toBe(true);
          expect(content.indexOf('[a + b]') > -1).toBe(true);
          expect(content.indexOf('Odd Key') > -1).toBe(true);
        })
      );
    });
    test('should export only untranslated entries', async () => {
      await fs.writeFile(path.resolve(sourceFolder, 'en-GB.js'), `
        export default {
          modern: 'rogue',
        };
      `);
      exportLocale({
        sourceLocale,
        sourceFolder,
        localizationFolder,
        supportedLocales: ['en-US', 'en-GB']
      });
      const content = await fs.readFile(path.resolve(localizationFolder, 'en-GB.xlf'), 'utf8');
      expect(content.indexOf('modern') > -1).toBe(false);
      expect(content.indexOf('rogue') > -1).toBe(false);
      expect(content.indexOf('whisky') > -1).toBe(true);
      expect(content.indexOf('Vault') > -1).toBe(true);
      expect(content.indexOf('[obj.key]') > -1).toBe(true);
      expect(content.indexOf('test') > -1).toBe(true);
      expect(content.indexOf('newline') > -1).toBe(true);
      expect(content.indexOf('contains\nnewline') > -1).toBe(true);
    });
    test('should be able to export all entries when exportType === "full"', async () => {
      await fs.writeFile(path.resolve(sourceFolder, 'en-GB.js'), `
        export default {
          modern: 'rogue',
        };
      `);
      exportLocale({
        sourceLocale,
        sourceFolder,
        localizationFolder,
        supportedLocales: ['en-US', 'en-GB'],
        exportType: 'full',
      });
      const content = await fs.readFile(path.resolve(localizationFolder, 'en-GB.xlf'), 'utf8');
      expect(content.indexOf('modern') > -1).toBe(true);
      expect(content.indexOf('rogue') > -1).toBe(true);
      expect(content.indexOf('whisky') > -1).toBe(true);
      expect(content.indexOf('Vault') > -1).toBe(true);
      expect(content.indexOf('[obj.key]') > -1).toBe(true);
      expect(content.indexOf('test') > -1).toBe(true);
      expect(content.indexOf('newline') > -1).toBe(true);
      expect(content.indexOf('contains\nnewline') > -1).toBe(true);
    });
    test('should be able to export on translated entries when exportType === "translated"', async () => {
      await fs.writeFile(path.resolve(sourceFolder, 'en-GB.js'), `
        export default {
          modern: 'rogue',
          newline: 'contains\\newline',
        };
      `);
      exportLocale({
        sourceLocale,
        sourceFolder,
        localizationFolder,
        supportedLocales: ['en-US', 'en-GB'],
        exportType: 'translated',
      });
      const content = await fs.readFile(path.resolve(localizationFolder, 'en-GB.xlf'), 'utf8');
      expect(content.indexOf('modern') > -1).toBe(true);
      expect(content.indexOf('rogue') > -1).toBe(true);
      expect(content.indexOf('whisky') > -1).toBe(false);
      expect(content.indexOf('Vault') > -1).toBe(false);
      expect(content.indexOf('[obj.key]') > -1).toBe(false);
      expect(content.indexOf('test') > -1).toBe(false);
      expect(content.indexOf('newline') > -1).toBe(true);
      expect(content.indexOf('contains\nnewline') > -1).toBe(true);
    });
    test('should export entries that have been changed since last import', async () => {
      await fs.writeFile(path.resolve(sourceFolder, 'en-GB.js'), `
        export default {
          modern: 'rogue',
          whisky: 'Wizard',
        };

        // @key: @#@"whisky"@#@ @source: @#@"Wizard"@#@
        // @key: @#@"modern"@#@ @source: @#@"rogue"@#@
      `);
      exportLocale({
        sourceLocale,
        sourceFolder,
        localizationFolder,
        supportedLocales: ['en-US', 'en-GB']
      });
      const content = await fs.readFile(path.resolve(localizationFolder, 'en-GB.xlf'), 'utf8');
      expect(content.indexOf('modern') > -1).toBe(false);
      expect(content.indexOf('rogue') > -1).toBe(false);
      expect(content.indexOf('whisky') > -1).toBe(true);
      expect(content.indexOf('Vault') > -1).toBe(true);
    });
  });
});
