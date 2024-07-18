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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      // Too much helpless message. Ignore it for test env.
      if (process.env.NODE_ENV !== 'test') {
        console.warn('timestamp should not be empty');
      }
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
