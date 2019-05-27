"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _redux = require("redux");

var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _di = require("../../lib/di");

var _reducers = require("./reducers");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _getProxyStatusReducer = _interopRequireDefault(require("../../lib/getProxyStatusReducer"));

var _detectBrowserLocale = _interopRequireDefault(require("../../lib/detectBrowserLocale"));

var _Enum = _interopRequireDefault(require("../../lib/Enum"));

var _moduleActionTypes = require("../../enums/moduleActionTypes");

var _proxyActionTypes = _interopRequireDefault(require("../../enums/proxyActionTypes"));

var _dec, _class, _class2;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Locale = (
/**
 * @class
 * @description Locale managing module
 */
_dec = (0, _di.Module)({
  deps: [{
    dep: 'LocaleOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Locale, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.defaultLocale - default 'en-US'
   */
  function Locale() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$defaultLocale = _ref.defaultLocale,
        defaultLocale = _ref$defaultLocale === void 0 ? _i18n.DEFAULT_LOCALE : _ref$defaultLocale,
        _ref$detectBrowser = _ref.detectBrowser,
        detectBrowser = _ref$detectBrowser === void 0 ? true : _ref$detectBrowser,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? false : _ref$polling,
        _ref$pollingInterval = _ref.pollingInterval,
        pollingInterval = _ref$pollingInterval === void 0 ? 2000 : _ref$pollingInterval,
        options = _objectWithoutProperties(_ref, ["defaultLocale", "detectBrowser", "polling", "pollingInterval"]);

    _classCallCheck(this, Locale);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Locale).call(this, _objectSpread({}, options)));
    _this._defaultLocale = defaultLocale;
    _this._detectBrowser = detectBrowser;
    _this._polling = polling;
    _this._pollingInterval = pollingInterval;
    return _this;
  }

  _createClass(Locale, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize() {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "_syncBrowserLocale",
    value: function () {
      var _syncBrowserLocale2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _syncBrowserLocale() {
        return _syncBrowserLocale2.apply(this, arguments);
      }

      return _syncBrowserLocale;
    }()
  }, {
    key: "initializeProxy",
    value: function () {
      var _initializeProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
                this.store.subscribe(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function initializeProxy() {
        return _initializeProxy.apply(this, arguments);
      }

      return initializeProxy;
    }()
    /**
     * @property {String} currentLocale
     */

  }, {
    key: "toggleDebugMode",
    value: function () {
      var _toggleDebugMode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.toggleDebugMode,
                  debugMode: this.debugMode
                });

                if (this.debugMode) {
                  this.setLocale(_i18n.PSEUDO_LOCALE);
                }

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function toggleDebugMode() {
        return _toggleDebugMode.apply(this, arguments);
      }

      return toggleDebugMode;
    }()
  }, {
    key: "_setLocale",
    value: function () {
      var _setLocale2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(locale) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _i18n["default"].setLocale(locale);

              case 2:
                _formatMessage["default"].setup({
                  locale: this.currentLocale === _i18n.PSEUDO_LOCALE ? _i18n.DEFAULT_LOCALE : this.currentLocale
                });

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _setLocale(_x) {
        return _setLocale2.apply(this, arguments);
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
    key: "setLocale",
    value: function () {
      var _setLocale3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(locale) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
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
                _context7.t0 = _context7["catch"](1);
                this.store.dispatch({
                  type: this.actionTypes.setLocaleError,
                  error: _context7.t0
                });

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 7]]);
      }));

      function setLocale(_x2) {
        return _setLocale3.apply(this, arguments);
      }

      return setLocale;
    }()
  }, {
    key: "_actionTypes",
    get: function get() {
      return new _Enum["default"]([].concat(_toConsumableArray(Object.keys(_moduleActionTypes.moduleActionTypes)), _toConsumableArray(Object.keys(_proxyActionTypes["default"])), ['setLocale', 'setLocaleSuccess', 'setLocaleError', 'syncProxyLocale', 'toggleDebugMode']), 'locale');
    }
  }, {
    key: "reducer",
    get: function get() {
      return (0, _redux.combineReducers)({
        status: (0, _getModuleStatusReducer["default"])(this.actionTypes),
        currentLocale: (0, _reducers.getCurrentLocaleReducer)(this.actionTypes),
        debugMode: (0, _reducers.getToggleDebugMode)(this.actionTypes)
      });
    }
  }, {
    key: "proxyReducer",
    get: function get() {
      return (0, _redux.combineReducers)({
        status: (0, _getProxyStatusReducer["default"])(this.actionTypes),
        proxyLocale: (0, _reducers.getProxyLocaleReducer)(this.actionTypes)
      });
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._transport && this.proxyState && (this.proxyState.proxyLocale || this._defaultLocale) || this.state.currentLocale || this._defaultLocale;
    }
  }, {
    key: "browserLocale",
    get: function get() {
      return (0, _detectBrowserLocale["default"])(this._defaultLocale);
    }
  }, {
    key: "status",
    get: function get() {
      return this.proxyState && this.proxyState.status || this.state.status;
    }
  }, {
    key: "proxyStatus",
    get: function get() {
      return this.proxyState.status;
    }
  }, {
    key: "debugMode",
    get: function get() {
      return this.state.debugMode;
    }
  }]);

  return Locale;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "toggleDebugMode", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLocale", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setLocale"), _class2.prototype)), _class2)) || _class);
exports["default"] = Locale;
//# sourceMappingURL=index.js.map
