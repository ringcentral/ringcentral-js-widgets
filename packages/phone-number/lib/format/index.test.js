import format, { formatTypes } from './index';

describe('format', () => {
  test('should return a string', () => {
    expect(typeof format({ phoneNumber: '12345' })).toBe('string');
    expect(typeof format({ phoneNumber: '+1 650-361-8700' })).toBe('string');
  });

  test('should return empty string if no numbers are in the input string', () => {
    expect(format({ phoneNumber: 'foo' })).toBe('');
    expect(format({ phoneNumber: 'bar' })).toBe('');
  });

  test('should default to US', () => {
    const phoneNumber = '1234567890';
    expect(format({ phoneNumber }))
      .toBe(format({ phoneNumber, countryCode: 'US' }));
  });

  test('should format a number', () => {
    const phoneNumber = '1234567890';
    expect(format({ phoneNumber }).length)
      .not.toBe(phoneNumber.length);
  });

  test('should default to local format', () => {
    const phoneNumber = '1234567890';
    expect(format({ phoneNumber }))
      .toBe(format({ phoneNumber, type: formatTypes.local }));
  });
  test('should return number as extension if number is shorter than 7 digits', () => {
    [
      '1',
      '12',
      '123',
      '12345',
      '12345*12345',
      '123456',
    ].forEach((phoneNumber) => {
      expect(format({
        phoneNumber,
      })).toBe(phoneNumber.split('*').pop());
    });
  });
  test('should only remove extension number if params.removeExtension is true', () => {
    const phoneNumber = '1234567890';
    const extension = '123';
    expect(format({
      phoneNumber: `${phoneNumber}*${extension}`,
      removeExtension: true,
    })).toBe(format({ phoneNumber }));
    expect(format({
      phoneNumber: `${phoneNumber}*${extension}`,
      removeExtension: false,
    })).toBe(format({ phoneNumber: `${phoneNumber}*${extension}` }));
  });

  test('should add areaCode if phoneNumber is 7 digits and countryCode is US or CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(format({
      phoneNumber,
      areaCode,
      countryCode: 'US'
    })).toBe(format({
      phoneNumber: `${areaCode}${phoneNumber}`,
      countryCode: 'US',
    }));
    expect(format({
      phoneNumber,
      areaCode,
      countryCode: 'CA'
    })).toBe(format({
      phoneNumber: `${areaCode}${phoneNumber}`,
      countryCode: 'CA',
    }));
  });

  test('should ignore areaCode if countryCode is not US or CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(format({
      phoneNumber,
      areaCode,
      countryCode: 'GB'
    })).toBe(format({
      phoneNumber,
      countryCode: 'GB',
    }));
  });

  test('should not differentiate US and CA numbers', () => {
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
      expect(format({
        phoneNumber: n,
        countryCode: 'US'
      })).toBe(format({
        phoneNumber: n,
        countryCode: 'CA',
      }));
    });
    us.forEach((n) => {
      expect(format({
        phoneNumber: n,
        countryCode: 'US'
      })).toBe(format({
        phoneNumber: n,
        countryCode: 'CA',
      }));
    });
  });

  test('should differentiate between other NA numbers', () => {
    const phoneNumber = '+17872628888'; // Puerto Rico Pizza Hut
    expect(format({
      phoneNumber,
      countryCode: 'US'
    })[0] === '+').toBe(true);
  });
  test('should format to localFormat if phoneNumber matchs countryCode', () => {
    expect(format({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US'
    })[0] !== '+').toBe(true);
    expect(format({
      phoneNumber: '202-555-0139',
      countryCode: 'US'
    })[0] !== '+').toBe(true);
    expect(format({
      phoneNumber: '+44 20 7930 9114',
      countryCode: 'GB'
    })[0] !== '+').toBe(true);
    expect(format({
      phoneNumber: '20 7930 9114',
      countryCode: 'GB'
    })[0] !== '+').toBe(true);
    expect(format({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US'
    })).toBe('(202) 555-0139');
    expect(format({
      phoneNumber: '+44 20 7930 9114',
      countryCode: 'GB'
    })).toBe('020 7930 9114');
  });
  test('should format to international format if options.international is set to true', () => {
    expect(format({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US',
      type: formatTypes.international,
    })).toBe(format({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'GB',
    }));
  });
  test('should format to international format if phoneNumber not match courtryCode', () => {
    expect(format({
      phoneNumber: '+44-202-555-0139',
      countryCode: 'US',
    })).toBe(format({
      phoneNumber: '+44-202-555-0139',
      countryCode: 'US',
      type: formatTypes.international,
    }));
  });
});

