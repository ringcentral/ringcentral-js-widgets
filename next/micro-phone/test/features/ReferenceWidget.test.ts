import { DEFAULT_FINDER } from '../../src/app/components/ReferenceWidget';

describe('DEFAULT_FINDER', () => {
  describe('getValue', () => {
    it('should return the id if the item is an object with an id property', () => {
      const item = { id: '123' };
      expect(DEFAULT_FINDER.getValue(item)).toBe('123');
    });

    it('should return the item itself if it is not an object', () => {
      const item = 'test';
      expect(DEFAULT_FINDER.getValue(item)).toBe('test');
    });

    it('should return null if the item is an object without an id', () => {
      const item = { name: 'test' };
      expect(DEFAULT_FINDER.getValue(item)).toBeNull();
    });
  });

  describe('searchOption', () => {
    it('should return true if the option name includes the text regardless of case', () => {
      const option = { name: 'TestOption' };
      const text = 'test';
      expect(DEFAULT_FINDER.searchOption(option, text)).toBeTruthy();
    });

    it('should return false if the option name does not include the text', () => {
      const option = { name: 'TestOption' };
      const text = 'xyz';
      expect(DEFAULT_FINDER.searchOption(option, text)).toBeFalsy();
    });

    it('should handle cases where option name or text is undefined', () => {
      const option = { name: undefined };
      const text = 'test';
      expect(DEFAULT_FINDER.searchOption(option, text)).toBeFalsy();
    });

    // Assuming searchOption should return false when option has no name property
    it('should return false if the option has no name property', () => {
      const option = { id: '123' };
      const text = 'test';
      expect(DEFAULT_FINDER.searchOption(option, text)).toBeFalsy();
    });
  });
});
