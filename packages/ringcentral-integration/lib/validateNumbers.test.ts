import { expect } from 'chai';

import { validateNumbers } from './validateNumbers';

describe('validateNumbers', () => {
  it('should return result numbers if phoneNumbers is valid', () => {
    const result = validateNumbers({
      phoneNumbers: ['8370000'],
      countryCode: 'CA',
      areaCode: '666',
      allowRegionSettings: true,
    });
    expect(result).to.deep.equal(['+16668370000']);
  });

  it('should return result true if one number is special number', async () => {
    const result = validateNumbers({
      phoneNumbers: ['911'],
      countryCode: 'US',
      areaCode: '666',
      allowRegionSettings: true,
    });
    expect(result).to.deep.equal(['911']);
  });

  it('should return result true if one number is not an extension number', async () => {
    const result = validateNumbers({
      phoneNumbers: ['999'],
      countryCode: 'US',
      areaCode: '666',
      allowRegionSettings: true,
    });
    expect(result).to.deep.equal(['999']);
  });

  it('should throw error if one number is not an valid number', async () => {
    expect(() => {
      validateNumbers({
        phoneNumbers: ['*&%^&%'],
        countryCode: 'US',
        areaCode: '666',
        allowRegionSettings: true,
      });
    }).to.throw();
    //   const result = validateNumbers(['*&%^&%'], validateNumbersOptions, brandId);
    //   expect(result).to.deep.equal(['*&%^&%'], {
    //     phoneNumber: '*&%^&%',
    //     type: 'noToNumber'
    //   });
  });
});
