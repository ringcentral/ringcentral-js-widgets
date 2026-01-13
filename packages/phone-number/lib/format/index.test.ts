import format, { formatSameSiteExtension, formatTypes } from './index';

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
    const phoneNumber = '16503618700';
    expect(format({ phoneNumber })).toBe(
      format({ phoneNumber, countryCode: 'US' }),
    );
  });

  test('should format a number', () => {
    const phoneNumber = '16503618700';
    expect(format({ phoneNumber })?.length).not.toBe(phoneNumber.length);
  });

  test('should default to local format', () => {
    const phoneNumber = '16503618700';
    expect(format({ phoneNumber })).toBe(
      format({ phoneNumber, type: formatTypes.local }),
    );
  });
  test('should return number as extension if number is shorter than 7 digits', () => {
    ['1', '12', '123', '12345', '12345*12345', '123456'].forEach(
      (phoneNumber) => {
        expect(
          format({
            phoneNumber,
          }),
        ).toBe(phoneNumber.split('*').pop());
      },
    );
  });
  test('should only remove extension number if params.removeExtension is true', () => {
    const phoneNumber = '16503618700';
    const extension = '123';
    expect(
      format({
        phoneNumber: `${phoneNumber}*${extension}`,
        removeExtension: true,
      }),
    ).toBe(format({ phoneNumber }));
    expect(
      format({
        phoneNumber: `${phoneNumber}*${extension}`,
        removeExtension: false,
      }),
    ).toBe(format({ phoneNumber: `${phoneNumber}*${extension}` }));
  });

  test('should add areaCode if phoneNumber is 7 digits and countryCode is CA 2', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(
      format({
        phoneNumber,
        areaCode,
        countryCode: 'CA',
      }),
    ).toBe(
      format({
        phoneNumber: `${areaCode}${phoneNumber}`,
        countryCode: 'CA',
        type: formatTypes.international,
      }),
    );
  });

  test('should ignore areaCode if countryCode is not CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(
      format({
        phoneNumber,
        areaCode,
        countryCode: 'GB',
      }),
    ).toBe(
      format({
        phoneNumber,
        countryCode: 'GB',
      }),
    );
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
      expect(
        format({
          phoneNumber: n,
          countryCode: 'US',
        }),
      ).toBe(
        format({
          phoneNumber: n,
          countryCode: 'CA',
        }),
      );
    });
    us.forEach((n) => {
      expect(
        format({
          phoneNumber: n,
          countryCode: 'US',
        }),
      ).toBe(
        format({
          phoneNumber: n,
          countryCode: 'CA',
        }),
      );
    });
  });

  test('PR should not be formatted as international number', () => {
    const phoneNumber = '+17872628888'; // Puerto Rico Pizza Hut
    expect(
      format({
        phoneNumber,
        countryCode: 'US',
      })?.[0] === '+',
    ).toBe(false);
  });
  test('should format to localFormat if phoneNumber matchs countryCode', () => {
    expect(
      format({
        phoneNumber: '+1-202-555-0139',
        countryCode: 'US',
      })?.[0] !== '+',
    ).toBe(true);
    expect(
      format({
        phoneNumber: '202-555-0139',
        countryCode: 'US',
      })?.[0] !== '+',
    ).toBe(true);
    expect(
      format({
        phoneNumber: '+44 20 7930 9114',
        countryCode: 'GB',
      })?.[0] !== '+',
    ).toBe(true);
    expect(
      format({
        phoneNumber: '20 7930 9114',
        countryCode: 'GB',
      })?.[0] !== '+',
    ).toBe(true);
    expect(
      format({
        phoneNumber: '+1-202-555-0139',
        countryCode: 'US',
      }),
    ).toBe('(202) 555-0139');
    expect(
      format({
        phoneNumber: '+44 20 7930 9114',
        countryCode: 'GB',
      }),
    ).toBe('020 7930 9114');
  });
  test('should format to international format if options.international is set to true', () => {
    expect(
      format({
        phoneNumber: '+1-202-555-0139',
        countryCode: 'US',
        type: formatTypes.international,
      }),
    ).toBe(
      format({
        phoneNumber: '+1-202-555-0139',
        countryCode: 'GB',
      }),
    );
  });
  test('should format to international format if phoneNumber not match courtryCode', () => {
    expect(
      format({
        phoneNumber: '+44-202-555-0139',
        countryCode: 'US',
      }),
    ).toBe(
      format({
        phoneNumber: '+44-202-555-0139',
        countryCode: 'US',
        type: formatTypes.international,
      }),
    );
  });

  test('should normalize numbers into E164 format', () => {
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
    ].forEach((phoneNumber) => {
      expect(
        format({
          phoneNumber,
          type: formatTypes.e164,
        }),
      ).toBe(phoneNumber.replace(/[- ]/g, ''));
    });
  });
  test('should add country code', () => {
    [
      '613-555-0177',
      '613-555-0174',
      '613-555-0194',
      '613-555-0189',
      '613-555-0127',
      '613-555-0105',
    ].forEach((phoneNumber) => {
      expect(
        format({
          phoneNumber,
          countryCode: 'US',
          type: formatTypes.e164,
        }),
      ).toBe(
        format({
          phoneNumber: `+1${phoneNumber}`,
          countryCode: 'US',
          type: formatTypes.e164,
        }),
      );
    });
  });
  test('should ignore areaCode if the number already contains areaCode', () => {
    [
      '613-555-0177',
      '613-555-0174',
      '613-555-0194',
      '613-555-0189',
      '613-555-0127',
      '613-555-0105',
    ].forEach((phoneNumber) => {
      expect(
        format({
          phoneNumber,
          countryCode: 'US',
          areaCode: '650',
          type: formatTypes.e164,
        }),
      ).toBe(
        format({
          phoneNumber: `+1${phoneNumber}`,
          countryCode: 'US',
          type: formatTypes.e164,
        }),
      );
    });
  });
  test('should return empty string if number is invalid', () => {
    ['foo', '+bar'].forEach((phoneNumber) => {
      expect(
        format({
          phoneNumber,
          type: formatTypes.e164,
        }),
      ).toBe('');
    });
  });
  test('should return number as extension if number is shorter than 6 digits', () => {
    ['1', '12', '123', '12345', '12345*12345'].forEach((phoneNumber) => {
      expect(
        format({
          phoneNumber,
          type: formatTypes.e164,
        }),
      ).toBe(phoneNumber.split('*').pop());
    });
  });
  test('should add areaCode if phoneNumber is 7 digits and countryCode is CA', () => {
    const phoneNumber = '1234567';
    const areaCode = '890';
    expect(
      format({
        phoneNumber,
        areaCode,
        countryCode: 'CA',
        type: formatTypes.e164,
      }),
    ).toBe(
      format({
        phoneNumber: `${areaCode}${phoneNumber}`,
        countryCode: 'CA',
        type: formatTypes.e164,
      }),
    );
  });
  test('should only remove extension number if params.removeExtension is true 3', () => {
    const phoneNumber = '16503618700';
    const extension = '123';
    expect(
      format({
        phoneNumber: `${phoneNumber}*${extension}`,
        removeExtension: true,
        type: formatTypes.e164,
      }),
    ).toBe(
      format({
        phoneNumber,
        type: formatTypes.e164,
      }),
    );
    expect(
      format({
        phoneNumber: `${phoneNumber}*${extension}`,
        removeExtension: false,
        type: formatTypes.e164,
      }),
    ).toBe(
      format({
        phoneNumber: `${phoneNumber}*${extension}`,
        type: formatTypes.e164,
      }),
    );
  });
  test('should keep extension number intact when multi-site disabled', () => {
    const originExtensionNumber = '22702';
    expect(
      format({
        phoneNumber: originExtensionNumber,
      }),
    ).toBe(originExtensionNumber);
  });
  test('should only remove site code in extension number when same site', () => {
    const siteIsSameWithExtension = '22';
    const siteIsDifferentFromExtension = '37';
    const longExtension = '22702';
    const shortExtension = '702';
    expect(
      format({
        phoneNumber: longExtension,
        siteCode: siteIsSameWithExtension,
        isMultipleSiteEnabled: true,
      }),
    ).toBe(shortExtension);
    expect(
      format({
        phoneNumber: longExtension,
        siteCode: siteIsDifferentFromExtension,
        isMultipleSiteEnabled: true,
      }),
    ).toBe(longExtension);
  });
});

describe('formatSameSiteExtension', () => {
  test('should return the extension as is when currentSiteCode is empty', () => {
    const result = formatSameSiteExtension({
      currentSiteCode: '',
      extension: '1234',
    });
    expect(result).toBe('1234');
  });

  test('should return the extension as is when extension does not start with currentSiteCode', () => {
    const result = formatSameSiteExtension({
      currentSiteCode: '567',
      extension: '56701234',
    });
    expect(result).toBe('1234');
  });
});
