/**
 * Converts RGB color values to a hexadecimal color string.
 * @param r - The red color component (0-255).
 * @param g - The green color component (0-255).
 * @param b - The blue color component (0-255).
 * @returns The hexadecimal color string representation.
 * @throws {string} If any of the color components are invalid.
 * @example
 * // Convert RGB values to hexadecimal color
 * const hexColor = rgbToHex(255, 0, 0);
 * console.log(hexColor); // Output: "ff0000"
 */
export function rgbToHex(r: number, g: number, b: number) {
  if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
  const value = ((r << 16) | (g << 8) | b).toString(16);

  const hex = '#' + ('000000' + value).slice(-6);

  return hex;
}
