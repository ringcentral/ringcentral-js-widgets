import parse from '.';

// const pizzahutUS = '+1 650-361-8700';
const pizzahutUK = '+44 1473 748635';

describe('parse', () => {
  test('detect invalid characters', () => {
    expect(parse({ input: 'abc' }).isValid).toBe(false);
  });
  test('detect invalid numbers', () => {
    expect(parse({ input: '' }).isValid).toBe(false);
    expect(parse({ input: '+*234' }).isValid).toBe(false);
    expect(parse({ input: '+' }).isValid).toBe(false);
    expect(parse({ input: '#' }).isValid).toBe(false);
    expect(parse({ input: '-' }).isValid).toBe(false);
    expect(parse({ input: '#-' }).isValid).toBe(false);
    expect(parse({ input: '_' }).isValid).toBe(false);
    expect(parse({ input: '_#' }).isValid).toBe(false);
  });

  test('parse correct number', () => {
    expect(parse({ input: '+1 650-361-8700' })).toMatchObject({
      input: '+1 650-361-8700',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: 'US',
      parsedNumber: '6503618700',
      phoneNumber: '+16503618700',
      extension: null,
      isValid: true,
      hasPlus: true,
    });
  });

  test('detect country', () => {
    expect(parse({ input: pizzahutUK })).toMatchObject({
      input: pizzahutUK,
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: 'GB',
      parsedNumber: '1473748635',
      phoneNumber: '+441473748635',
      extension: null,
      isValid: true,
      hasPlus: true,
    });
  });

  test('parse correct number without +', () => {
    expect(parse({ input: '1 650-361-8700' })).toMatchObject({
      input: '1 650-361-8700',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: 'US',
      phoneNumber: '16503618700',
      parsedNumber: '6503618700',
      extension: null,
      isValid: true,
      hasPlus: false,
    });
  });

  test('parse correct number without country code', () => {
    expect(parse({ input: '650-361-8700' })).toMatchObject({
      input: '650-361-8700',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: 'US',
      phoneNumber: '6503618700',
      parsedNumber: '6503618700',
      extension: null,
      isValid: true,
      hasPlus: false,
    });
  });

  test('parse number with extension', () => {
    expect(parse({ input: '650-361-8700 * 123' })).toMatchObject({
      input: '650-361-8700 * 123',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: 'US',
      parsedNumber: '6503618700',
      phoneNumber: '6503618700',
      extension: '123',
      isValid: true,
      hasPlus: false,
    });
    expect(parse({ input: '+1 650-361-8700 * 123' })).toMatchObject({
      input: '+1 650-361-8700 * 123',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: 'US',
      phoneNumber: '+16503618700',
      parsedNumber: '6503618700',
      extension: '123',
      isValid: true,
      hasPlus: true,
    });
  });

  test('parse service number', () => {
    expect(parse({ input: '*123' })).toMatchObject({
      input: '*123',
      isServiceNumber: true,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: null,
      parsedNumber: null,
      phoneNumber: '*123',
      extension: null,
      isValid: true,
      hasPlus: false,
    });
  });

  test('parse extension number', () => {
    expect(parse({ input: '123456' })).toMatchObject({
      input: '123456',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: true,
      parsedCountry: null,
      parsedNumber: null,
      phoneNumber: '123456',
      extension: null,
      isValid: true,
      hasPlus: false,
    });
  });
  test('parse extension number with max extension length is 8 digits', () => {
    expect(parse({ input: '12345678', maxExtensionLength: 8 })).toMatchObject({
      input: '12345678',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: true,
      parsedCountry: null,
      parsedNumber: null,
      phoneNumber: '12345678',
      extension: null,
      isValid: true,
      hasPlus: false,
    });
    expect(
      parse({ input: '12345678 * 103', maxExtensionLength: 8 }),
    ).toMatchObject({
      input: '12345678 * 103',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: true,
      parsedCountry: null,
      parsedNumber: null,
      phoneNumber: '12345678',
      extension: null,
      isValid: true,
      hasPlus: false,
    });
  });
  test('parse short number with +', () => {
    expect(parse({ input: '+123456' })).toMatchObject({
      input: '+123456',
      isServiceNumber: false,
      hasInvalidChars: false,
      isExtension: false,
      parsedCountry: null,
      parsedNumber: '+1 234 56',
      phoneNumber: '+123456',
      extension: null,
      isValid: true,
      hasPlus: true,
    });
  });

  test('extract extended controls', () => {
    expect(parse({ input: '+12345,,123,45#' })).toMatchObject({
      extendedControls: [',', ',', '123', ',', '45#'],
    });
  });
});
