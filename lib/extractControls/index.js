"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractExtendedControls;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

var _ramda = require("ramda");

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pauseRegex = /,/g;
var controlRegex = /[^0-9*#]/g;
/**
 * @typedef {Object} ExtractedResult
 * @property {String} input - Original input
 * @property {String} phoneNumber - Original input with extended controls removed
 * @property {String[]} extendedControls - Array containing the extended controls
 */

/**
 * @param {String} input
 * @returns {ExtractedResult}
 * @description Extract extended controls from quick dial phone number string.
 *              Currently only support pause (',') characater.
 */

function extractExtendedControls(input) {
  var _split = (input || '').split(pauseRegex),
      _split2 = _toArray(_split),
      phoneNumber = _split2[0],
      tokens = _split2.slice(1);

  return {
    input: input,
    phoneNumber: phoneNumber,
    extendedControls: (0, _ramda.reduce)(function (output, token) {
      output.push(',');
      var cleanControl = token.replace(controlRegex, '');

      if (cleanControl.length) {
        output.push(cleanControl);
      }

      return output;
    }, [], tokens)
  };
}
//# sourceMappingURL=index.js.map
