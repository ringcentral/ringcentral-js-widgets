import { forEach } from 'ramda';
import formatLocale from './';

describe('formatLocale', () => {
  forEach(
    (fileName) => {
      const dashResult = fileName.replace(/_/g, '-');
      const underscoreResult = fileName.replace(/-/g, '_');
      forEach(
        (input) => {
          test(`should convert ${input} to ${dashResult}`, () => {
            expect(formatLocale(input)).toBe(dashResult);
          });
          test(`should convert ${input} to ${underscoreResult} by specifying delimeter = '_'`, () => {
            expect(formatLocale(input, '_')).toBe(underscoreResult);
          });
        },
        [
          fileName.toLowerCase(),
          fileName.toUpperCase(),
        ]
      );
    },
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
    ]
  );
});
