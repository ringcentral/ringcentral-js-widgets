import { expect } from 'chai';

import { hasNoAreaCode } from './hasNoAreaCode';

describe('hasNoAreaCode', () => {
  it('should return false if phoneNumber is ServiceNumber', () => {
    const result = hasNoAreaCode({
      input: '*101',
      countryCode: 'US',
      areaCode: '666',
    });
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber is hasPlus', () => {
    const result = hasNoAreaCode({
      input: '+16508370000',
      countryCode: 'US',
      areaCode: '666',
    });
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is not 7', () => {
    const result = hasNoAreaCode({
      input: '16508370000',
      countryCode: 'US',
      areaCode: '666',
    });
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is 7 and countryCode is not CA or US', () => {
    const result = hasNoAreaCode({
      input: '8370000',
      countryCode: 'GB',
      areaCode: '',
    });
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is 7, countryCode is CA and has areaCode', () => {
    const result = hasNoAreaCode({
      input: '8370000',
      countryCode: 'CA',
      areaCode: '666',
    });
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is 7, countryCode is US and has areaCode', () => {
    const result = hasNoAreaCode({
      input: '8370000',
      countryCode: 'US',
      areaCode: '666',
    });
    expect(result).to.equal(false);
  });

  it('should return true if phoneNumber length is 7, countryCode is US and has not areaCode', () => {
    const result = hasNoAreaCode({
      input: '8370000',
      countryCode: 'US',
      areaCode: '',
    });
    expect(result).to.equal(true);
  });

  it('should return true if phoneNumber length is 7, countryCode is CA and has not areaCode', () => {
    const result = hasNoAreaCode({
      input: '8370000',
      countryCode: 'CA',
      areaCode: '',
    });
    expect(result).to.equal(true);
  });
});
