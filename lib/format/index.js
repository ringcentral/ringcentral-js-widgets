"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;
exports.formatTypes = void 0;

var _libphonenumberJs = require("libphonenumber-js");

var _parse2 = _interopRequireDefault(require("../parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatTypes = {
  local: 'local',
  international: 'international',
  e164: 'e164'
};
exports.formatTypes = formatTypes;

function format(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === void 0 ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === void 0 ? '' : _ref$areaCode,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? formatTypes.local : _ref$type,
      _ref$removeExtension = _ref.removeExtension,
      removeExtension = _ref$removeExtension === void 0 ? false : _ref$removeExtension,
      _ref$extensionDelimet = _ref.extensionDelimeter,
      extensionDelimeter = _ref$extensionDelimet === void 0 ? ' * ' : _ref$extensionDelimet;

  var _parse = (0, _parse2.default)({
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

  if (isServiceNumber || isExtension) {
    return number;
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
