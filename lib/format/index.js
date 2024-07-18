"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.regexp.constructor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = format;
exports.isUSOrCAOrPR = exports.formatTypes = exports.formatSameSiteExtension = void 0;
var _libphonenumberJs = require("libphonenumber-js");
var _parse2 = _interopRequireDefault(require("../parse"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var formatTypes = {
  local: 'local',
  international: 'international',
  e164: 'e164'
};
exports.formatTypes = formatTypes;
/**
 * Given current account is enabled the multiple site, when number is the same with current account
 * then the number needs to be formatted.
 */
var formatSameSiteExtension = function formatSameSiteExtension(_ref) {
  var _ref$currentSiteCode = _ref.currentSiteCode,
    currentSiteCode = _ref$currentSiteCode === void 0 ? '' : _ref$currentSiteCode,
    _ref$extension = _ref.extension,
    extension = _ref$extension === void 0 ? '' : _ref$extension;
  if (currentSiteCode === '' || !extension || extension.indexOf(currentSiteCode) !== 0) {
    return extension;
  }
  var regex = new RegExp("".concat(currentSiteCode, "0*"));
  return extension.replace(regex, '') || '0';
};
exports.formatSameSiteExtension = formatSameSiteExtension;
var ISOCode_US = 'US';
var ISOCode_CA = 'CA';
var ISOCode_PR = 'PR';

// US/CA/PR should be in the same phone area
var isUSOrCAOrPR = function isUSOrCAOrPR(countryCode) {
  return [ISOCode_US, ISOCode_CA, ISOCode_PR].includes(countryCode);
};
exports.isUSOrCAOrPR = isUSOrCAOrPR;
function format(_ref2) {
  var phoneNumber = _ref2.phoneNumber,
    _ref2$countryCode = _ref2.countryCode,
    countryCode = _ref2$countryCode === void 0 ? 'US' : _ref2$countryCode,
    _ref2$areaCode = _ref2.areaCode,
    areaCode = _ref2$areaCode === void 0 ? '' : _ref2$areaCode,
    _ref2$siteCode = _ref2.siteCode,
    siteCode = _ref2$siteCode === void 0 ? '' : _ref2$siteCode,
    _ref2$type = _ref2.type,
    type = _ref2$type === void 0 ? formatTypes.local : _ref2$type,
    _ref2$removeExtension = _ref2.removeExtension,
    removeExtension = _ref2$removeExtension === void 0 ? false : _ref2$removeExtension,
    _ref2$isMultipleSiteE = _ref2.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _ref2$isMultipleSiteE === void 0 ? false : _ref2$isMultipleSiteE,
    _ref2$extensionDelimi = _ref2.extensionDelimiter,
    extensionDelimiter = _ref2$extensionDelimi === void 0 ? ' * ' : _ref2$extensionDelimi,
    _ref2$maxExtensionLen = _ref2.maxExtensionLength,
    maxExtensionLength = _ref2$maxExtensionLen === void 0 ? 6 : _ref2$maxExtensionLen,
    _ref2$isEDPEnabled = _ref2.isEDPEnabled,
    isEDPEnabled = _ref2$isEDPEnabled === void 0 ? false : _ref2$isEDPEnabled;
  var _parse = (0, _parse2["default"])({
      input: phoneNumber,
      countryCode: countryCode,
      maxExtensionLength: maxExtensionLength
    }),
    number = _parse.phoneNumber,
    extension = _parse.extension,
    parsedCountry = _parse.parsedCountry,
    parsedNumber = _parse.parsedNumber,
    isExtension = _parse.isExtension,
    isServiceNumber = _parse.isServiceNumber,
    isValid = _parse.isValid,
    hasPlus = _parse.hasPlus,
    countryCallingCode = _parse.countryCallingCode;
  if (!isValid) {
    return '';
  }
  if (isServiceNumber) {
    return number;
  }
  if (isExtension) {
    if (!isMultipleSiteEnabled) {
      return number;
    }
    return formatSameSiteExtension({
      currentSiteCode: siteCode,
      extension: number
    });
  }
  var finalType;
  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'International';
  } else {
    finalType =
    // parsedCountry is the country of phoneNumber country, countryCode is the country of caller
    isUSOrCAOrPR(countryCode) && isUSOrCAOrPR(parsedCountry) || parsedCountry === countryCode || countryCallingCode === (0, _libphonenumberJs.getCountryCallingCode)(countryCode) ? 'National' : 'International';
  }
  var formattedNumber;
  if (!hasPlus &&
  // for projects don't support EDP, only US/PR/CA will append areaCode for 7-digits number, details in RCINT-26493
  isUSOrCAOrPR(countryCode) && !isEDPEnabled && areaCode && areaCode !== '' && (number === null || number === void 0 ? void 0 : number.length) === 7) {
    formattedNumber = (0, _libphonenumberJs.formatNumber)("".concat(areaCode).concat(number), parsedCountry || countryCode, finalType);
  } else if (parsedNumber) {
    formattedNumber = (0, _libphonenumberJs.formatNumber)(parsedNumber, parsedCountry || countryCode, finalType);
  } else if (!hasPlus) {
    formattedNumber = (0, _libphonenumberJs.formatNumber)(number, countryCode, finalType);
  } else {
    formattedNumber = number;
  }
  return extension && !removeExtension ? "".concat(formattedNumber).concat(extensionDelimiter).concat(extension) : formattedNumber;
}
//# sourceMappingURL=index.js.map
