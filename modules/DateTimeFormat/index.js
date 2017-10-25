'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getIntlDateTimeFormatter = require('../../lib/getIntlDateTimeFormatter');

var _getIntlDateTimeFormatter2 = _interopRequireDefault(_getIntlDateTimeFormatter);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDateTimeFormatReducer = require('./getDateTimeFormatReducer');

var _getDateTimeFormatReducer2 = _interopRequireDefault(_getDateTimeFormatReducer);

var _getProxyReducer = require('./getProxyReducer');

var _getProxyReducer2 = _interopRequireDefault(_getProxyReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class DateTimeFormat
 * @description Simple date and time formatting manager.
 */
var DateTimeFormat = (_dec = (0, _di.Module)({
  deps: ['Locale', { dep: 'DateTimeFormatOptions', optional: true }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(DateTimeFormat, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Locale} params.locale - locale module instance
   */
  function DateTimeFormat(_ref) {
    var locale = _ref.locale,
        options = (0, _objectWithoutProperties3.default)(_ref, ['locale']);
    (0, _classCallCheck3.default)(this, DateTimeFormat);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateTimeFormat.__proto__ || (0, _getPrototypeOf2.default)(DateTimeFormat)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._locale = (0, _ensureExist2.default)(locale, 'locale');

    _this._reducer = (0, _getDateTimeFormatReducer2.default)(_this.actionTypes);
    _this._proxyReducer = (0, _getProxyReducer2.default)(_this.actionTypes);

    _this._formatters = {};
    return _this;
  }

  (0, _createClass3.default)(DateTimeFormat, [{
    key: '_shouldInit',
    value: function _shouldInit() {
      return this.pending && this._locale.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && !this._locale.ready;
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });
        if (!this._defaultFormatter) {
          this._defaultFormatter = (0, _getIntlDateTimeFormatter2.default)();
        }
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this.store.dispatch({
          type: this.actionTypes.reset
        });
        this._formatters = {};
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: 'initializeProxy',
    value: function initializeProxy() {
      var _this3 = this;

      this.store.subscribe(function () {
        if (_this3.proxyPending && _this3._locale.proxyReady) {
          _this3.store.dispatch({
            type: _this3.actionTypes.proxyInit
          });
          if (!_this3._defaultFormatter) {
            _this3._defaultFormatter = (0, _getIntlDateTimeFormatter2.default)();
          }
          _this3.store.dispatch({
            type: _this3.actionTypes.proxyInitSuccess
          });
        }
      });
    }
  }, {
    key: 'addFormatter',
    value: function addFormatter(_ref2) {
      var name = _ref2.name,
          formatter = _ref2.formatter;

      if (!name) {
        throw new Error('`name` property cannot be empty.');
      }
      if (this._formatters[name]) {
        throw new Error('A formatter with the same name: ' + name + ' already exists.');
      }
      if (typeof formatter !== 'function') {
        throw new Error('formatter must be a function.');
      }
      this._formatters[name] = formatter;
    }
  }, {
    key: 'formatDateTime',
    value: function formatDateTime(_ref3) {
      var name = _ref3.name,
          utcTimestamp = _ref3.utcTimestamp,
          _ref3$locale = _ref3.locale,
          locale = _ref3$locale === undefined ? this._locale.currentLocale : _ref3$locale,
          type = _ref3.type;

      if (name && typeof this._formatters[name] === 'function') {
        return this._formatters[name]({
          utcTimestamp: utcTimestamp,
          locale: locale,
          type: type
        });
      }
      return this._defaultFormatter({
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: type
      });
    }
  }, {
    key: 'formatDate',
    value: function formatDate(_ref4) {
      var name = _ref4.name,
          utcTimestamp = _ref4.utcTimestamp,
          locale = _ref4.locale;

      return this.formatDateTime({
        name: name,
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: 'date'
      });
    }
  }, {
    key: 'formatTime',
    value: function formatTime(_ref5) {
      var name = _ref5.name,
          utcTimestamp = _ref5.utcTimestamp,
          locale = _ref5.locale;

      return this.formatDateTime({
        name: name,
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: 'time'
      });
    }
  }, {
    key: 'status',
    get: function get() {
      return this.proxyState && this.proxyState.status || this.state.status;
    }
  }, {
    key: 'proxyStatus',
    get: function get() {
      return this.proxyState.status;
    }
  }]);
  return DateTimeFormat;
}(_RcModule3.default)) || _class);
exports.default = DateTimeFormat;
//# sourceMappingURL=index.js.map
