"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Locale = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));
var _i18nDayjs = require("@ringcentral-integration/i18n-dayjs");
var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
var _detectBrowserLocale = _interopRequireDefault(require("../../lib/detectBrowserLocale"));
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var Locale = exports.Locale = (_dec = (0, _di.Module)({
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
  function Locale(deps) {
    var _this;
    _classCallCheck(this, Locale);
    _this = _callSuper(this, Locale, [{
      deps: deps
    }]);
    _initializerDefineProperty(_this, "locale", _descriptor, _this);
    _initializerDefineProperty(_this, "proxyLocale", _descriptor2, _this);
    _initializerDefineProperty(_this, "debugMode", _descriptor3, _this);
    _i18n["default"].setDefaultLocale(_this.defaultLocale);
    return _this;
  }
  _inherits(Locale, _RcModuleV);
  return _createClass(Locale, [{
    key: "defaultLocale",
    get: function get() {
      var _ref2, _this$_deps$localeOpt, _this$_deps$localeOpt2, _this$_deps$brandConf;
      return (_ref2 = (_this$_deps$localeOpt = (_this$_deps$localeOpt2 = this._deps.localeOptions) === null || _this$_deps$localeOpt2 === void 0 ? void 0 : _this$_deps$localeOpt2.defaultLocale) !== null && _this$_deps$localeOpt !== void 0 ? _this$_deps$localeOpt : (_this$_deps$brandConf = this._deps.brandConfig) === null || _this$_deps$brandConf === void 0 ? void 0 : _this$_deps$brandConf.defaultLocale) !== null && _ref2 !== void 0 ? _ref2 : _i18n.DEFAULT_LOCALE;
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
      var _ref3, _this$_deps$localeOpt9, _this$_deps$localeOpt0, _this$_deps$brandConf2;
      return (_ref3 = (_this$_deps$localeOpt9 = (_this$_deps$localeOpt0 = this._deps.localeOptions) === null || _this$_deps$localeOpt0 === void 0 ? void 0 : _this$_deps$localeOpt0.supportedLocales) !== null && _this$_deps$localeOpt9 !== void 0 ? _this$_deps$localeOpt9 : (_this$_deps$brandConf2 = this._deps.brandConfig) === null || _this$_deps$brandConf2 === void 0 ? void 0 : _this$_deps$brandConf2.supportedLocales) !== null && _ref3 !== void 0 ? _ref3 : [this.defaultLocale];
    }
  }, {
    key: "_setProxyLocaleSuccess",
    value: function _setProxyLocaleSuccess(locale) {
      this.proxyLocale = locale;
    }
  }, {
    key: "setProxyLocaleSuccess",
    value: function () {
      var _setProxyLocaleSuccess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(locale) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setProxyLocaleSuccess(locale);
            case 1:
              return _context.a(2);
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
      var _initializeProxy = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this2 = this;
        var setLocalePromise;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._setLocale(this.currentLocale);
            case 1:
              this.setProxyLocaleSuccess(this.currentLocale);
              this.store.subscribe(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.n) {
                    case 0:
                      if (!(_this2.locale !== _this2.proxyLocale && !setLocalePromise)) {
                        _context2.n = 2;
                        break;
                      }
                      setLocalePromise = _this2._setLocale(_this2.locale);
                      _context2.n = 1;
                      return setLocalePromise;
                    case 1:
                      _this2.setProxyLocaleSuccess(_this2.locale);
                      setLocalePromise = null;
                    case 2:
                      return _context2.a(2);
                  }
                }, _callee2);
              })));
            case 2:
              return _context3.a(2);
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
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.setLocale(this._detectBrowser ? this.browserLocale : this.defaultLocale);
            case 1:
              return _context4.a(2);
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
      var _syncBrowserLocale2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this3 = this;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(!this.debugMode && this.browserLocale !== this.currentLocale)) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this.setLocale(this.browserLocale);
            case 1:
              setTimeout(function () {
                return _this3._syncBrowserLocale();
              }, this._pollingInterval);
            case 2:
              return _context5.a(2);
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
      var _setLocale2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(locale) {
        var toLocale;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              toLocale = locale || this.defaultLocale;
              _context6.n = 1;
              return _i18n["default"].setLocale(toLocale);
            case 1:
              (0, _i18nDayjs.setDayjsLocale)(toLocale);
            case 2:
              return _context6.a(2);
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
     */
  }, {
    key: "setLocale",
    value: (function () {
      var _setLocale3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(locale) {
        var _t;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this._setLocale(locale);
            case 1:
              this._setLocaleSuccess(locale);
              _context8.n = 3;
              break;
            case 2:
              _context8.p = 2;
              _t = _context8.v;
              console.log(_t);
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function setLocale(_x3) {
        return _setLocale3.apply(this, arguments);
      }
      return setLocale;
    }())
  }]);
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "supportedLocales", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "supportedLocales"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "_toggleDebugMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLocaleSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleDebugMode", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLocale", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setLocale"), _class2.prototype), _class2)) || _class);
var _default = exports["default"] = Locale;
//# sourceMappingURL=Locale.js.map
