// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { oklch } from 'culori/css';

interface Palette {
  [key: string]: string | Palette;
}

const cutNumber = (number: number) => {
  if (number) {
    return +number.toFixed(6);
  } else {
    return 0;
  }
};

const getColor = (color: any) => {
  if (!color) return null;

  try {
    if (
      typeof color === 'string' &&
      (color.includes('rgba') || color === 'transparent')
    )
      return color;

    const input = oklch(color);

    if (!input) return color;

    const { l, c, h } = input;
    return `${parseFloat((cutNumber(l) * 100).toFixed(6))}% ${cutNumber(
      c,
    )} ${cutNumber(h)}`;
  } catch (error) {
    return color;
  }
};

/**
 * Converts a Juno palette object into a string of CSS variables.
 * @param palette - The Juno palette object.
 * @returns A string of CSS variables representing the Juno palette.
 */
export const getCssVariablesFromObject = (palette?: Palette, prefix = '') => {
  const cssVariable =
    palette &&
    Object.entries(palette).reduce((acc, [key, value]) => {
      if (key === 'type') return acc;

      if (typeof value === 'object') {
        const nestedVariables = Object.entries(value).reduce(
          (nestedAcc, [nestedKey, nestedValue]) => {
            const color = getColor(nestedValue);
            if (!color) return nestedAcc;

            return `${nestedAcc}--${prefix}${key}-${nestedKey}: ${color};\n`;
          },
          '',
        );
        return `${acc}${nestedVariables}`;
      } else {
        const color = getColor(value);
        if (!color) return acc;
        return `${acc}--${prefix}${key}: ${color};\n`;
      }
    }, '');
  return cssVariable;
};
