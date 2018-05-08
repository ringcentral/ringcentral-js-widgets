import { expect } from 'chai';
import I18n, { DEFAULT_LOCALE, RUNTIME } from './';
import toPseudoString from '../toPseudoString';

/* global describe it */

describe('I18n', () => {
  const data = {
    'en-US': {
      foo: 'bar',
    },
    'zh-TW': {
      foo: '霸',
    },
  };
  const loader = async (locale) => {
    if (data[locale]) return data[locale];
    throw new Error('locale not found');
  };
  it('should be a function', () => {
    expect(I18n).to.be.a('function');
  });
  it('should be a constructor function', () => {
    const instance = new I18n(loader);
    expect(instance).to.be.a('object');
    expect(instance instanceof I18n).to.equal(true);
  });
  it('should throw error if loadLocale is not a function', () => {
    expect(() => new I18n()).to.throw();
    expect(() => new I18n({})).to.throw();
    expect(() => new I18n('test')).to.throw();
    expect(() => new I18n(0)).to.throw();
  });
  it('should have static setLocale function', () => {
    expect(I18n.setLocale).to.be.a('function');
  });
  it('should have currentLocale property', () => {
    expect(I18n.currentLocale).to.be.a('string');
  });
  describe('I18n instance', () => {
    const instance = new I18n(loader);
    it('should have currentLocale property', () => {
      expect(instance.currentLocale).to.be.a('string');
    });
    it('should have function getString', () => {
      expect(instance.getString).to.be.a('function');
    });
    it('should have function setLocale', () => {
      expect(instance.setLocale).to.be.a('function');
    });
    describe('currentLocale', () => {
      it('should return the current runtime Locale', () => {
        expect(instance.currentLocale).to.equal(RUNTIME.locale);
      });
    });
    describe('setLocale', async () => {
      it('should set new locale and load the data for the locale', async () => {
        await instance.setLocale('zh-TW');
        expect(instance.currentLocale).to.equal('zh-TW');
        expect(instance.getString('foo')).to.equal(data['zh-TW'].foo);
      });
      it('should not throw even when no data is available for new locale', async () => {
        try {
          await instance.setLocale('fo-BA');
          expect(instance.currentLocale).to.equal('fo-BA');
          await instance.setLocale(DEFAULT_LOCALE);
        } catch (error) {
          await instance.setLocale(DEFAULT_LOCALE);
          throw error;
        }
      });
      it('should set locale to all existing instances of I18n', async () => {
        const inst2 = new I18n(loader);
        const inst3 = new I18n(loader);
        await instance.setLocale('fo-BA');
        expect(inst2.currentLocale).to.equal('fo-BA');
        expect(inst3.currentLocale).to.equal('fo-BA');
        await instance.setLocale(DEFAULT_LOCALE);
      });
    });
    describe('getString', () => {
      it('should return locale string', () => {
        expect(instance.getString('foo')).to.equal(data[RUNTIME.locale].foo);
      });
      it('should allow specific locale to be passed as parameter', () => {
        expect(instance.getString('foo', 'en-US')).to.equal(data['en-US'].foo);
      });
      it('should return the key if locale string is not found', () => {
        expect(instance.getString('baz')).to.equal('baz');
      });
      it('should fallback to DEFAULT_LOCALE', () => {
        expect(instance.getString('foo', 'fr')).to.equal(data[DEFAULT_LOCALE].foo);
      });
      it('should return accented string when locale is set to en-ZZ', () => {
        expect(instance.getString('foo', 'en-ZZ'))
          .to.equal(toPseudoString(data['en-US'].foo));
      });
    });
  });
});
