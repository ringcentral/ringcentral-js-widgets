'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TIME_OPTIONS = exports.DEFAULT_DATE_OPTIONS = exports.DEFAULT_DATE_TIME_OPTIONS = exports.formatterCache = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getFormatter = getFormatter;
exports.default = getIntlDateTimeFormatter;

var _isToday = require('../isToday');

var _isToday2 = _interopRequireDefault(_isToday);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatterCache = exports.formatterCache = {};

function getFormatter(locale, options) {
  var key = (0, _stringify2.default)([locale, options]);
  if (!formatterCache[key]) {
    formatterCache[key] = new Intl.DateTimeFormat(locale, (0, _extends3.default)({}, options));
  }
  return formatterCache[key];
}

var DEFAULT_DATE_TIME_OPTIONS = exports.DEFAULT_DATE_TIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};
var DEFAULT_DATE_OPTIONS = exports.DEFAULT_DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};
var DEFAULT_TIME_OPTIONS = exports.DEFAULT_TIME_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};

function getIntlDateTimeFormatter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$dateTimeOptions = _ref.dateTimeOptions,
      dateTimeOptions = _ref$dateTimeOptions === undefined ? DEFAULT_DATE_TIME_OPTIONS : _ref$dateTimeOptions,
      _ref$dateOptions = _ref.dateOptions,
      dateOptions = _ref$dateOptions === undefined ? DEFAULT_DATE_OPTIONS : _ref$dateOptions,
      _ref$timeOptions = _ref.timeOptions,
      timeOptions = _ref$timeOptions === undefined ? DEFAULT_TIME_OPTIONS : _ref$timeOptions;

  return function (_ref2) {
    var utcTimestamp = _ref2.utcTimestamp,
        locale = _ref2.locale,
        _ref2$type = _ref2.type,
        type = _ref2$type === undefined ? (0, _isToday2.default)(utcTimestamp) ? 'time' : 'date' : _ref2$type;

    switch (type) {
      case 'date':
        return getFormatter(locale, dateOptions).format(new Date(utcTimestamp));
      case 'time':
        return getFormatter(locale, timeOptions).format(new Date(utcTimestamp));
      default:
        return getFormatter(locale, dateTimeOptions).format(new Date(utcTimestamp));
    }
  };
}
//# sourceMappingURL=index.js.map
