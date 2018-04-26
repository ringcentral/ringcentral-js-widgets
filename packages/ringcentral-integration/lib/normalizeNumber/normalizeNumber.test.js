import { expect } from 'chai';
import normalizeNumber from './index';
import cleanNumber from '../cleanNumber';

describe('normalizeNumber', () => {
  it('should be a function', () => {
    expect(normalizeNumber).to.be.a('function');
  });
  it('should normalize numbers into E164 format', () => {
    [
      '+1-613-555-0177',
      '+1-613-555-0174',
      '+1-613-555-0194',
      '+1-613-555-0189',
      '+1-613-555-0127',
      '+1-613-555-0105',
      '+1-202-555-0139',
      '+1-202-555-0142',
      '+1-202-555-0139',
      '+1-202-555-0169',
      '+1-202-555-0187',
      '+1-202-555-0177',
      '+44 20 7930 9114',
      '+33 4 73 25 21 42',
    ].forEach(phoneNumber => {
      expect(normalizeNumber({
        phoneNumber,
      })).to.equal(cleanNumber(phoneNumber));
    });
  });
  it('should add country code', () => {
    [
      '613-555-0177',
      '613-555-0174',
      '613-555-0194',
      '613-555-0189',
      '613-555-0127',
      '613-555-0105',
    ].forEach(phoneNumber => {
      expect(normalizeNumber({
        phoneNumber,
        countryCode: 'US',
      })).to.equal(normalizeNumber({
        phoneNumber: `+1${phoneNumber}`,
        countryCode: 'US',
      }));
    });
  });
  it('should return empty string if number is invalid', () => {
    [
      'foo',
      '+bar',
    ].forEach(phoneNumber => {
      expect(normalizeNumber({
        phoneNumber,
      })).to.equal('');
    });
  });
   it('should return number as extension if number is shorter than 6 digits', () => {
    [
      '1',
      '12',
      '123',
      '12345',
      '12345*12345'
    ].forEach(phoneNumber => {
      expect(normalizeNumber({
        phoneNumber,
      })).to.equal(phoneNumber.split('*').pop());
    });
  });
  it('should add areaCode if phoneNumber is 7 digits and countryCode is US or CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(normalizeNumber({
      phoneNumber,
      areaCode,
      countryCode: 'US'
    })).to.equal(normalizeNumber({
      phoneNumber: `${areaCode}${phoneNumber}`,
      countryCode: 'US',
    }));
    expect(normalizeNumber({
      phoneNumber,
      areaCode,
      countryCode: 'CA'
    })).to.equal(normalizeNumber({
      phoneNumber: `${areaCode}${phoneNumber}`,
      countryCode: 'CA',
    }));
  });
  it('should only remove extension number if params.removeExtension is true', () => {
    const phoneNumber = '1234567890';
    const extension = '123';
    expect(normalizeNumber({
      phoneNumber: `${phoneNumber}*${extension}`,
      removeExtension: true,
    })).to.equal(normalizeNumber({ phoneNumber }));
    expect(normalizeNumber({
      phoneNumber: `${phoneNumber}*${extension}`,
      removeExtension: false,
    })).to.equal(normalizeNumber({ phoneNumber: `${phoneNumber}*${extension}` }));
  });

});
