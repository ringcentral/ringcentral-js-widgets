"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _redux = require("redux");

var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _di = require("../../lib/di");

var _reducers = require("./reducers");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _getProxyStatusReducer = _interopRequireDefault(require("../../lib/getProxyStatusReducer"));

var _detectBrowserLocale = _interopRequireDefault(require("../../lib/detectBrowserLocale"));

var _moduleActionTypes = require("../../enums/moduleActionTypes");

var _proxyActionTypes = require("../../enums/proxyActionTypes");

var _dec, _class, _class2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Locale = (
/**
 * @class
 * @description Locale managing module
 */
_dec = (0, _di.Module)({
  deps: ['Brand', {
    dep: 'LocaleOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(Locale, _RcModule);

  var _super = _createSuper(Locale);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.defaultLocale - default 'en-US'
   */
  function Locale() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var brand = _ref.brand,
        _ref$localeOptions = _ref.localeOptions,
        localeOptions = _ref$localeOptions === void 0 ? {} : _ref$localeOptions,
        options = _objectWithoutProperties(_ref, ["brand", "localeOptions"]);

    _classCallCheck(this, Locale);

    _this = _super.call(this, _objectSpread({}, options));
    _this._defaultLocale = void 0;
    _this._detectBrowser = void 0;
    _this._polling = void 0;
    _this._pollingInterval = void 0;
    _this._transport = void 0;
    var _localeOptions$defaul = localeOptions.defaultLocale,
        defaultLocale = _localeOptions$defaul === void 0 ? _i18n.DEFAULT_LOCALE : _localeOptions$defaul,
        _localeOptions$detect = localeOptions.detectBrowser,
        detectBrowser = _localeOptions$detect === void 0 ? true : _localeOptions$detect,
        _localeOptions$pollin = localeOptions.polling,
        polling = _localeOptions$pollin === void 0 ? false : _localeOptions$pollin,
        _localeOptions$pollin2 = localeOptions.pollingInterval,
        pollingInterval = _localeOptions$pollin2 === void 0 ? 2000 : _localeOptions$pollin2;
    _this._brand = brand;
    _this._defaultLocale = defaultLocale;
    _this._detectBrowser = detectBrowser;
    _this._polling = polling;
    _this._pollingInterval = pollingInterval;

    _i18n["default"].setDefaultLocale(_this._defaultLocale);

    return _this;
  }

  _createClass(Locale, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
    key: "normalizeLocale",
    value: function normalizeLocale(inputLocale) {
      var locale = (0, _formatLocale["default"])(inputLocale);

      var target = this._supportedLocales.map(function (item) {
        return (0, _formatLocale["default"])(item);
      }).find(function (item) {
        return item === locale || item.split('-')[0] === locale;
      });

      return target !== null && target !== void 0 ? target : this._defaultLocale;
    }
  }, {
    key: "_syncBrowserLocale",
    value: function () {
      var _syncBrowserLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
      var _initializeProxy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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
                this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
      var _toggleDebugMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
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
      var _setLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locale) {
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
      var _setLocale3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(locale) {
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
    key: "_supportedLocales",
    get: function get() {
      var _this$_brand$brandCon, _this$_brand$brandCon2;

      return (_this$_brand$brandCon = (_this$_brand$brandCon2 = this._brand.brandConfig) === null || _this$_brand$brandCon2 === void 0 ? void 0 : _this$_brand$brandCon2.supportedLocales) !== null && _this$_brand$brandCon !== void 0 ? _this$_brand$brandCon : [this._defaultLocale];
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _ObjectMap.ObjectMap.prefixKeys([].concat(_toConsumableArray(_ObjectMap.ObjectMap.keys(_moduleActionTypes.moduleActionTypes)), _toConsumableArray(_ObjectMap.ObjectMap.keys(_proxyActionTypes.proxyActionTypes)), ['setLocale', 'setLocaleSuccess', 'setLocaleError', 'syncProxyLocale', 'toggleDebugMode']), 'locale');
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
//# sourceMappingURL=Locale.js.map
