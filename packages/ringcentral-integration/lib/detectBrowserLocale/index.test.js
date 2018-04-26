import { expect } from 'chai';
import detectDefaultLocale from './';

describe('detectDefaultLocale', () => {
  it('should be a function', () => {
    expect(detectDefaultLocale).to.be.a('function');
  });
  it('should return default locale of en-US in node', () => {
    expect(detectDefaultLocale()).to.equal('en-US');
  });
  it('should accept defaultLocale parameter and use that as default', () => {
    expect(detectDefaultLocale('fo-BA')).to.equal('fo-BA');
  });
  it('should use navigator.languages[0] as default if available', () => {
    global.navigator = {
      languages: ['fo-Ba']
    };
    expect(detectDefaultLocale()).to.equal('fo-BA');
    delete global.navigator;
  });
  it('should try to check navigator.language if navigator.languages is not availble', () => {
    global.navigator = {
      languages: [],
      language: 'te-ST',
    };
    expect(detectDefaultLocale()).to.equal('te-ST');
    global.navigator = {
      language: 'te-ST',
    };
    expect(detectDefaultLocale()).to.equal('te-ST');
    delete global.navigator;
  });
  it('should fall back to default if navigator does not have language info', () => {
    global.navigator = {};
    expect(detectDefaultLocale('ro-GE')).to.equal('ro-GE');
    delete global.navigator;
  });
});
