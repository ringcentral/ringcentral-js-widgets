'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _class, _desc, _value, _class2;

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _redux = require('redux');

var _I18n = require('locale-loader/lib/I18n');

var _I18n2 = _interopRequireDefault(_I18n);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _di = require('../../lib/di');

var _reducers = require('./reducers');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _getProxyStatusReducer = require('../../lib/getProxyStatusReducer');

var _getProxyStatusReducer2 = _interopRequireDefault(_getProxyStatusReducer);

var _detectBrowserLocale = require('../../lib/detectBrowserLocale');

var _detectBrowserLocale2 = _interopRequireDefault(_detectBrowserLocale);

var _Enum = require('../../lib/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _moduleActionTypes = require('../../enums/moduleActionTypes');

var _moduleActionTypes2 = _interopRequireDefault(_moduleActionTypes);

var _proxyActionTypes = require('../../enums/proxyActionTypes');

var _proxyActionTypes2 = _interopRequireDefault(_proxyActionTypes);

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

/**
 * @class
 * @description Locale managing module
 */
var Locale = (_dec = (0, _di.Module)({
  deps: [{ dep: 'LocaleOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
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
        _ref$detectBrowser = _ref.detectBrowser,
        detectBrowser = _ref$detectBrowser === undefined ? true : _ref$detectBrowser,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? false : _ref$polling,
        _ref$pollingInterval = _ref.pollingInterval,
        pollingInterval = _ref$pollingInterval === undefined ? 2000 : _ref$pollingInterval,
        options = (0, _objectWithoutProperties3.default)(_ref, ['defaultLocale', 'detectBrowser', 'polling', 'pollingInterval']);
    (0, _classCallCheck3.default)(this, Locale);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Locale.__proto__ || (0, _getPrototypeOf2.default)(Locale)).call(this, (0, _extends3.default)({}, options)));

    _this._defaultLocale = defaultLocale;
    _this._detectBrowser = detectBrowser;
    _this._polling = polling;
    _this._pollingInterval = pollingInterval;
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
                return this.setLocale(this._detectBrowser ? this.browserLocale : this._defaultLocale);

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                if (this._polling) {
                  this._syncBrowserLocale();
                }

              case 4:
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
    key: '_syncBrowserLocale',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.debugMode && this.browserLocale !== this.currentLocale)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.setLocale(this.browserLocale);

              case 3:
                setTimeout(function () {
                  return _this2._syncBrowserLocale();
                }, this._pollingInterval);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _syncBrowserLocale() {
        return _ref3.apply(this, arguments);
      }

      return _syncBrowserLocale;
    }()
  }, {
    key: 'initializeProxy',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.proxyInit
                });
                _context4.next = 3;
                return this._setLocale(this.currentLocale);

              case 3:
                this.store.dispatch({
                  type: this.actionTypes.proxyInitSuccess
                });
                this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!(_this3.state.currentLocale !== _this3.proxyState.proxyLocale)) {
                            _context3.next = 4;
                            break;
                          }

                          _context3.next = 3;
                          return _this3._setLocale(_this3.state.currentLocale);

                        case 3:
                          _this3.store.dispatch({
                            type: _this3.actionTypes.syncProxyLocale,
                            locale: _this3.state.currentLocale
                          });

                        case 4:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this3);
                })));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function initializeProxy() {
        return _ref4.apply(this, arguments);
      }

      return initializeProxy;
    }()

    /**
     * @property {String} currentLocale
     */

  }, {
    key: 'toggleDebugMode',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.toggleDebugMode,
                  debugMode: this.debugMode
                });
                if (this.debugMode) {
                  this.setLocale(_I18n.PSEUDO_LOCALE);
                }

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function toggleDebugMode() {
        return _ref6.apply(this, arguments);
      }

      return toggleDebugMode;
    }()
  }, {
    key: '_setLocale',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(locale) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _I18n2.default.setLocale(locale);

              case 2:
                _formatMessage2.default.setup({
                  locale: this.currentLocale === _I18n.PSEUDO_LOCALE ? _I18n.DEFAULT_LOCALE : this.currentLocale
                });

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _setLocale(_x2) {
        return _ref7.apply(this, arguments);
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
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(locale) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.setLocale,
                  locale: locale
                });
                _context7.prev = 1;
                _context7.next = 4;
                return this._setLocale(locale);

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.setLocaleSuccess,
                  locale: locale
                });
                _context7.next = 10;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7['catch'](1);

                this.store.dispatch({
                  type: this.actionTypes.setLocaleError,
                  error: _context7.t0
                });

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 7]]);
      }));

      function setLocale(_x3) {
        return _ref8.apply(this, arguments);
      }

      return setLocale;
    }()
  }, {
    key: '_actionTypes',
    get: function get() {
      return new _Enum2.default([].concat((0, _toConsumableArray3.default)((0, _keys2.default)(_moduleActionTypes2.default)), (0, _toConsumableArray3.default)((0, _keys2.default)(_proxyActionTypes2.default)), ['setLocale', 'setLocaleSuccess', 'setLocaleError', 'syncProxyLocale', 'toggleDebugMode']), 'locale');
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _redux.combineReducers)({
        status: (0, _getModuleStatusReducer2.default)(this.actionTypes),
        currentLocale: (0, _reducers.getCurrentLocaleReducer)(this.actionTypes),
        debugMode: (0, _reducers.getToggleDebugMode)(this.actionTypes)
      });
    }
  }, {
    key: 'proxyReducer',
    get: function get() {
      return (0, _redux.combineReducers)({
        status: (0, _getProxyStatusReducer2.default)(this.actionTypes),
        proxyLocale: (0, _reducers.getProxyLocaleReducer)(this.actionTypes)
      });
    }
  }, {
    key: 'currentLocale',
    get: function get() {
      return this.proxyState && this.proxyState.proxyLocale || this.state.currentLocale || this._defaultLocale;
    }
  }, {
    key: 'browserLocale',
    get: function get() {
      return (0, _detectBrowserLocale2.default)(this._defaultLocale);
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
  }, {
    key: 'debugMode',
    get: function get() {
      return this.state.debugMode;
    }
  }]);
  return Locale;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'toggleDebugMode', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'toggleDebugMode'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setLocale', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setLocale'), _class2.prototype)), _class2)) || _class);
exports.default = Locale;
//# sourceMappingURL=index.js.map
