"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Locale = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));
var _i18nDayjs = require("@ringcentral-integration/i18n-dayjs");
var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
var _detectBrowserLocale = _interopRequireDefault(require("../../lib/detectBrowserLocale"));
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var Locale = (_dec = (0, _di.Module)({
  name: 'Locale',
  deps: [{
    dep: 'BrandConfig',
    optional: true
  }, {
    dep: 'LocaleOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var defaultLocale = _ref.defaultLocale;
  return [defaultLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Locale, _RcModuleV);
  var _super = _createSuper(Locale);
  function Locale(deps) {
    var _this;
    _classCallCheck(this, Locale);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "proxyLocale", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "debugMode", _descriptor3, _assertThisInitialized(_this));
    _i18n["default"].setDefaultLocale(_this.defaultLocale);
    return _this;
  }
  _createClass(Locale, [{
    key: "_setProxyLocaleSuccess",
    value: function _setProxyLocaleSuccess(locale) {
      this.proxyLocale = locale;
    }
  }, {
    key: "setProxyLocaleSuccess",
    value: function () {
      var _setProxyLocaleSuccess2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(locale) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setProxyLocaleSuccess(locale);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setProxyLocaleSuccess(_x) {
        return _setProxyLocaleSuccess2.apply(this, arguments);
      }
      return setProxyLocaleSuccess;
    }()
  }, {
    key: "_toggleDebugMode",
    value: function _toggleDebugMode() {
      this.debugMode = !this.debugMode;
      // TODO: refactor without side effect.
      if (this.debugMode) {
        this.setLocale(_i18n.PSEUDO_LOCALE);
      }
    }
  }, {
    key: "_setLocaleSuccess",
    value: function _setLocaleSuccess(locale) {
      this.locale = locale;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      if (this._polling) {
        this._syncBrowserLocale();
      }
    }
  }, {
    key: "initializeProxy",
    value: function () {
      var _initializeProxy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;
        var setLocalePromise;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._setLocale(this.currentLocale);
              case 2:
                this.setProxyLocaleSuccess(this.currentLocale);
                this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(_this2.locale !== _this2.proxyLocale && !setLocalePromise)) {
                            _context2.next = 6;
                            break;
                          }
                          setLocalePromise = _this2._setLocale(_this2.locale);
                          _context2.next = 4;
                          return setLocalePromise;
                        case 4:
                          _this2.setProxyLocaleSuccess(_this2.locale);
                          setLocalePromise = null;
                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function initializeProxy() {
        return _initializeProxy.apply(this, arguments);
      }
      return initializeProxy;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.setLocale(this._detectBrowser ? this.browserLocale : this.defaultLocale);
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "_syncBrowserLocale",
    value: function () {
      var _syncBrowserLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this3 = this;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.debugMode && this.browserLocale !== this.currentLocale)) {
                  _context5.next = 3;
                  break;
                }
                _context5.next = 3;
                return this.setLocale(this.browserLocale);
              case 3:
                setTimeout(function () {
                  return _this3._syncBrowserLocale();
                }, this._pollingInterval);
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _syncBrowserLocale() {
        return _syncBrowserLocale2.apply(this, arguments);
      }
      return _syncBrowserLocale;
    }()
  }, {
    key: "_setLocale",
    value: function () {
      var _setLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locale) {
        var toLocale;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                toLocale = locale || this.defaultLocale;
                _context6.next = 3;
                return _i18n["default"].setLocale(toLocale);
              case 3:
                (0, _i18nDayjs.setDayjsLocale)(toLocale);
              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _setLocale(_x2) {
        return _setLocale2.apply(this, arguments);
      }
      return _setLocale;
    }()
  }, {
    key: "normalizeLocale",
    value: function normalizeLocale(inputLocale) {
      var locale = (0, _formatLocale["default"])(inputLocale);
      var target = this.supportedLocales.map(function (item) {
        return (0, _formatLocale["default"])(item);
      }).find(function (item) {
        return item === locale || item.split('-')[0] === locale;
      });
      return target !== null && target !== void 0 ? target : this.defaultLocale;
    }
  }, {
    key: "toggleDebugMode",
    value: function () {
      var _toggleDebugMode2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._toggleDebugMode();
              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function toggleDebugMode() {
        return _toggleDebugMode2.apply(this, arguments);
      }
      return toggleDebugMode;
    }()
    /**
     * Sets the desired locale as the current locale.
     */
  }, {
    key: "setLocale",
    value: function () {
      var _setLocale3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(locale) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this._setLocale(locale);
              case 3:
                this._setLocaleSuccess(locale);
                _context8.next = 9;
                break;
              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](0);
                console.log(_context8.t0);
              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 6]]);
      }));
      function setLocale(_x3) {
        return _setLocale3.apply(this, arguments);
      }
      return setLocale;
    }()
  }, {
    key: "defaultLocale",
    get: function get() {
      var _ref3, _this$_deps$localeOpt, _this$_deps$localeOpt2, _this$_deps$brandConf;
      return (_ref3 = (_this$_deps$localeOpt = (_this$_deps$localeOpt2 = this._deps.localeOptions) === null || _this$_deps$localeOpt2 === void 0 ? void 0 : _this$_deps$localeOpt2.defaultLocale) !== null && _this$_deps$localeOpt !== void 0 ? _this$_deps$localeOpt : (_this$_deps$brandConf = this._deps.brandConfig) === null || _this$_deps$brandConf === void 0 ? void 0 : _this$_deps$brandConf.defaultLocale) !== null && _ref3 !== void 0 ? _ref3 : _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "_detectBrowser",
    get: function get() {
      var _this$_deps$localeOpt3, _this$_deps$localeOpt4;
      return (_this$_deps$localeOpt3 = (_this$_deps$localeOpt4 = this._deps.localeOptions) === null || _this$_deps$localeOpt4 === void 0 ? void 0 : _this$_deps$localeOpt4.detectBrowser) !== null && _this$_deps$localeOpt3 !== void 0 ? _this$_deps$localeOpt3 : true;
    }
  }, {
    key: "_polling",
    get: function get() {
      var _this$_deps$localeOpt5, _this$_deps$localeOpt6;
      return (_this$_deps$localeOpt5 = (_this$_deps$localeOpt6 = this._deps.localeOptions) === null || _this$_deps$localeOpt6 === void 0 ? void 0 : _this$_deps$localeOpt6.polling) !== null && _this$_deps$localeOpt5 !== void 0 ? _this$_deps$localeOpt5 : false;
    }
  }, {
    key: "_pollingInterval",
    get: function get() {
      var _this$_deps$localeOpt7, _this$_deps$localeOpt8;
      return (_this$_deps$localeOpt7 = (_this$_deps$localeOpt8 = this._deps.localeOptions) === null || _this$_deps$localeOpt8 === void 0 ? void 0 : _this$_deps$localeOpt8.pollingInterval) !== null && _this$_deps$localeOpt7 !== void 0 ? _this$_deps$localeOpt7 : 2000;
    }
  }, {
    key: "supportedLocales",
    get: function get() {
      var _ref4, _this$_deps$localeOpt9, _this$_deps$localeOpt10, _this$_deps$brandConf2;
      return (_ref4 = (_this$_deps$localeOpt9 = (_this$_deps$localeOpt10 = this._deps.localeOptions) === null || _this$_deps$localeOpt10 === void 0 ? void 0 : _this$_deps$localeOpt10.supportedLocales) !== null && _this$_deps$localeOpt9 !== void 0 ? _this$_deps$localeOpt9 : (_this$_deps$brandConf2 = this._deps.brandConfig) === null || _this$_deps$brandConf2 === void 0 ? void 0 : _this$_deps$brandConf2.supportedLocales) !== null && _ref4 !== void 0 ? _ref4 : [this.defaultLocale];
    }
  }, {
    key: "currentLocale",
    get: function get() {
      var _ref5;
      return (_ref5 = this._transport ? this.proxyLocale : this.locale) !== null && _ref5 !== void 0 ? _ref5 : this.defaultLocale;
    }
  }, {
    key: "browserLocale",
    get: function get() {
      var locale = (0, _detectBrowserLocale["default"])(this.defaultLocale);
      return this.normalizeLocale(locale);
    }
  }]);
  return Locale;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "supportedLocales", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "supportedLocales"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "proxyLocale", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setProxyLocaleSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setProxyLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setProxyLocaleSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setProxyLocaleSuccess"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "debugMode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_toggleDebugMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLocaleSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleDebugMode", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLocale", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setLocale"), _class2.prototype)), _class2)) || _class);
exports.Locale = Locale;
var _default = Locale;
exports["default"] = _default;
//# sourceMappingURL=Locale.js.map
