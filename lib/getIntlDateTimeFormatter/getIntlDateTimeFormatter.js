"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormatter = getFormatter;
exports["default"] = getIntlDateTimeFormatter;
exports.DEFAULT_TIME_OPTIONS = exports.DEFAULT_DATE_OPTIONS = exports.DEFAULT_DATE_TIME_OPTIONS = exports.formatterCache = void 0;

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

require("core-js/modules/es6.regexp.replace");

var _isToday = _interopRequireDefault(require("../isToday"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatterCache = {};
exports.formatterCache = formatterCache;

function getFormatter(locale, options) {
  var key = JSON.stringify([locale, options]);

  if (!formatterCache[key]) {
    formatterCache[key] = new Intl.DateTimeFormat(locale, _objectSpread({}, options));
  }

  return formatterCache[key];
}

var DEFAULT_DATE_TIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};
exports.DEFAULT_DATE_TIME_OPTIONS = DEFAULT_DATE_TIME_OPTIONS;
var DEFAULT_DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};
exports.DEFAULT_DATE_OPTIONS = DEFAULT_DATE_OPTIONS;
var DEFAULT_TIME_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};
exports.DEFAULT_TIME_OPTIONS = DEFAULT_TIME_OPTIONS;

function getIntlDateTimeFormatter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$dateTimeOptions = _ref.dateTimeOptions,
      dateTimeOptions = _ref$dateTimeOptions === void 0 ? DEFAULT_DATE_TIME_OPTIONS : _ref$dateTimeOptions,
      _ref$dateOptions = _ref.dateOptions,
      dateOptions = _ref$dateOptions === void 0 ? DEFAULT_DATE_OPTIONS : _ref$dateOptions,
      _ref$timeOptions = _ref.timeOptions,
      timeOptions = _ref$timeOptions === void 0 ? DEFAULT_TIME_OPTIONS : _ref$timeOptions;

  return function (_ref2) {
    var utcTimestamp = _ref2.utcTimestamp,
        locale = _ref2.locale,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? (0, _isToday["default"])(utcTimestamp) ? 'time' : 'date' : _ref2$type;

    switch (type) {
      case 'date':
        return getFormatter(locale, dateOptions).format(new Date(utcTimestamp)).replace(/\u200E|\u200F/g, '');
      // FIX: https://github.com/tc39/ecma402/issues/28

      case 'time':
        return getFormatter(locale, timeOptions).format(new Date(utcTimestamp));

      default:
        return getFormatter(locale, dateTimeOptions).format(new Date(utcTimestamp));
    }
  };
}
//# sourceMappingURL=getIntlDateTimeFormatter.js.map
