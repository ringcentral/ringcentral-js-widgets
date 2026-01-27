"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Locale = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/esnext.global-this.js");
var _detectBrowserLocale = _interopRequireWildcard(require("@ringcentral-integration/commons/lib/detectBrowserLocale"));
var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));
var _i18nDayjs = require("@ringcentral-integration/i18n-dayjs");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var Locale = exports.Locale = (_dec = (0, _nextCore.injectable)({
  name: 'Locale'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('BrandConfig')(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('LocaleOptions')(target, undefined, 2);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof BrandConfig === "undefined" ? Object : BrandConfig, typeof LocaleOptions === "undefined" ? Object : LocaleOptions]), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", String), _dec11 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [String, String]), _dec14 = (0, _nextCore.delegate)('server'), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [String, String]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [String]), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Locale(_portManager, _brandConfig, _localeOptions) {
    var _this;
    _classCallCheck(this, Locale);
    _this = _callSuper(this, Locale);
    _this._portManager = _portManager;
    _this._brandConfig = _brandConfig;
    _this._localeOptions = _localeOptions;
    _initializerDefineProperty(_this, "locale", _descriptor, _this);
    _initializerDefineProperty(_this, "clientLocales", _descriptor2, _this);
    _initializerDefineProperty(_this, "debugMode", _descriptor3, _this);
    _i18n["default"].setDefaultLocale(_this.defaultLocale);
    _i18n["default"].setGetTranslateLocale(function () {
      return _this.currentLocale;
    });
    if (_this._portManager.shared) {
      _this._portManager.onClient(function () {
        _this._listenServerToClientLocaleLoad();
      });
    }
    if (_this._detectBrowser && _this._detectBrowser !== 'once') {
      if (_this._portManager.shared) {
        _this._portManager.onMainTab(function () {
          _this._listenBrowserLocaleChange();
        });
      } else {
        _this._listenBrowserLocaleChange();
      }
    }
    return _this;
  }
  _inherits(Locale, _RcModule);
  return _createClass(Locale, [{
    key: "defaultLocale",
    get: function get() {
      var _ref, _this$_localeOptions$, _this$_localeOptions, _this$_brandConfig;
      return (_ref = (_this$_localeOptions$ = (_this$_localeOptions = this._localeOptions) === null || _this$_localeOptions === void 0 ? void 0 : _this$_localeOptions.defaultLocale) !== null && _this$_localeOptions$ !== void 0 ? _this$_localeOptions$ : (_this$_brandConfig = this._brandConfig) === null || _this$_brandConfig === void 0 ? void 0 : _this$_brandConfig.defaultLocale) !== null && _ref !== void 0 ? _ref : _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "_detectBrowser",
    get: function get() {
      var _this$_localeOptions$2, _this$_localeOptions2;
      return (_this$_localeOptions$2 = (_this$_localeOptions2 = this._localeOptions) === null || _this$_localeOptions2 === void 0 ? void 0 : _this$_localeOptions2.detectBrowser) !== null && _this$_localeOptions$2 !== void 0 ? _this$_localeOptions$2 : true;
    }
  }, {
    key: "supportedLocales",
    get: function get() {
      var _ref2, _this$_localeOptions$3, _this$_localeOptions3, _this$_brandConfig2;
      return (_ref2 = (_this$_localeOptions$3 = (_this$_localeOptions3 = this._localeOptions) === null || _this$_localeOptions3 === void 0 ? void 0 : _this$_localeOptions3.supportedLocales) !== null && _this$_localeOptions$3 !== void 0 ? _this$_localeOptions$3 : (_this$_brandConfig2 = this._brandConfig) === null || _this$_brandConfig2 === void 0 ? void 0 : _this$_brandConfig2.supportedLocales) !== null && _ref2 !== void 0 ? _ref2 : [this.defaultLocale];
    }
  }, {
    key: "acceptLocaleMap",
    get: function get() {
      return (0, _i18n.getAcceptLocaleMap)(this.supportedLocales);
    }
  }, {
    key: "initLocale",
    get: function get() {
      var initLocale = this._detectBrowser ? this.browserLocale : this.defaultLocale;
      return initLocale;
    }
  }, {
    key: "_setClientLocaleSuccess",
    value: function _setClientLocaleSuccess(clientId, locale) {
      this.clientLocales[clientId] = locale;
    }
  }, {
    key: "clientLocale",
    get: function get() {
      if (!this._portManager.clientId) return null;
      return this.clientLocales[this._portManager.clientId];
    }
  }, {
    key: "setClientLocaleSuccess",
    value: function () {
      var _setClientLocaleSuccess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(clientId, locale) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this.clientLocales[clientId] !== locale) {
                this._setClientLocaleSuccess(clientId, locale);
              }
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setClientLocaleSuccess(_x, _x2) {
        return _setClientLocaleSuccess2.apply(this, arguments);
      }
      return setClientLocaleSuccess;
    }()
  }, {
    key: "_toggleDebugMode",
    value: function _toggleDebugMode() {
      this.debugMode = !this.debugMode;
      // TODO: refactor without side effect.
      if (this.debugMode) {
        this.setLocale(_i18n.PSEUDO_LOCALE, false);
      }
    }
  }, {
    key: "_setLocaleSuccess",
    value: function _setLocaleSuccess(locale) {
      this.locale = locale;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var initLocale;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              initLocale = this._detectBrowser ? this.browserLocale : this.defaultLocale;
              this.logger.log('initLocale', initLocale);
              _context2.n = 1;
              return this.setLocale(initLocale, false);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "_listenServerToClientLocaleLoad",
    value: function _listenServerToClientLocaleLoad() {
      var _this2 = this;
      var initClientLocale$ = (0, _rxjs.defer)(function () {
        var initLocale = _this2.initLocale;
        _this2.logger.log('client initLocale', initLocale);
        return _this2._innerSetAndLoadLocale(initLocale);
      }).pipe((0, _rxjs.take)(1), (0, _rxjs.switchMap)(function (locale) {
        // set local state async to make we can get the locale client state as soon as possible
        _this2._setClientLocaleSuccess(_this2._portManager.clientId, locale);

        // also sync to server
        return _this2.setClientLocaleSuccess(_this2._portManager.clientId, locale);
      }));

      // wait server ready, then set the locale state to load the locale
      initClientLocale$.pipe((0, _rxjs.switchMap)(function () {
        return _this2.ready$;
      }), (0, _rxjs.take)(1), (0, _rxjs.switchMap)(function () {
        return (0, _nextCore.fromWatchValue)(_this2, function () {
          return _this2.locale;
        });
      }), (0, _rxjs.filter)(Boolean), (0, _rxjs.concatMap)(/*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(locale) {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                if (!(locale !== _this2.clientLocale)) {
                  _context3.n = 2;
                  break;
                }
                _context3.n = 1;
                return _this2._innerSetAndLoadLocale(locale);
              case 1:
                _context3.n = 2;
                return _this2.setClientLocaleSuccess(_this2._portManager.clientId, locale);
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }()), (0, _rxjs.distinctUntilChanged)()).subscribe();
    }
  }, {
    key: "_listenBrowserLocaleChange",
    value: function () {
      var _listenBrowserLocaleChange2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this3 = this;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!_nextCore.isSharedWorker) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              this.ready$.pipe((0, _rxjs.switchMap)(function () {
                return (0, _nextCore.fromWatchValue)(_this3, function () {
                  return _this3.debugMode;
                });
              }), (0, _rxjs.switchMap)(function (debugMode) {
                if (debugMode) return _rxjs.EMPTY;
                _this3.logger.info('listen browser locale change');
                // https://developer.mozilla.org/en-US/docs/Web/API/Window/languagechange_event
                return (0, _rxjs.fromEvent)(globalThis.window, 'languagechange');
              }), (0, _rxjs.distinctUntilChanged)(), (0, _rxjs.switchMap)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
                var browserLocale, currentLocale;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.n) {
                    case 0:
                      browserLocale = _this3.browserLocale;
                      currentLocale = _this3.currentLocale;
                      _this3.logger.info('browser locale change', {
                        browserLocale: (0, _detectBrowserLocale.getBrowserLocale)(),
                        normalizedBrowserLocale: browserLocale,
                        currentLocale: currentLocale
                      });
                      if (!(browserLocale !== currentLocale)) {
                        _context4.n = 1;
                        break;
                      }
                      _context4.n = 1;
                      return _this3.setLocale(browserLocale, false);
                    case 1:
                      return _context4.a(2);
                  }
                }, _callee4);
              }))), _nextCore.takeUntilAppDestroy).subscribe();
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _listenBrowserLocaleChange() {
        return _listenBrowserLocaleChange2.apply(this, arguments);
      }
      return _listenBrowserLocaleChange;
    }()
  }, {
    key: "_innerSetAndLoadLocale",
    value: function () {
      var _innerSetAndLoadLocale2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(locale) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return _i18n["default"].setLocale(locale);
            case 1:
              (0, _i18nDayjs.setDayjsLocale)(locale || this.defaultLocale);
              return _context6.a(2, locale);
          }
        }, _callee6, this);
      }));
      function _innerSetAndLoadLocale(_x4) {
        return _innerSetAndLoadLocale2.apply(this, arguments);
      }
      return _innerSetAndLoadLocale;
    }()
  }, {
    key: "normalizeLocale",
    value: function normalizeLocale(_inputLocale) {
      if (_inputLocale === null) return this.defaultLocale;
      var inputLocale = (0, _i18n.formatLocale)(_inputLocale);

      // Try exact match first, then language-only match
      if (this.acceptLocaleMap.has(inputLocale)) {
        return this.acceptLocaleMap.get(inputLocale);
      }

      // Try language-only match
      var languageOnly = inputLocale.split('-')[0];
      if (this.acceptLocaleMap.has(languageOnly)) {
        return this.acceptLocaleMap.get(languageOnly);
      }
      return this.defaultLocale;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      var _ref5;
      return (_ref5 = this._portManager.isClient ? this.clientLocale : this.locale) !== null && _ref5 !== void 0 ? _ref5 : this.defaultLocale;
    }
  }, {
    key: "browserLocale",
    get: function get() {
      var locale = (0, _detectBrowserLocale["default"])(this.defaultLocale);
      return this.normalizeLocale(locale);
    }
  }, {
    key: "toggleDebugMode",
    value: function () {
      var _toggleDebugMode2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._toggleDebugMode();
            case 1:
              return _context7.a(2);
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
     *
     * by default that will normalize the locale to the supported locales, if you already normalized the locale, you can set `normalize` to false
     * @param locale - The desired locale to set.
     * @param normalize - Whether to normalize the locale to the supported locales.
     */
  }, {
    key: "setLocale",
    value: (function () {
      var _setLocale = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(locale) {
        var normalize,
          _locale,
          _args8 = arguments,
          _t;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              normalize = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : true;
              _context8.p = 1;
              _locale = normalize ? this.normalizeLocale(locale) : locale;
              _context8.n = 2;
              return this._innerSetAndLoadLocale(_locale);
            case 2:
              this._setLocaleSuccess(_locale);
              _context8.n = 4;
              break;
            case 3:
              _context8.p = 3;
              _t = _context8.v;
              this.logger.error('load locale fail', _t);
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function setLocale(_x5) {
        return _setLocale.apply(this, arguments);
      }
      return setLocale;
    }())
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "supportedLocales", [_nextCore.computed, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "supportedLocales"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptLocaleMap", [_nextCore.computed, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptLocaleMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initLocale", [_nextCore.computed, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "initLocale"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clientLocales", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setClientLocaleSuccess", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_setClientLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setClientLocaleSuccess", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "setClientLocaleSuccess"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "debugMode", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_toggleDebugMode", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLocaleSuccess", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleDebugMode", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLocale", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "setLocale"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Locale.js.map
