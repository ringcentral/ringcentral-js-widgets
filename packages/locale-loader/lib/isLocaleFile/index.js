const localeFileRegExp = /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
const fileRegExp = /\.(js)$/i;

/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @returns {Boolean}
 */
export default function (filename) {
  if (!fileRegExp.test(filename)) {
    return false;
  }
  const name = filename.replace(fileRegExp, '');
  return localeFileRegExp.test(name);
}
