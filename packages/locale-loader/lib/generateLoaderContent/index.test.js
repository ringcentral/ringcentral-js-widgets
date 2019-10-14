import { transform } from 'babel-core';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import fs from 'fs-extra';
import generateLoaderContent from '.';

const files = ['en_us.js', 'FR-FR.JS', 'aa-AAAA-ZZ.JS'];

describe('generateLoaderContent', () => {
  test('should generate string', () => {
    const content = generateLoaderContent({ files });
    expect(typeof content).toBe('string');
  });
  describe('generated content', () => {
    afterAll(async () => {
      await fs.remove('./testData/generateLoaderContent/loader.js');
    });
    const content = generateLoaderContent({ files });
    files.forEach((file) => {
      const baseName = file.split('.')[0];
      const locale = formatLocale(baseName);
      const lang = locale.split('-')[0];
      test(`should contain ${baseName}`, () => {
        expect(content.indexOf(baseName) !== -1).toBe(true);
      });
      test(`should contain formatted locale name ${locale}`, () => {
        expect(content.indexOf(locale) !== -1).toBe(true);
      });
      test(`should contain case '${lang}': `, () => {
        expect(content.indexOf(`case '${lang}':`) > -1).toBe(true);
      });
    });
    test('should be valid js file content', async () => {
      expect(() => {
        transform(content, { filename: 'en-GB.js' });
      }).not.toThrow();
      await fs.mkdirp('./testData/generateLoaderContent');
      await fs.writeFile('./testData/generateLoaderContent/loader.js', content);
      /* eslint-disable-next-line */
      const loader = require('../../testData/generateLoaderContent/loader');
      expect(typeof loader.default).toBe('function');
    });
  });
  test('should accept chunk = false parameter', () => {
    let content;
    expect(() => {
      content = generateLoaderContent({ files, chunk: false });
    }).not.toThrow();
    expect(content.indexOf('ensure')).toBe(-1);
  });
});
