'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

exports.default = extractExtendedControls;

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _split2 = (0, _toArray3.default)(_split),
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
