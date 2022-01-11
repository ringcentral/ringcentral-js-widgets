"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseNumber = void 0;

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _enums = require("../enums");

var _EvTypeError = require("./EvTypeError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parseNumber = function parseNumber(input) {
  var _parse = (0, _phoneNumber.parse)({
    input: input
  }),
      parsedNumber = _parse.parsedNumber,
      isValid = _parse.isValid,
      hasInvalidChars = _parse.hasInvalidChars;

  if (input === '911' || input === '933' || input === '112') {
    throw new _EvTypeError.EvTypeError({
      type: _callErrors["default"].emergencyNumber
    });
  }

  if (!isValid || hasInvalidChars || !parsedNumber) {
    throw new _EvTypeError.EvTypeError({
      type: _enums.messageTypes.INVALID_NUMBER
    });
  }

  return parsedNumber;
};

exports.parseNumber = parseNumber;
//# sourceMappingURL=parseNumber.js.map
