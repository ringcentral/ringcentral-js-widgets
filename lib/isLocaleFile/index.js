'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (filename) {
  if (!fileRegExp.test(filename)) {
    return false;
  }
  var name = filename.replace(fileRegExp, '');
  return localeFileRegExp.test(name);
};

var localeFileRegExp = /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
var fileRegExp = /\.(js)$/i;

/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @returns {Boolean}
 */
//# sourceMappingURL=index.js.map
