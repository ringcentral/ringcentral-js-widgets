import { toPseudoStringWithPadding, toAccentString, processVars } from '.';
import faker from '@faker-js/faker';

describe('toAccentString', () => {
  test('should be a function', () => {
    expect(typeof toAccentString).toBe('function');
  });
  test('should return a string of the same length as input', () => {
    [...new Array(10)]
      .map(() => faker.lorem.word())
      .forEach((word) => {
        expect(toAccentString(word).length).toBe(word.length);
      });
    [...new Array(10)]
      .map(() => faker.lorem.words())
      .forEach((word) => {
        expect(toAccentString(word).length).toBe(word.length);
      });
  });
});

describe('processVars', () => {
  test('should be a function', () => {
    expect(typeof processVars).toBe('function');
  });
  test('should accentify ICU strings without messing with variables', () => {
    [...new Array(10)]
      // this is a bound function in old version faker
      .map(() => `{${faker.lorem.word()}}`)
      .forEach((str) => {
        const line = `${faker.lorem.words()} ${str} ${faker.lorem.words()}`;
        const accentedLine = processVars(line);
        expect(accentedLine.indexOf(str) > -1).toBe(true);
        expect(accentedLine.length).toBe(line.length);
      });
  });
});

describe('toPseudoStringWithPadding', () => {
  test('should be a function', () => {
    expect(typeof toPseudoStringWithPadding).toBe('function');
  });
  test('basic test for toPseudoStringWithPadding should extends 30% of the original string for padding the text to ensure ui text truncate works', () => {
    expect(toPseudoStringWithPadding({ str: 'test' })).toBe('[[~]ţéšţ[~]]');
    expect(toPseudoStringWithPadding({ str: 'test123' })).toBe(
      '[[~!]ţéšţ123[~!]]',
    );
    expect(toPseudoStringWithPadding({ str: 'test1234567890' })).toBe(
      '[[~!@]ţéšţ1234567890[~!@]]',
    );
  });

  test('with custom pad char', () => {
    expect(toPseudoStringWithPadding({ str: 'test', padChar: '!' })).toBe(
      '[[!]ţéšţ[!]]',
    );
    expect(toPseudoStringWithPadding({ str: 'test123', padChar: '!' })).toBe(
      '[[!!]ţéšţ123[!!]]',
    );
    expect(
      toPseudoStringWithPadding({ str: 'test1234567890', padChar: '!' }),
    ).toBe('[[!!!]ţéšţ1234567890[!!!]]');
  });

  test('should return accented strings', () => {
    [...new Array(10)]
      .map(() => faker.lorem.words())
      .forEach((str) => {
        expect(
          toPseudoStringWithPadding({ str }).indexOf(toAccentString(str)) > -1,
        ).toBe(true);
      });
  });
  test('should accentify ICU strings without messing with variables', () => {
    [...new Array(10)]
      // this is a bound function in old version faker
      .map(() => `{${faker.lorem.word()}}`)
      .forEach((str) => {
        const line = `${faker.lorem.words()} ${str} ${faker.lorem.words()}`;
        const accentedLine = toPseudoStringWithPadding({ str: line });
        expect(accentedLine.indexOf(str) > -1).toBe(true);
      });
  });
  test('should recognize escaped braces and accentify the contents', () => {
    [...new Array(10)]
      .map(() => ({
        variable: `{${faker.lorem.word()}}`,
        escaped: `'{${faker.lorem.word()}}'`,
      }))
      .forEach((set) => {
        const line = `${faker.lorem.words()} ${set.variable} ${
          set.escaped
        } ${faker.lorem.words()}`;
        const accentedLine = toPseudoStringWithPadding({ str: line });
        expect(accentedLine.indexOf(set.variable) > -1).toBe(true);
        expect(accentedLine.indexOf(set.escaped) === -1).toBe(true);
      });
  });
});
