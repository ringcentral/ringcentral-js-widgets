"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TIME_OPTIONS = exports.DEFAULT_DATE_TIME_OPTIONS = exports.DEFAULT_DATE_OPTIONS = void 0;
exports["default"] = getIntlDateTimeFormatter;
exports.formatterCache = void 0;
exports.getFormatter = getFormatter;
exports.isToday = isToday;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function isToday(utcString) {
  var now = new Date();
  var t = new Date(utcString);
  return now.getFullYear() === t.getFullYear() && now.getMonth() === t.getMonth() && now.getDate() === t.getDate();
}
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
      type = _ref2$type === void 0 ? isToday(utcTimestamp) ? 'time' : 'date' : _ref2$type;
    if (!utcTimestamp) {
      console.warn('timestamp should not be empty');
      return null;
    }
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
