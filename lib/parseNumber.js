"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseNumber = void 0;
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _enums = require("../enums");
var _EvTypeError = require("./EvTypeError");
var parseNumber = function parseNumber(input) {
  var _parse = (0, _phoneNumber.parse)({
      input: input
    }),
    parsedNumber = _parse.parsedNumber,
    isValid = _parse.isValid,
    hasInvalidChars = _parse.hasInvalidChars;
  if (input === '911' || input === '933' || input === '112') {
    throw new _EvTypeError.EvTypeError({
      type: _Call.callErrors.emergencyNumber
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
