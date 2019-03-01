import { forEach } from 'ramda';
import isLocaleFile from './';

describe('isLocaleFile', () => {
  describe('Valid file names:', () => {
    forEach(
      (fileName) => {
        test(`${fileName}.js`, () => {
          expect(isLocaleFile(`${fileName}.js`)).toBe(true);
        });
      },
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
      ]
    );
  });
  describe('Invalid file names:', () => {
    forEach(
      (fileName) => {
        test(`${fileName}.js`, () => {
          expect(isLocaleFile(`${fileName}.js`)).toBe(false);
        });
      },
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
      ]
    );
  });
  describe('Valid file extensions:', () => {
    forEach(
      (ext) => {
        test(`"${ext}"`, () => {
          expect(isLocaleFile(`en-US${ext}`)).toBe(true);
        });
      },
      [
        '.js',
        '.JS',
      ]
    );
  });
  describe('Invalid file extensions:', () => {
    forEach(
      (ext) => {
        test(`"${ext}"`, () => {
          expect(isLocaleFile(`en-US${ext}`)).toBe(false);
        });
      },
      [
        '',
        '.wrong',
      ]
    );
  });
});
