import faker from 'faker';
import toPseudoString, {
  toAccentString,
  processVars,
} from './';

describe('toAccentString', () => {
  test('should be a function', () => {
    expect(typeof toAccentString).toBe('function');
  });
  test('should return a string of the same length as input', () => {
    [...new Array(10)]
      .map(() => faker.lorem.word())
      .forEach((word) => {
        expect(toAccentString(word).length)
          .toBe(word.length);
      });
    [...new Array(10)]
      .map(() => faker.lorem.words())
      .forEach((word) => {
        expect(toAccentString(word).length)
          .toBe(word.length);
      });
  });
});

describe('processVars', () => {
  test('should be a function', () => {
    expect(typeof processVars).toBe('function');
  });
  test('should accentify ICU strings without messing with variables', () => {
    [...new Array(10)]
      .map(() => `{${faker.lorem.word}}`)
      .forEach((str) => {
        const line = `${faker.lorem.words()} ${str} ${faker.lorem.words()}`;
        const accentedLine = processVars(line);
        expect(accentedLine.indexOf(str) > -1)
          .toBe(true);
        expect(accentedLine.length)
          .toBe(line.length);
      });
  });
});

describe('toPseudoString', () => {
  test('should be a function', () => {
    expect(typeof toPseudoString).toBe('function');
  });
  test('should return accented strings', () => {
    [...new Array(10)].map(() => faker.lorem.words())
      .forEach((str) => {
        expect(toPseudoString(str))
          .toBe(`[${toAccentString(str)}]`);
      });
  });
  test('should accentify ICU strings without messing with variables', () => {
    [...new Array(10)]
      .map(() => `{${faker.lorem.word}}`)
      .forEach((str) => {
        const line = `${faker.lorem.words()} ${str} ${faker.lorem.words()}`;
        const accentedLine = toPseudoString(line);
        expect(accentedLine.indexOf(str) > -1)
          .toBe(true);
      });
  });
  test('should recognize escaped braces and accentify the contents', () => {
    [...new Array(10)]
      .map(() => ({
        variable: `{${faker.lorem.word()}}`,
        escaped: `'{${faker.lorem.word()}}'`,
      }))
      .forEach((set) => {
        const line = `${faker.lorem.words()} ${set.variable} ${set.escaped} ${faker.lorem.words()}`;
        const accentedLine = toPseudoString(line);
        expect(accentedLine.indexOf(set.variable) > -1)
          .toBe(true);
        expect(accentedLine.indexOf(set.escaped) === -1)
          .toBe(true);
      });
  });
});
