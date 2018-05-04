import { expect } from 'chai';
import formatLocale from './';

/* global describe it */

describe('formatLocale', () => {
  [
    'aa',
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
    const dashResult = fileName.replace(/_/g, '-');
    const underscoreResult = fileName.replace(/-/g, '_');
    [
      fileName.toLowerCase(),
      fileName.toUpperCase(),
    ].forEach((input) => {
      it(`should convert ${input} to ${dashResult}`, () => {
        expect(formatLocale(input)).to.equal(dashResult);
      });
      it(`should convert ${input} to ${underscoreResult} by specifying delimeter = '_'`, () => {
        expect(formatLocale(input, '_')).to.equal(underscoreResult);
      });
    });
  });
});
