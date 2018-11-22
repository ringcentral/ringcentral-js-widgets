'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLocaleFile;
var localeFileRegExp = /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
var fileRegExp = /\.(js)$/i;

/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @returns {Boolean}
 */
function isLocaleFile(filename) {
  if (!fileRegExp.test(filename)) {
    return false;
  }
  var name = filename.replace(fileRegExp, '');
  return localeFileRegExp.test(name);
}

function localeFilter(locales) {
  return function (filename) {
    if (!Array.isArray(locales) || locales.length === 0) {
      return true;
    }
    var name = filename.replace(fileRegExp, '');
    return locales.includes(name);
  };
}

exports.isLocaleFile = isLocaleFile;
exports.localeFilter = localeFilter;
//# sourceMappingURL=index.js.map
