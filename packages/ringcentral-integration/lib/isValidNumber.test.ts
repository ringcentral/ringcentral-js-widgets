import { expect } from 'chai';

import { isValidNumber } from './isValidNumber';

describe('isValidNumber', () => {
  it('should return false if phoneNumber is blank', () => {
    const isValidNumberOptions = {
      input: '',
      countryCode: 'US',
    };
    const result = isValidNumber(isValidNumberOptions);
    expect(result).to.equal(false);
  });

  it('should return false if cleanNumber is blank', () => {
    const isValidNumberOptions = {
      countryCode: 'US',
      input: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber",
    };
    const result = isValidNumber(isValidNumberOptions);
    expect(result).to.equal(false);
  });

  it('should return true if phoneNumber is extensionNumber', () => {
    const isValidNumberOptions = {
      countryCode: 'US',
      input: '1234',
    };
    const result = isValidNumber(isValidNumberOptions);
    expect(result).to.equal(true);
  });

  it('should return true if phoneNumber is valid', () => {
    const isValidNumberOptions = {
      countryCode: 'US',
      input: '(999) 1234 567',
    };
    const result = isValidNumber(isValidNumberOptions);
    expect(result).to.equal(true);
  });

  it('should return true if phoneNumber is e164 format', () => {
    const isValidNumberOptions = {
      countryCode: 'US',
      input: '+1234567890',
    };
    const result = isValidNumber(isValidNumberOptions);
    expect(result).to.equal(true);
  });
});
