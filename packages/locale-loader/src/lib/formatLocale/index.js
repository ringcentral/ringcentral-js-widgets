/**
 * @function
 * @description Format the input locale name
 * @param {String} locale
 * @returns {String}
 */
export default function formatLocale(locale, delimeter = '-') {
  const tokens = locale.split(/[-_]/);
  tokens[0] = tokens[0].toLowerCase();
  if (tokens.length > 1) {
    tokens[tokens.length - 1] = tokens[tokens.length - 1].toUpperCase();
  }
  if (tokens.length > 2) {
    tokens[1] = `${tokens[1][0].toUpperCase()}${tokens[1].substring(1).toLowerCase()}`;
  }
  return tokens.join(delimeter);
}
