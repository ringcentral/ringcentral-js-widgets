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
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
