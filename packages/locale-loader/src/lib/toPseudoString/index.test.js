import { expect } from 'chai';
import faker from 'faker';
import toPseudoString, {
  toAccentString,
  processVars,
} from './';

/* global describe it */

describe('toAccentString', () => {
  it('should be a function', () => {
    expect(toAccentString).to.be.a('function');
  });
  it('should return a string of the same length as input', () => {
    [...new Array(10)]
      .map(() => faker.lorem.word())
      .forEach((word) => {
        expect(toAccentString(word).length)
          .to.equal(word.length);
      });
    [...new Array(10)]
      .map(() => faker.lorem.words())
      .forEach((word) => {
        expect(toAccentString(word).length)
          .to.equal(word.length);
      });
  });
});

describe('processVars', () => {
  it('should be a function', () => {
    expect(processVars).to.be.a('function');
  });
  it('should accentify ICU strings without messing with variables', () => {
    [...new Array(10)]
      .map(() => `{${faker.lorem.word}}`)
      .forEach((str) => {
        const line = `${faker.lorem.words()} ${str} ${faker.lorem.words()}`;
        const accentedLine = processVars(line);
        expect(accentedLine.indexOf(str) > -1)
          .to.equal(true);
        expect(accentedLine.length)
          .to.equal(line.length);
      });
  });
});

describe('toPseudoString', () => {
  it('should be a function', () => {
    expect(toPseudoString).to.be.a('function');
  });
  it('should return accented strings', () => {
    [...new Array(10)].map(() => faker.lorem.words())
      .forEach((str) => {
        expect(toPseudoString(str))
          .to.equal(`[${toAccentString(str)}]`);
      });
  });
  it('should accentify ICU strings without messing with variables', () => {
    [...new Array(10)]
      .map(() => `{${faker.lorem.word}}`)
      .forEach((str) => {
        const line = `${faker.lorem.words()} ${str} ${faker.lorem.words()}`;
        const accentedLine = toPseudoString(line);
        expect(accentedLine.indexOf(str) > -1)
          .to.equal(true);
      });
  });
  it('should recognize escaped braces and accentify the contents', () => {
    [...new Array(10)]
      .map(() => ({
        variable: `{${faker.lorem.word()}}`,
        escaped: `'{${faker.lorem.word()}}'`,
      }))
      .forEach((set) => {
        const line = `${faker.lorem.words()} ${set.variable} ${set.escaped} ${faker.lorem.words()}`;
        const accentedLine = toPseudoString(line);
        expect(accentedLine.indexOf(set.variable) > -1)
          .to.equal(true);
        expect(accentedLine.indexOf(set.escaped) === -1)
          .to.equal(true);
      });
  });
});
