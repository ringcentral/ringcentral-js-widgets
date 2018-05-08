import { expect } from 'chai';
import isLocaleFile from './';

/* global describe it */

describe('isLocaleFile', () => {
  [
    'aa-Aaaa-AA',
    'aa-000',
    'aa-AA',
    'aaa-AA',
    'aa_Aaaa-AA',
    'aa-Aaaa_AA',
    'aa_Aaaa_AA',
    'aa_000',
    'aa_AA',
    'aaa_AA',
  ].forEach((fileName) => {
    it(`should return true for ${fileName}.js`, () => {
      expect(isLocaleFile(`${fileName}.js`)).to.equal(true);
    });
  });
  [
    'aa-Aaa3-AA',
    'aa-00',
    'aa-Ac',
    'a3a-AA',
    'Aa_Aaaa-3A',
    'aa-Aa3a_AA',
    'aa_Aaafa_AA',
    'aa_0000',
    'aa3_AAe',
    'aaaa_AA',
  ].forEach((fileName) => {
    it(`should return false for ${fileName}.js`, () => {
      expect(isLocaleFile(`${fileName}.js`)).to.equal(false);
    });
  });

  [
    '',
    '.wrong',
  ].forEach((ext) => {
    it(`should return false for extension "${ext}"`, () => {
      expect(isLocaleFile(`en-US${ext}`)).to.equal(false);
    });
  });
  [
    '.js',
    '.JS',
  ].forEach((ext) => {
    it(`should return true for extension "${ext}"`, () => {
      expect(isLocaleFile(`en-US${ext}`)).to.equal(true);
    });
  });
});
