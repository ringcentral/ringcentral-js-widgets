"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.camelize = camelize;
exports.getParentClass = getParentClass;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _error = require("./error");
// @ts-nocheck

function getParentClass(klass) {
  return Object.getPrototypeOf(klass);
}

/* eslint-disable */
var STRING_CAMELIZE_REGEXP_1 = /(\-|\_|\.|\s)+(.)?/g;
var STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;

// Transfrom string to camel case, from Ember String
function camelize(key) {
  return key.replace(STRING_CAMELIZE_REGEXP_1, function (match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(STRING_CAMELIZE_REGEXP_2, function (match, separator, chr) {
    return match.toLowerCase();
  });
}
/* eslint-enable */

function assert(cond, msg) {
  if (!cond) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    if (msg) throw _error.DIError.apply(void 0, [msg].concat(args));else throw (0, _error.DIError)('Assertion Failed');
  }
}
//# sourceMappingURL=utils.js.map
