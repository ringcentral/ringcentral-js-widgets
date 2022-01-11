"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDialInNumbers = formatDialInNumbers;
exports.getConferenceInfo = getConferenceInfo;
exports.updateJoinBeforeHost = updateJoinBeforeHost;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

var _formatNumber = _interopRequireDefault(require("../../lib/formatNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function updateJoinBeforeHost(_x, _x2) {
  return _updateJoinBeforeHost.apply(this, arguments);
}

function _updateJoinBeforeHost() {
  _updateJoinBeforeHost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client, allowJoinBeforeHost) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.account().extension().conferencing().put({
              allowJoinBeforeHost: allowJoinBeforeHost
            });

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateJoinBeforeHost.apply(this, arguments);
}

function getConferenceInfo(_x3) {
  return _getConferenceInfo.apply(this, arguments);
}

function _getConferenceInfo() {
  _getConferenceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(client) {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.account().extension().conferencing().get();

          case 2:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getConferenceInfo.apply(this, arguments);
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
    return _objectSpread(_objectSpread({}, e), {}, {
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
