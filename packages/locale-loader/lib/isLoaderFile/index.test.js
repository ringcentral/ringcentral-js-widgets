import { forEach } from 'ramda';
import isLoaderFile from './';

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
  '/* loadLocale nochunk */\nconsole.log("include some js");',
];

describe('isLoaderFile', () => {
  describe('Valid file content', () => {
    forEach(
      (content) => {
        test(`"${content}"`, () => {
          expect(isLoaderFile(content)).toBe(true);
        });
      },
      [
        ...validFiles,
        ...validNoChunkFiles,
      ]);
  });
});
