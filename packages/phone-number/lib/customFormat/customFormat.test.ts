import { customFormat } from './customFormat';

describe('customFormat', () => {
  it('should format phone numbers with custom format template', () => {
    const localUSNumbers = [
      '(650) 555-1234',
      '6505551234',
      '650.555.1234',
      '650-555-1234',
      '650 555 1234',
    ];
    let template = 'XXX-XXX-XXXX';
    localUSNumbers.forEach((localPhoneNumber) => {
      expect(customFormat({ localPhoneNumber, template })).toBe('650-555-1234');
    });
    template = '(XXX) XXX-XXXX';
    localUSNumbers.forEach((localPhoneNumber) => {
      expect(customFormat({ localPhoneNumber, template })).toBe(
        '(650) 555-1234',
      );
    });
    template = 'XXX.XXX.XXXX';
    localUSNumbers.forEach((localPhoneNumber) => {
      expect(customFormat({ localPhoneNumber, template })).toBe('650.555.1234');
    });
    template = 'XXX XXX XXXX';
    localUSNumbers.forEach((localPhoneNumber) => {
      expect(customFormat({ localPhoneNumber, template })).toBe('650 555 1234');
    });
  });
  it("should throw an error if the number of digits in the phone number doesn't match the number of template characters in strict mode", () => {
    const localPhoneNumber = '6505551234';
    const template = 'XXX-XXX-XXX';
    expect(() =>
      customFormat({ localPhoneNumber, template, strict: true }),
    ).toThrow(
      `Invalid custom format: 6505551234 => XXX-XXX-XXX, number of digits don't match: 10 !== 9`,
    );
  });
  it('should ignore extra digits in non strict mode', () => {
    const localPhoneNumber = '6505551234';
    const template = 'XXX-XXX-XXX';
    expect(customFormat({ localPhoneNumber, template })).toBe('650-555-123');
  });
  it('should ignore extra template characters in non strict mode', () => {
    const localPhoneNumber = '6505551234';
    const template = 'XXX-XXX-XXXXX';
    expect(customFormat({ localPhoneNumber, template })).toBe('650-555-1234');
  });
  it('should format phone numbers with custom format template and custom template character', () => {
    const localUSNumbers = [
      '(650) 555-1234',
      '6505551234',
      '650.555.1234',
      '650-555-1234',
      '650 555 1234',
    ];
    const template = 'YYY-YYY-YYYY';
    const templateChar = 'Y';
    localUSNumbers.forEach((localPhoneNumber) => {
      expect(customFormat({ localPhoneNumber, template, templateChar })).toBe(
        '650-555-1234',
      );
    });
  });
});
