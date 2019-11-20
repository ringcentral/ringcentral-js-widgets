"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateJoinBeforeHost = updateJoinBeforeHost;
exports.getConferenceInfo = getConferenceInfo;
exports.formatDialInNumbers = formatDialInNumbers;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

require("regenerator-runtime/runtime");

var _formatNumber = _interopRequireDefault(require("../../lib/formatNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateJoinBeforeHost(client, allowJoinBeforeHost) {
  var data;
  return regeneratorRuntime.async(function updateJoinBeforeHost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.account().extension().conferencing().put({
            allowJoinBeforeHost: allowJoinBeforeHost
          }));

        case 2:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getConferenceInfo(client) {
  var data;
  return regeneratorRuntime.async(function getConferenceInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.account().extension().conferencing().get());

        case 2:
          data = _context2.sent;
          return _context2.abrupt("return", data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function formatDialInNumbers(_ref) {
  var currentLocale = _ref.currentLocale,
      phoneNumbers = _ref.phoneNumbers,
      countryCode = _ref.countryCode,
      areaCode = _ref.areaCode,
      countryNames = _ref.countryNames;
  var countryCounter = phoneNumbers.reduce(function (acc, item) {
    if (!acc[item.country.isoCode]) {
      acc[item.country.isoCode] = 1;
    } else {
      acc[item.country.isoCode] += 1;
    }

    return acc;
  }, {});
  var dialInNumbers = phoneNumbers.map(function (item) {
    var countryName = countryNames.getString(item.country.isoCode, currentLocale); // only show the provinces of canada

    return {
      region: countryCounter[item.country.isoCode] > 1 ? "".concat(countryName, ", ").concat(item.location) : countryName,
      phoneNumber: item.phoneNumber
    };
  });
  return dialInNumbers.map(function (e) {
    return _objectSpread({}, e, {
      formattedPhoneNumber: (0, _formatNumber["default"])({
        phoneNumber: e.phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode,
        international: true
      })
    });
  });
}
//# sourceMappingURL=conferenceHelper.js.map
