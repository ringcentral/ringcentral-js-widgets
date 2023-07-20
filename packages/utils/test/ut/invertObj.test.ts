import { invertObj } from '../../src/utils';

describe('invertObj', () => {
  test('return value of object invert', () => {
    expect(invertObj({ a: '1' })).toEqual({ '1': 'a' });
    expect(invertObj({ a: '1', b: '2' })).toEqual({ '1': 'a', '2': 'b' });
  });
});
