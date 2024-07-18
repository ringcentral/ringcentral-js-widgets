import { rgbToHex } from '../../src/utils/rgbToHex';

describe('rgbToHex', () => {
  it('should convert RGB values to hex color', () => {
    // Test case 1: RGB values within the valid range
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000'); // Red
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00'); // Green
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff'); // Blue

    // Test case 2: RGB values at the lower bound
    expect(rgbToHex(0, 0, 0)).toBe('#000000'); // Black

    // Test case 3: RGB values at the upper bound
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff'); // White
  });

  it('should throw an error for invalid RGB values', () => {
    // Test case: RGB values exceeding the valid range
    expect(() => rgbToHex(256, 0, 0)).toThrow('Invalid color component');
    expect(() => rgbToHex(0, 256, 0)).toThrow('Invalid color component');
    expect(() => rgbToHex(0, 0, 256)).toThrow('Invalid color component');
  });
});
