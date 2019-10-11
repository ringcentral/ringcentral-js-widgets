import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import validateNumbers from './validateNumbers';

describe('validateNumbers', () => {
  it('should return result numbers if phoneNumbers is valid', () => {
    const regionSettings = { countryCode: 'US', areaCode: '666' };
    const brandId = '1210';
    const result = validateNumbers(['8370000'], regionSettings, brandId);
    expect(result).to.deep.equal(['+16668370000']);
  });

  it('should return result true if one number is special number', async () => {
    const regionSettings = { countryCode: 'US', areaCode: '666' };
    const brandId = '1210';
    const result = validateNumbers(['911'], regionSettings, brandId);
    expect(result).to.deep.equal(['911']);
  });

  it('should return result true if one number is not an extension number', async () => {
    const regionSettings = { countryCode: 'US', areaCode: '666' };
    const brandId = '1210';
    const result = validateNumbers(['999'], regionSettings, brandId);
    expect(result).to.deep.equal(['999']);
  });

  it('should throw error if one number is not an valid number', async () => {
    const regionSettings = { countryCode: 'US', areaCode: '666' };
    const brandId = '1210';
    expect(() => {
      validateNumbers(['*&%^&%'], regionSettings, brandId);
    }).to.throw();
    //   const result = validateNumbers(['*&%^&%'], regionSettings, brandId);
    //   expect(result).to.deep.equal(['*&%^&%'], {
    //     phoneNumber: '*&%^&%',
    //     type: 'noToNumber'
    //   });
  });
});
