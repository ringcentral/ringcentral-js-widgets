'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTypes = undefined;
exports.default = format;

var _libphonenumberJs = require('libphonenumber-js');

var _parse2 = require('../parse');

var _parse3 = _interopRequireDefault(_parse2);

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
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === undefined ? '' : _ref$areaCode,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? formatTypes.local : _ref$type,
      _ref$removeExtension = _ref.removeExtension,
      removeExtension = _ref$removeExtension === undefined ? false : _ref$removeExtension,
      _ref$extensionDelimet = _ref.extensionDelimeter,
      extensionDelimeter = _ref$extensionDelimet === undefined ? ' * ' : _ref$extensionDelimet;

  var _parse = (0, _parse3.default)({ input: phoneNumber, countryCode: countryCode }),
      number = _parse.phoneNumber,
      extension = _parse.extension,
      country = _parse.country,
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
  var withAreaCode = !hasPlus && isUSCA && countryCode && countryCode !== '' ? '' + areaCode + number : number;

  var finalType = void 0;
  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'International';
  } else {
    finalType =
    // assume local
    !country ||
    // ignore US/CA difference
    isUSCA && (country === 'US' || country === 'CA') || country === countryCode ? 'National' : 'International';
  }

  var formattedNumber = (0, _libphonenumberJs.formatNumber)(withAreaCode, country || countryCode, finalType);
  return extension && !removeExtension ? '' + formattedNumber + extensionDelimeter + extension : formattedNumber;
}
//# sourceMappingURL=index.js.map
