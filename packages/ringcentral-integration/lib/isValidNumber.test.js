import { expect } from 'chai';
import isValidNumber from './isValidNumber';

describe('isValidNumber', () => {
  it('should return false if phoneNumber is blank', () => {
    const regionSettings = {
      ready: true,
      countryCode: 'US',
      areaCode: '',
    };
    const result = isValidNumber('', regionSettings);
    expect(result).to.equal(false);
  });

  it('should return false if cleanNumber is blank', () => {
    const regionSettings = {
      ready: true,
      countryCode: 'US',
      areaCode: '',
    };
    const result = isValidNumber("iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber", regionSettings);
    expect(result).to.equal(false);
  });

  it('should return true if phoneNumber is extensionNumber', () => {
    const regionSettings = {
      ready: true,
      countryCode: 'US',
      areaCode: '',
    };
    const result = isValidNumber('1234', regionSettings);
    expect(result).to.equal(true);
  });

  it('should return true if phoneNumber is valid', () => {
    const regionSettings = {
      ready: true,
      countryCode: 'US',
      areaCode: '',
    };
    const result = isValidNumber('(999) 1234 567', regionSettings);
    expect(result).to.equal(true);
  });

  it('should return true if phoneNumber is e164 format', () => {
    const regionSettings = {
      ready: true,
      countryCode: 'US',
      areaCode: '',
    };
    const result = isValidNumber('+1234567890', regionSettings);
    expect(result).to.equal(true);
  });
});
