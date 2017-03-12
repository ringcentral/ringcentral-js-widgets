'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _I18n = require('../../lib/I18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intlOptions = {
  time: {
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    hour12: false
  },
  date: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  },
  dateTime: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    hour12: false
  }
};

var BrowserDateTimeIntlProvider = function () {
  function BrowserDateTimeIntlProvider(_ref) {
    var locale = _ref.locale;
    (0, _classCallCheck3.default)(this, BrowserDateTimeIntlProvider);

    this._locale = locale;
    this._formatters = {};
  }

  (0, _createClass3.default)(BrowserDateTimeIntlProvider, [{
    key: 'getSettings',
    value: function getSettings() {
      var currentLocale = this._locale.currentLocale;
      return {
        currentLocale: currentLocale
      };
    }
  }, {
    key: 'formatDateTime',
    value: function formatDateTime(_ref2) {
      var settings = _ref2.settings,
          utcString = _ref2.utcString,
          type = _ref2.type;

      var date = new Date(utcString);
      var locale = settings && settings.currentLocale !== _I18n.PSEUDO_LOCALE && settings.currentLocale || _I18n.DEFAULT_LOCALE;

      switch (type) {
        case 'long':
          {
            return this._getFormatter(locale, intlOptions.dateTime).format(date);
          }

        case 'date':
          {
            return this._getFormatter(locale, intlOptions.date).format(date);
          }

        case 'time':
          {
            return this._getFormatter(locale, intlOptions.time).format(date);
          }

        default:
          {
            var now = new Date();
            var isToday = now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate();
            return isToday ? this._getFormatter(locale, intlOptions.time).format(date) : this._getFormatter(locale, intlOptions.date).format(date);
          }

      }
    }
  }, {
    key: '_getFormatter',
    value: function _getFormatter(locale, options) {
      var key = (0, _stringify2.default)([locale, options]);
      var formatter = this._formatters[key];
      if (!formatter) {
        formatter = this._formatters[key] = new Intl.DateTimeFormat(locale, options);
      }
      return formatter;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this._locale.ready;
    }
  }]);
  return BrowserDateTimeIntlProvider;
}();

exports.default = BrowserDateTimeIntlProvider;
//# sourceMappingURL=browserDateTimeIntlProvider.js.map
