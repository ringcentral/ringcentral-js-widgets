import formatLocale from './';

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
    [fileName.toLowerCase(), fileName.toUpperCase()].forEach((input) => {
      test(`should convert ${input} to ${dashResult}`, () => {
        expect(formatLocale(input)).toBe(dashResult);
      });
      test(`should convert ${input} to ${underscoreResult} by specifying delimiter = '_'`, () => {
        expect(formatLocale(input, '_')).toBe(underscoreResult);
      });
    });
  });
});
