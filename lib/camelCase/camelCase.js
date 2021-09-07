"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelCase = void 0;

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.is-array");

/**
 * Modelled after https://www.npmjs.com/package/camelcase. This lib contains 'use strict' that
 * disrupts compiling for IE support, so we replaced it with this function.
 */
var camelCase = function camelCase(str) {
  var pascalCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Array.isArray(str)) {
    str = str.map(function (x) {
      return x.trim();
    }).filter(function (x) {
      return x.length;
    }).join(' ');
  } else {
    str = str.trim();
  }

  return str.replace(/[A-Z]{2,}[a-z]/g, function ($1) {
    // if there are two or more uppercase characters and last character is lowercase, add split before last character
    return "".concat($1.slice(0, $1.length - 2), "-").concat($1.slice($1.length - 2));
  }).replace(/[a-z][A-Z]/g, function ($1) {
    // if the first character is lowercase, the last character is uppercase, add split before last character
    return "".concat($1.slice(0, $1.length - 1), "-").concat($1.slice($1.length - 1));
  }).replace(/[_-]+/g, ' ') // replace '-_' with space
  .toLowerCase().replace(/\s(.)/g, function ($1) {
    return $1.toUpperCase(); // use camelcase for every split string
  }).replace(/\d+[a-z]/g, function ($1) {
    return $1.toUpperCase();
  }).replace(/\s/g, '') // combine
  .replace(/^(.)/, function ($1) {
    return pascalCase ? $1.toUpperCase() : $1.toLowerCase(); // option for first character is uppercase or not
  });
};

exports.camelCase = camelCase;
//# sourceMappingURL=camelCase.js.map
