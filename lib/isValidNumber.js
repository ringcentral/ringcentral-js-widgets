"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidNumber = exports["default"] = isValidNumber;

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _isBlank = _interopRequireDefault(require("./isBlank"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isValidNumber(_ref) {
  var input = _ref.input,
      countryCode = _ref.countryCode;

  if ((0, _isBlank["default"])(input)) {
    return false;
  }

  var _parse = (0, _phoneNumber.parse)({
    input: input,
    countryCode: countryCode
  }),
      hasInvalidChars = _parse.hasInvalidChars,
      isValid = _parse.isValid;

  if (hasInvalidChars || !isValid) {
    return false;
  }

  return true;
}
//# sourceMappingURL=isValidNumber.js.map
