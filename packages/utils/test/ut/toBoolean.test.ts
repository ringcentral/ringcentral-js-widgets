import { toBoolean } from '../../src/utils/toBoolean';

describe('toBoolean', () => {
  const SampleTruthyData = [
    'true',
    'True',
    'TRUE',
    'tRue',
    'TrUe',
    'trUE',
    '1',
    1,
    true,
  ];
  const SampleFalsyData = [
    'false',
    'False',
    'FALSE',
    'fAlse',
    'FaLse',
    'faLSE',
    '0',
    0,
    false,
  ];
  const SampleInvalidData = [
    'invalid',
    'Invalid',
    'INVALID',
    'inValid',
    'InVaLiD',
    'inVALID',
    '2',
    2,
    null,
    undefined,
    {},
    [],
  ];
  it('should return true for truthy values', () => {
    SampleTruthyData.forEach((value) => {
      expect(toBoolean(value)).toBe(true);
    });
  });
  it('should return false for falsy values', () => {
    SampleFalsyData.forEach((value) => {
      expect(toBoolean(value)).toBe(false);
    });
  });
  it('should return false for invalid values', () => {
    SampleInvalidData.forEach((value) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(toBoolean(value as any)).toBe(false);
    });
  });
});
