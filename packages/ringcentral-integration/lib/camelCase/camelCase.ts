/**
 * Modelled after https://www.npmjs.com/package/camelcase. This lib contains 'use strict' that
 * disrupts compiling for IE support, so we replaced it with this function.
 */
export const camelCase = (str: string, pascalCase = false) => {
  if (Array.isArray(str)) {
    str = str
      .map((x) => x.trim())
      .filter((x) => x.length)
      .join(' ');
  } else {
    str = str.trim();
  }

  return str
    .replace(/[A-Z]{2,}[a-z]/g, ($1) => {
      // if there are two or more uppercase characters and last character is lowercase, add split before last character
      return `${$1.slice(0, $1.length - 2)}-${$1.slice($1.length - 2)}`;
    })
    .replace(/[a-z][A-Z]/g, ($1) => {
      // if the first character is lowercase, the last character is uppercase, add split before last character
      return `${$1.slice(0, $1.length - 1)}-${$1.slice($1.length - 1)}`;
    })
    .replace(/[_-]+/g, ' ') // replace '-_' with space
    .toLowerCase()
    .replace(/\s(.)/g, ($1) => {
      return $1.toUpperCase(); // use camelcase for every split string
    })
    .replace(/\d+[a-z]/g, ($1) => $1.toUpperCase())
    .replace(/\s/g, '') // combine
    .replace(/^(.)/, ($1) => {
      return pascalCase ? $1.toUpperCase() : $1.toLowerCase(); // option for first character is uppercase or not
    });
};
