"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateNumbers = validateNumbers;
var _hasNoAreaCode = require("./hasNoAreaCode");
var _isValidNumber = require("./isValidNumber");
var _normalizeNumber = require("./normalizeNumber");
function numberParser(_ref) {
  var phoneNumbers = _ref.phoneNumbers,
    countryCode = _ref.countryCode,
    areaCode = _ref.areaCode;
  var normalizedNumbers = phoneNumbers.map(function (phoneNumber) {
    return (0, _normalizeNumber.normalizeNumber)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      areaCode: areaCode
    });
  });
  return normalizedNumbers;
}
function numberFormat(_ref2) {
  var phoneNumbers = _ref2.phoneNumbers,
    countryCode = _ref2.countryCode,
    areaCode = _ref2.areaCode,
    allowRegionSettings = _ref2.allowRegionSettings;
  var errors = [];
  phoneNumbers.map(function (phoneNumber) {
    if (!(0, _isValidNumber.isValidNumber)({
      input: phoneNumber,
      countryCode: countryCode
    })) {
      errors.push({
        phoneNumber: phoneNumber,
        type: 'noToNumber'
      });
      return null;
    }
    if (allowRegionSettings && (0, _hasNoAreaCode.hasNoAreaCode)({
      input: phoneNumber,
      areaCode: areaCode,
      countryCode: countryCode
    })) {
      errors.push({
        phoneNumber: phoneNumber,
        type: 'noAreaCode'
      });
    }
    return null;
  });
  return {
    result: errors.length === 0,
    errors: errors
  };
}
function validateNumbers(_ref3) {
  var phoneNumbers = _ref3.phoneNumbers,
    countryCode = _ref3.countryCode,
    areaCode = _ref3.areaCode,
    allowRegionSettings = _ref3.allowRegionSettings;
  var formattedResult = numberFormat({
    phoneNumbers: phoneNumbers,
    countryCode: countryCode,
    areaCode: areaCode,
    allowRegionSettings: allowRegionSettings
  });
  if (!formattedResult.result) {
    var error = formattedResult.errors[0];
    throw error;
  }
  var parsedResult = numberParser({
    phoneNumbers: phoneNumbers,
    countryCode: countryCode,
    areaCode: areaCode
  });
  return parsedResult;
}
//# sourceMappingURL=validateNumbers.js.map
