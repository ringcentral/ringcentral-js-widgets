'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _desc, _value, _class;

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _I18n = require('../../lib/I18n');

var _I18n2 = _interopRequireDefault(_I18n);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getLocaleReducer = require('./getLocaleReducer');

var _getLocaleReducer2 = _interopRequireDefault(_getLocaleReducer);

var _getProxyReducer = require('./getProxyReducer');

var _getProxyReducer2 = _interopRequireDefault(_getProxyReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

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

/**
 * @class
 * @description Locale managing module
 */
var Locale = (_class = function (_RcModule) {
  (0, _inherits3.default)(Locale, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.defaultLocale - default 'en-US'
   */
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
    _this._proxyReducer = (0, _getProxyReducer2.default)({ defaultLocale: defaultLocale, types: _this.actionTypes });
    return _this;
  }

  (0, _createClass3.default)(Locale, [{
    key: 'initialize',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return checkIntl();

              case 2:
                _context.next = 4;
                return this.setLocale(this.currentLocale);

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize() {
        return _ref2.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: 'initializeProxy',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.proxyInit
                });
                _context3.next = 3;
                return checkIntl();

              case 3:
                _context3.next = 5;
                return this._setLocale(this.state.currentLocale);

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.syncProxyLocale,
                  locale: this.state.currentLocale
                });
                this.store.dispatch({
                  type: this.actionTypes.proxyInitSuccess
                });
                this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(_this2.state.currentLocale !== _this2.currentLocale)) {
                            _context2.next = 4;
                            break;
                          }

                          _context2.next = 3;
                          return _this2._setLocale(_this2.state.currentLocale);

                        case 3:
                          _this2.store.dispatch({
                            type: _this2.actionTypes.syncProxyLocale,
                            locale: _this2.state.currentLocale
                          });

                        case 4:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this2);
                })));

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function initializeProxy() {
        return _ref3.apply(this, arguments);
      }

      return initializeProxy;
    }()

    /**
     * @property {String} currentLocale
     */

  }, {
    key: '_setLocale',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(locale) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _I18n2.default.setLocale(locale);

              case 2:
                _formatMessage2.default.setup({
                  locale: this.currentLocale === _I18n.PSEUDO_LOCALE ? _I18n.DEFAULT_LOCALE : this.currentLocale
                });

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _setLocale(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _setLocale;
    }()

    /**
     *  @function
     *  @description Sets the desired locale as the current locale. This will also
     *    set all I18n instances to the same locale, as well as set formatMessage to use
     *    the same locale.
     *  @param {String} locale
     *  @return {Promise}
     */

  }, {
    key: 'setLocale',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(locale) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._setLocale(locale);
                this.store.dispatch({
                  type: this.actionTypes.setLocale,
                  locale: locale
                });

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setLocale(_x3) {
        return _ref6.apply(this, arguments);
      }

      return setLocale;
    }()
  }, {
    key: 'currentLocale',
    get: function get() {
      return this.proxyState && this.proxyState.currentLocale || this.state.currentLocale;
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
  return Locale;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, 'setLocale', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'setLocale'), _class.prototype)), _class);
exports.default = Locale;
//# sourceMappingURL=index.js.map
