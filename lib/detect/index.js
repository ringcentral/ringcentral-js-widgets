'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detect;

var _libphonenumberJs = require('libphonenumber-js');

var _ramda = require('ramda');

var _parse2 = require('../parse');

var _parse3 = _interopRequireDefault(_parse2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function find7DigitNumbers(input, countryCode) {
  var output = [];
  var regex = /(?:^|[^\d\w#/])((?:\d[-\s]{0,1}){7,12}(?=[^\d]|$))/g;

  var match = void 0;
  do {
    match = regex.exec(input);
    if (match) {
      var _parse = (0, _parse3.default)({ input: match[0], countryCode: countryCode }),
          isValid = _parse.isValid,
          phoneNumber = _parse.phoneNumber,
          hasPlus = _parse.hasPlus;

      if (isValid && !hasPlus && phoneNumber.length === 7) {
        output.push({
          country: countryCode,
          phone: phoneNumber,
          startsAt: match.index,
          endsAt: match.index + match[0].length
        });
      }
    }
  } while (match);
  return output;
}

function byStartsAt(a, b) {
  return a.startsAt - b.startsAt;
}

function detect(_ref) {
  var input = _ref.input,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === undefined ? '' : _ref$areaCode;

  var output = (0, _libphonenumberJs.findPhoneNumbers)(input, countryCode);
  if ((countryCode === 'US' || countryCode === 'CA') && areaCode.length === 3) {
    var sevenDigits = find7DigitNumbers(input, countryCode);
    if (sevenDigits.length) {
      // keep a reference of the original output to search in
      var ref = output.slice();
      (0, _ramda.forEach)(function (item) {
        if (!(0, _ramda.find)(function (entry) {
          return entry.startsAt <= item.startsAt && entry.endsAt >= item.startsAt;
        }, ref)) {
          output.push(item);
        }
      }, sevenDigits);
    }
  }
  return output.sort(byStartsAt);
}
//# sourceMappingURL=index.js.map
