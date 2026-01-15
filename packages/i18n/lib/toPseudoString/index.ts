import MD5 from 'crypto-js/md5';

/**
 * Parameters for the toPseudoString function
 */
export type ToPseudoStringParams = {
  /** The input string to convert to pseudo-localized format */
  str: string;
  /** Ratio of padding to add around the string (default: 0.3) */
  padRatio?: number;
  /**
   * Character to use for padding (default: '~!@#$%^&*')
   */
  padChar?: string;
};

/**
 * Character mapping for converting ASCII characters to accented Unicode characters.
 * This creates a pseudo-localized version of text that maintains readability
 * while clearly indicating it's not the final localized content.
 */
export const charMap = {
  a: 0x00e5, // å
  b: 0x0180, // ƀ
  c: 0x00e7, // ç
  d: 0x00f0, // ð
  e: 0x00e9, // é
  f: 0x0192, // ƒ
  g: 0x011d, // ĝ
  h: 0x0125, // ĥ
  i: 0x00ee, // î
  j: 0x0135, // ĵ
  k: 0x0137, // ķ
  l: 0x013c, // ļ
  m: 0x0271, // ɱ
  n: 0x00f1, // ñ
  o: 0x00f6, // ö
  p: 0x00fe, // þ
  q: 0x01eb, // ǫ
  r: 0x0155, // ŕ
  s: 0x0161, // š
  t: 0x0163, // ţ
  u: 0x00fb, // û
  v: 0x1e7d, // ṽ
  w: 0x0175, // ŵ
  x: 0x1e8b, // ẋ
  y: 0x00fd, // ý
  z: 0x017e, // ž
  A: 0x00c5, // Å
  B: 0x0181, // Ɓ
  C: 0x00c7, // Ç
  D: 0x00d0, // Ð
  E: 0x00c9, // É
  F: 0x0191, // Ƒ
  G: 0x011c, // Ĝ
  H: 0x0124, // Ĥ
  I: 0x00ce, // Î
  J: 0x0134, // Ĵ
  K: 0x0136, // Ķ
  L: 0x013b, // Ļ
  M: 0x1e40, // Ṁ
  N: 0x00d1, // Ñ
  O: 0x00d6, // Ö
  P: 0x00de, // Þ
  Q: 0x01ea, // Ǫ
  R: 0x0154, // Ŕ
  S: 0x0160, // Š
  T: 0x0162, // Ţ
  U: 0x00db, // Û
  V: 0x1e7c, // Ṽ
  W: 0x0174, // Ŵ
  X: 0x1e8a, // Ẋ
  Y: 0x00dd, // Ý
  Z: 0x017d, // Ž
} as const;

const padCharacters = '~!@#$%^&*';

const replaceFunctions = Object.keys(charMap).map((char) => {
  const regExp = new RegExp(char, 'g');
  const accentChar = String.fromCharCode(charMap[char as keyof typeof charMap]);
  return (str: string) => str.replace(regExp, accentChar);
});

/**
 * Converts ASCII characters in a string to their accented Unicode equivalents.
 * This function creates a pseudo-localized version of text that maintains
 * readability while clearly indicating it's not the final localized content.
 *
 * @param str - The input string to convert
 * @returns The string with ASCII characters replaced by accented Unicode characters
 *
 * @example
 * ```typescript
 * toAccentString('Hello World'); // Returns 'Ĥéļļö Ŵöŕļð'
 * ```
 */
export function toAccentString(str: string) {
  let output = `${str}`;
  replaceFunctions.forEach((fn) => {
    output = fn(output);
  });
  return output;
}

const varsRegExp = /\{.*?\}/;

/**
 * Processes a string by converting variable placeholders (e.g., {name}) to accented text
 * while preserving the placeholder structure. This is useful for pseudo-localization
 * of strings that contain interpolation variables.
 *
 * @param str - The input string containing variable placeholders
 * @returns The string with variable placeholders preserved and other text converted to accented characters
 *
 * @example
 * ```typescript
 * processVars('Hello {name}!'); // Returns 'Ĥéļļö {name}!'
 * processVars('Welcome {user} to {app}'); // Returns 'Ŵéļçöɱé {user} ţö {app}'
 * ```
 */
export function processVars(str: string) {
  // extract {xxx}
  let input = `${str}`;
  const tokens: string[] = [];
  let match = varsRegExp.exec(input);
  while (match) {
    tokens.push(toAccentString(input.substring(0, match.index)));
    tokens.push(input.substr(match.index, match[0].length));
    input = input.substring(match.index + match[0].length);
    match = varsRegExp.exec(input);
  }
  tokens.push(toAccentString(input));
  return tokens.join('');
}

/**
 * Adds padding around a string using special characters to make it more visible
 * during pseudo-localization testing. The padding helps identify where the
 * localized content begins and ends.
 *
 * @param options - Configuration options for padding
 * @param options.str - The string to pad (defaults to empty string)
 * @param options.padRatio - Ratio of padding length relative to string length (default: 0.3)
 * @param options.padChar - Character to use for padding (default: '~!@#$%^&*')
 * @returns The string wrapped with padding characters
 *
 * @example
 * ```typescript
 * padString({ str: 'Hello' }); // Returns '[~!]Hello[~!]'
 * ```
 */
export function padString({
  str,
  padRatio = 0.3,
  padChar = padCharacters,
}: {
  str?: string;
  padRatio?: number;
  padChar?: string;
} = {}) {
  const normalized = str || '';
  const padLen = Math.ceil((normalized.length * padRatio) / 2);
  const padding: string[] = [];
  for (let i = 0; i < padLen; i += 1) {
    padding.push(padChar[i % padChar.length]);
  }
  const padStr = padding.join('');
  return `[${padStr}]${normalized}[${padStr}]`;
}

const escapeRegExp = /'.*?'/;

export function toPseudoString(str: string) {
  let input = `${str}`;
  const tokens: string[] = [];
  let match = escapeRegExp.exec(input);
  while (match) {
    tokens.push(processVars(input.substring(0, match.index)));
    tokens.push(toAccentString(input.substr(match.index, match[0].length)));
    input = input.substring(match.index + match[0].length);
    match = escapeRegExp.exec(input);
  }
  tokens.push(processVars(input));
  const text = tokens.join('');

  return text;
}

/**
 * Converts a string to pseudo-localized format for testing purposes.
 * This function is commonly used in internationalization testing to:
 * - Make it obvious when text hasn't been properly localized
 * - Test UI layout with longer text strings
 * - Preserve variable placeholders and quoted strings
 * - Add visual padding to identify string boundaries
 *
 * The function processes the string in the following order:
 * 1. Preserves quoted strings (single quotes) without modification
 * 2. Processes variable placeholders (e.g., {name}) while converting other text to accented characters
 * 3. Adds padding around the final result
 * 4. Wraps the entire result in square brackets
 *
 * @param params - Configuration parameters for pseudo-localization
 * @param params.str - The input string to convert
 * @param params.padRatio - Ratio of padding to add (default: 0.3)
 * @param params.padChar - Character to use for padding (default: '~!@#$%^&*')
 * @returns The pseudo-localized string wrapped in square brackets
 *
 * @example
 * ```typescript
 * toPseudoString({ str: 'Hello World' });
 * // Returns '[~!@]Ĥéļļö Ŵöŕļð[~!@]'
 *
 * toPseudoString({ str: 'Hello {name}!' });
 * // Returns '[~!@]Ĥéļļö {name}![~!@]'
 *
 * toPseudoString({ str: "Don't click 'Cancel'" });
 * // Returns '[~!@]Ðöñ'ţ çļîçķ 'Cancel'[~!@]'
 * ```
 */
export function toPseudoStringWithPadding({
  str,
  padRatio,
  padChar = padCharacters,
}: ToPseudoStringParams) {
  const text = toPseudoString(str);

  const result = padString({ str: text, padRatio, padChar });
  return `[${result}]`;
}

/**
 * @param filePath
 * @param keyPath if the key is nested in the object, the keyPath is joined by '*' from the root key to the target key, like 'rootKey*subKey*targetKey'
 * @returns
 */
function generateHash(filePath: string, keyPath: string) {
  return MD5(`${filePath}_${keyPath}`).toString().substring(0, 8);
}

export function toHashPseudoString(
  filePath: string,
  keyPath: string,
  value: string,
) {
  const hash = generateHash(filePath, keyPath);
  const text = toPseudoString(value);
  return `${hash} = ${text}`;
}
