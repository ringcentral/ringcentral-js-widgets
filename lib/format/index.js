"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = format;
exports.formatSameSiteExtension = exports.formatTypes = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.array.index-of");

var _libphonenumberJs = require("libphonenumber-js");

var _parse2 = _interopRequireDefault(require("../parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formatTypes = {
  local: 'local',
  international: 'international',
  e164: 'e164'
};
exports.formatTypes = formatTypes;

/**
 * Given current account is enabled the multiple site, when number is the same with current account
 * then the number needs to be formatted.
 * @param {String} params.currentSiteCode current user's site code
 * @param {String} params.extension extension number need to be format
 * @returns {String}
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
      _ref2$extensionDelime = _ref2.extensionDelimeter,
      extensionDelimeter = _ref2$extensionDelime === void 0 ? ' * ' : _ref2$extensionDelime;

  var _parse = (0, _parse2["default"])({
    input: phoneNumber,
    countryCode: countryCode
  }),
      number = _parse.phoneNumber,
      extension = _parse.extension,
      parsedCountry = _parse.parsedCountry,
      parsedNumber = _parse.parsedNumber,
      isExtension = _parse.isExtension,
      isServiceNumber = _parse.isServiceNumber,
      isValid = _parse.isValid,
      hasPlus = _parse.hasPlus;

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

  var isUSCA = countryCode === 'CA' || countryCode === 'US';
  var finalType;

  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'International';
  } else {
    finalType = // assume local
    !parsedCountry || // ignore US/CA difference
    isUSCA && (parsedCountry === 'US' || parsedCountry === 'CA') || parsedCountry === countryCode ? 'National' : 'International';
  }

  var formattedNumber;

  if (!hasPlus && isUSCA && areaCode && areaCode !== '' && number.length === 7) {
    formattedNumber = (0, _libphonenumberJs.formatNumber)("".concat(areaCode).concat(number), parsedCountry || countryCode, finalType);
  } else if (parsedNumber) {
    formattedNumber = (0, _libphonenumberJs.formatNumber)(parsedNumber, parsedCountry || countryCode, finalType);
  } else if (!hasPlus) {
    formattedNumber = (0, _libphonenumberJs.formatNumber)(number, countryCode, finalType);
  } else {
    formattedNumber = number;
  }

  return extension && !removeExtension ? "".concat(formattedNumber).concat(extensionDelimeter).concat(extension) : formattedNumber;
}
//# sourceMappingURL=index.js.map
