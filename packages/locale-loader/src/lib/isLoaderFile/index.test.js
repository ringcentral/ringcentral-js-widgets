import { expect } from 'chai';
import isLoaderFile from './';

/* global describe it */

const validFiles = [
  '/* loadLocale */',
  '/* loadlocale */',
  '/* loadLocale randome extra content */',
  '/* loadLocale */ console.log("include some js")',
];

const validNoChunkFiles = [
  '/* loadLocale noChunk */',
  '/* loadlocale nochunk */',
  '/* loadLocale randome nochunk extra content */',
  '/* loadLocale nochunk */ console.log("include some js")',
];

describe('isLoaderFile', () => {
  [
    ...validFiles,
    ...validNoChunkFiles,
  ].forEach((content) => {
    it(`should return true for content = '${content}'`, () => {
      expect(isLoaderFile(content)).to.equal(true);
    });
  });
  describe('isLoaderFile.noChunk', () => {
    validNoChunkFiles.forEach((content) => {
      it(`should return true for content = '${content}'`, () => {
        expect(isLoaderFile.noChunk(content)).to.equal(true);
      });
    });
  });
});
