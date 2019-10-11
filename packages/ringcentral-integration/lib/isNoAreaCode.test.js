import { expect } from 'chai';
import isNoAreaCode from './isNoAreaCode';

describe('isNoAreaCode', () => {
  let brandId = '1210';
  it('should return false if phoneNumber is ServiceNumber', () => {
    const regionSettings = {
      countryCode: 'US',
      areaCode: '666',
    };
    const result = isNoAreaCode('*101', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber is hasPlus', () => {
    const regionSettings = {
      countryCode: 'US',
      areaCode: '666',
    };
    const result = isNoAreaCode('+16508370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is not 7', () => {
    const regionSettings = {
      countryCode: 'US',
      areaCode: '666',
    };
    const result = isNoAreaCode('16508370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is 7 and countryCode is not CA or US', () => {
    const regionSettings = {
      countryCode: 'GB',
      areaCode: '',
    };
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is 7, countryCode is CA and has areaCode', () => {
    const regionSettings = {
      countryCode: 'CA',
      areaCode: '666',
    };
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return false if phoneNumber length is 7, countryCode is US and has areaCode', () => {
    const regionSettings = {
      countryCode: 'US',
      areaCode: '666',
    };
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return true if phoneNumber length is 7, countryCode is US and has not areaCode', () => {
    const regionSettings = {
      countryCode: 'US',
      areaCode: '',
    };
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(true);
  });

  it('should return true if phoneNumber length is 7, countryCode is CA and has not areaCode', () => {
    const regionSettings = {
      countryCode: 'CA',
      areaCode: '',
    };
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(true);
  });

  it('should return false if brand is telus', () => {
    const regionSettings = {
      countryCode: 'CA',
      areaCode: '',
    };
    brandId = '7310';
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });

  it('should return false if brand is bt', () => {
    const regionSettings = {
      countryCode: 'CA',
      areaCode: '',
    };
    brandId = '7710';
    const result = isNoAreaCode('8370000', regionSettings, brandId);
    expect(result).to.equal(false);
  });
});
