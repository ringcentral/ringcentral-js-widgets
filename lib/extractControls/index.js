"use strict";

require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractExtendedControls;
var _ramda = require("ramda");
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
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
