import { expect } from 'chai';
import formatNumber from './index';

describe('formatNumber', () => {
  it('should be a function', () => {
    expect(formatNumber).to.be.a('function');
  });
  it('should return a string', () => {
    expect(formatNumber({ phoneNumber: '12345' })).to.be.a('string');
  });

  it('should return empty string if no numbers are in the input string', () => {
    expect(formatNumber({ phoneNumber: 'foo' })).to.equal('');
    expect(formatNumber({ phoneNumber: 'bar' })).to.equal('');
  });

  it('should default to US', () => {
    const phoneNumber = '1234567890';
    expect(formatNumber({ phoneNumber }))
      .to.equal(formatNumber({ phoneNumber, countryCode: 'US' }));
  });
  it('should return number as extension if number is shorter than 7 digits', () => {
    [
      '1',
      '12',
      '123',
      '12345',
      '12345*12345',
      '123456',
    ].forEach((phoneNumber) => {
      expect(formatNumber({
        phoneNumber,
      })).to.equal(phoneNumber.split('*').pop());
    });
  });
  it('should only remove extension number if params.removeExtension is true', () => {
    const phoneNumber = '1234567890';
    const extension = '123';
    expect(formatNumber({
      phoneNumber: `${phoneNumber}*${extension}`,
      removeExtension: true,
    })).to.equal(formatNumber({ phoneNumber }));
    expect(formatNumber({
      phoneNumber: `${phoneNumber}*${extension}`,
      removeExtension: false,
    })).to.equal(formatNumber({ phoneNumber: `${phoneNumber}*${extension}` }));
  });

  it('should add areaCode if phoneNumber is 7 digits and countryCode is US or CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(formatNumber({
      phoneNumber,
      areaCode,
      countryCode: 'US'
    })).to.equal(formatNumber({
      phoneNumber: `${areaCode}${phoneNumber}`,
      countryCode: 'US',
    }));
    expect(formatNumber({
      phoneNumber,
      areaCode,
      countryCode: 'CA'
    })).to.equal(formatNumber({
      phoneNumber: `${areaCode}${phoneNumber}`,
      countryCode: 'CA',
    }));
  });

  it('should ignore areaCode if countryCode is not US or CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(formatNumber({
      phoneNumber,
      areaCode,
      countryCode: 'GB'
    })).to.equal(formatNumber({
      phoneNumber,
      countryCode: 'GB',
    }));
  });

  it('should not differentiate US and CA numbers', () => {
    const ca = [
      '+1-613-555-0177',
      '+1-613-555-0174',
      '+1-613-555-0194',
      '+1-613-555-0189',
      '+1-613-555-0127',
      '+1-613-555-0105',
    ];
    const us = [
      '+1-202-555-0139',
      '+1-202-555-0142',
      '+1-202-555-0139',
      '+1-202-555-0169',
      '+1-202-555-0187',
      '+1-202-555-0177',
    ];
    ca.forEach((n) => {
      expect(formatNumber({
        phoneNumber: n,
        countryCode: 'US'
      })).to.equal(formatNumber({
        phoneNumber: n,
        countryCode: 'CA',
      }));
    });
    us.forEach((n) => {
      expect(formatNumber({
        phoneNumber: n,
        countryCode: 'US'
      })).to.equal(formatNumber({
        phoneNumber: n,
        countryCode: 'CA',
      }));
    });
  });

  it('should differentiate between other NA numbers', () => {
    const phoneNumber = '+17872628888'; // Puerto Rico Pizza Hut
    expect(formatNumber({
      phoneNumber,
      countryCode: 'US'
    })[0] === '+').to.be.true;
  });
  it('should format to localFormat if phoneNumber matchs countryCode', () => {
    expect(formatNumber({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US'
    })[0] !== '+').to.be.true;
    expect(formatNumber({
      phoneNumber: '202-555-0139',
      countryCode: 'US'
    })[0] !== '+').to.be.true;
    expect(formatNumber({
      phoneNumber: '+44 20 7930 9114',
      countryCode: 'GB'
    })[0] !== '+').to.be.true;
    expect(formatNumber({
      phoneNumber: '20 7930 9114',
      countryCode: 'GB'
    })[0] !== '+').to.be.true;
  });
  it ('should format to international format if options.international is set to true', () => {
    expect(formatNumber({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US',
      international: true,
    })).to.equal(formatNumber({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'GB',
    }));
  });
});
