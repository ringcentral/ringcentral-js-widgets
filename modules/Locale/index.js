'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _I18n = require('../../lib/I18n');

var _I18n2 = _interopRequireDefault(_I18n);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getLocaleReducer = require('./getLocaleReducer');

var _getLocaleReducer2 = _interopRequireDefault(_getLocaleReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */

/**
 *  @function
 *  @description Check if the current environement requires the Intl polyfill.
 *  @return {Promise}
 */
function checkIntl() {
  return new _promise2.default(function (resolve) {
    if (!global.Intl) {
      if (process.browser) {
        require.ensure(['intl', 'intl/locale-data/jsonp/en', 'intl/locale-data/jsonp/de', 'intl/locale-data/jsonp/fr'], function (require) {
          require('intl');
          require('intl/locale-data/jsonp/en');
          require('intl/locale-data/jsonp/de');
          require('intl/locale-data/jsonp/fr');

          resolve();
        }, 'intl');
      } else {
        require('intl');
        resolve();
      }
    } else {
      resolve();
    }
  });
}

var Locale = function (_RcModule) {
  (0, _inherits3.default)(Locale, _RcModule);

  function Locale() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$defaultLocale = _ref.defaultLocale,
        defaultLocale = _ref$defaultLocale === undefined ? _I18n.DEFAULT_LOCALE : _ref$defaultLocale,
        options = (0, _objectWithoutProperties3.default)(_ref, ['defaultLocale']);
    (0, _classCallCheck3.default)(this, Locale);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Locale.__proto__ || (0, _getPrototypeOf2.default)(Locale)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._reducer = (0, _getLocaleReducer2.default)({ defaultLocale: defaultLocale, types: _this.actionTypes });
    return _this;
  }

  (0, _createClass3.default)(Locale, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return checkIntl();

              case 2:
                _context.next = 4;
                return _this2.setLocale(_this2.currentLocale);

              case 4:
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    }

    /**
     * @property {String} currentLocale
     */

  }, {
    key: 'setLocale',


    /**
     *  @function
     *  @description Sets the desired locale as the current locale. This will also
     *    set all I18n instances to the same locale, as well as set formatMessage to use
     *    the same locale.
     *  @param {String} locale
     *  @return {Promise}
     */
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(locale) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _I18n2.default.setLocale(locale);

              case 2:
                _formatMessage2.default.setup({
                  locale: this.currentLocale === _I18n.PSEUDO_LOCALE ? _I18n.DEFAULT_LOCALE : this.currentLocale
                });
                this.store.dispatch({
                  type: this.actionTypes.setLocale,
                  locale: locale
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setLocale(_x2) {
        return _ref3.apply(this, arguments);
      }

      return setLocale;
    }()
  }, {
    key: 'currentLocale',
    get: function get() {
      return this.state.currentLocale;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }]);
  return Locale;
}(_RcModule3.default);

exports.default = Locale;
//# sourceMappingURL=index.js.map
