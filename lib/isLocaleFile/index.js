"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLocaleFile;
exports.localeFilter = localeFilter;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.replace");

var localeFileRegExp = /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
var fileRegExp = /\.(js|ts)$/i;
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
//# sourceMappingURL=index.js.map
