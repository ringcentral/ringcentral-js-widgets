import { expect } from 'chai';
import { transform } from 'babel-core';
import fs from 'fs-extra';
import babelrc from 'babel-settings/lib/babelrc';
import generateLoaderContent from './';
import formatLocale from '../formatLocale';

/* eslint { no-eval: 0 } */

/* global describe it */
const files = [
  'en_us.js',
  'FR-FR.JS',
  'aa-AAAA-ZZ.JS',
];

describe('generateLoaderContent', () => {
  it('should generate string', () => {
    const content = generateLoaderContent({ files });
    expect(content).to.be.a('String');
  });
  describe('generated content', () => {
    const content = generateLoaderContent({ files });
    files.forEach((file) => {
      const baseName = file.split('.')[0];
      const locale = formatLocale(baseName);
      const lang = locale.split('-')[0];
      it(`should contain ${baseName}`, () => {
        expect(content.indexOf(baseName) !== -1).to.equal(true);
      });
      it(`should contain formatted locale name ${locale}`, () => {
        expect(content.indexOf(locale) !== -1).to.equal(true);
      });
      it(`should contain case '${lang}': `, () => {
        expect(content.indexOf(`case '${lang}':`) > -1).to.equal(true);
      });
    });
    it('should be valid js file content', () => {
      let code;
      expect(() => { code = transform(content, babelrc).code; }).to.not.throw();
      expect(() => { eval(code); }).to.not.throw();
      expect(eval(code)).to.be.a('Function');
    });
  });
  it('should accept chunk = false parameter', () => {
    let content;
    expect(() => { content = generateLoaderContent({ files, chunk: false }); }).to.not.throw();
    expect(content.indexOf('ensure')).to.equal(-1);
  });
});
