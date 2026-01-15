import {
  maskSensitiveData,
  maskPhoneNumber,
  maskEmail,
  maskIdNumber,
} from '../../src/utils/maskSensitiveData';

describe('maskSensitiveData', () => {
  describe('maskSensitiveData', () => {
    test('should mask sensitive data with default settings', () => {
      expect(maskSensitiveData('1234567890')).toBe('123*******');
      expect(maskSensitiveData('123')).toBe('***');
      expect(maskSensitiveData('')).toBe('***');
      expect(maskSensitiveData(null)).toBe('***');
      expect(maskSensitiveData(undefined)).toBe('***');
    });

    test('should mask with custom visible length', () => {
      expect(maskSensitiveData('1234567890', 2)).toBe('12********');
      expect(maskSensitiveData('1234567890', 5)).toBe('12345*****');
    });

    test('should mask with custom mask character', () => {
      expect(maskSensitiveData('1234567890', 3, '#')).toBe('123#######');
    });
  });

  describe('maskPhoneNumber', () => {
    test('should mask phone number showing first 3 and last 4 digits', () => {
      expect(maskPhoneNumber('1234567890')).toBe('123***7890');
      expect(maskPhoneNumber('12345678901')).toBe('123****8901');
      expect(maskPhoneNumber('1234567')).toBe('123****');
      expect(maskPhoneNumber('123')).toBe('***');
    });
  });

  describe('maskEmail', () => {
    test('should mask email showing first 2 characters of username', () => {
      expect(maskEmail('test@example.com')).toBe('te**@example.com');
      expect(maskEmail('user@domain.org')).toBe('us**@domain.org');
      expect(maskEmail('a@b.com')).toBe('a*@b.com');
      expect(maskEmail('invalid-email')).toBe('in***********');
    });
  });

  describe('maskIdNumber', () => {
    test('should mask ID number showing first 4 and last 4 digits', () => {
      expect(maskIdNumber('1234567890123456')).toBe('1234********3456');
      expect(maskIdNumber('1234567890')).toBe('1234**7890');
      expect(maskIdNumber('12345678')).toBe('1234****');
      expect(maskIdNumber('1234')).toBe('****');
    });
  });
});
