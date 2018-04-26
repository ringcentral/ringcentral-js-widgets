import { expect } from 'chai';
import localeRegExp from './localeRegExp';

describe('localeRegExp', () => {
  it('should be a regular expression', () => {
    expect(localeRegExp instanceof RegExp).to.be.true;
  });
  it('should recognize locale formatted strings', () => {
    [
      'en-US',
      'fr-FR',
      'zh-CN',
      'en',
      'fr',
    ].forEach(locale => {
      expect(localeRegExp.test(locale)).to.be.true;
    });
    [
      'foo',
      'bar',
      'zh_CN',
      'en-us',
    ].forEach(locale => {
      expect(localeRegExp.test(locale)).to.be.false;
    });
  });
});
