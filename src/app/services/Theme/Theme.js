"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme = exports.THEME_TYPE_STORAGE_KEY = void 0;
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _createTheme = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/theme/createTheme.js"));
var _rxjs = require("rxjs");
var _Brand = require("../Brand");
var _defaultCssVariable = require("./defaultCssVariable");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var THEME_TYPE_STORAGE_KEY = exports.THEME_TYPE_STORAGE_KEY = '__rc_theme_type';
var THEME_PRIMARY_COLOR_STORAGE_KEY = '__rc_theme_primary_color';
var DEFAULT_THEME_TYPES = process.env.NODE_ENV === 'production' ? ['light'] :
// currently we only enable followSystem in dev mode, wait PM and design to confirm to enable in production
['followSystem', 'light', 'dark', 'contrast'];
var Theme = exports.Theme = (_dec = (0, _nextCore.injectable)({
  name: 'Theme'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ThemeOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _Brand.Brand === "undefined" ? Object : _Brand.Brand, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof ThemeOptions === "undefined" ? Object : ThemeOptions]), _dec5 = Reflect.metadata("design:type", String), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String]), _dec0 = (0, _nextCore.delegate)('server'), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [String]), _dec11 = Reflect.metadata("design:type", Boolean), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [Boolean]), _dec14 = Reflect.metadata("design:type", Object), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [Object]), _dec17 = (0, _nextCore.delegate)('server'), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [Object]), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = (0, _nextCore.computed)(function (that) {
  var _that$_brand$brandCon, _that$_brand$defaultC;
  return [that.themeType, that.themeId, (_that$_brand$brandCon = that._brand.brandConfig.theme) === null || _that$_brand$brandCon === void 0 ? void 0 : _that$_brand$brandCon.themeMap, (_that$_brand$defaultC = that._brand.defaultConfig.theme) === null || _that$_brand$defaultC === void 0 ? void 0 : _that$_brand$defaultC.themeMap];
}), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", []), _dec32 = (0, _nextCore.computed)(function (that) {
  var _that$_brand$brandCon2;
  return [(_that$_brand$brandCon2 = that._brand.brandConfig.theme) === null || _that$_brand$brandCon2 === void 0 ? void 0 : _that$_brand$brandCon2.variable];
}), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Theme(_portManager, _brand, _storage, _themeOptions) {
    var _this$_themeOptions$e, _this$_themeOptions;
    var _this;
    _classCallCheck(this, Theme);
    _this = _callSuper(this, Theme);
    _this._portManager = _portManager;
    _this._brand = _brand;
    _this._storage = _storage;
    _this._themeOptions = _themeOptions;
    _initializerDefineProperty(_this, "themeId", _descriptor, _this);
    _initializerDefineProperty(_this, "themeType", _descriptor2, _this);
    _initializerDefineProperty(_this, "followSystem", _descriptor3, _this);
    _initializerDefineProperty(_this, "prefersReducedMotion", _descriptor4, _this);
    _this.syncThemeStateToLocalStorage$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.themeType;
    }).pipe((0, _rxjs.switchMap)(function (themeType) {
      // wait 500ms for ensure the css already be set
      return (0, _rxjs.timer)(500).pipe((0, _rxjs.tap)(function () {
        localStorage.setItem(THEME_TYPE_STORAGE_KEY, themeType);
        var value = getComputedStyle(document.body).getPropertyValue('--s-primary-b');
        if (!value) return;

        // get the primary color from css variable, and set it to localStorage
        localStorage.setItem(THEME_PRIMARY_COLOR_STORAGE_KEY, "rgb(".concat(value, ")"));
      }));
    }));
    var enableCache = (_this$_themeOptions$e = (_this$_themeOptions = _this._themeOptions) === null || _this$_themeOptions === void 0 ? void 0 : _this$_themeOptions.enableCache) !== null && _this$_themeOptions$e !== void 0 ? _this$_themeOptions$e : true;
    if (enableCache) {
      _this._storage.enable(_this);
    }
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      if (_this._portManager.shared) {
        _this._portManager.onClient(function () {
          _this.sendModuleInitEvent();
          _this.listenThemeChange();
        });
        _this._portManager.onMainTab(function () {
          _this.listenSystemTheme();
        });
        _this._portManager.onServer(function () {
          _this.checkCurrThemeTypeBeSupported();
        });
      } else {
        _this.sendModuleInitEvent();
        _this.listenThemeChange();
        _this.listenSystemTheme();
        _this.checkCurrThemeTypeBeSupported();
      }
    } else {
      var _this$_themeOptions2;
      if ((_this$_themeOptions2 = _this._themeOptions) === null || _this$_themeOptions2 === void 0 ? void 0 : _this$_themeOptions2.initThemeDetect) {
        _this.sendModuleInitEvent();
        _this.listenThemeChange();
      }
    }
    return _this;
  }
  _inherits(Theme, _RcModule);
  return _createClass(Theme, [{
    key: "setThemeId",
    value: function setThemeId(val) {
      this.themeId = val;
    }
  }, {
    key: "_setThemeType",
    value: function _setThemeType(type) {
      this.themeType = type;
    }
  }, {
    key: "setThemeType",
    value: function () {
      var _setThemeType2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(type) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setThemeType(type);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setThemeType(_x) {
        return _setThemeType2.apply(this, arguments);
      }
      return setThemeType;
    }()
  }, {
    key: "setFollowSystem",
    value: function setFollowSystem(val) {
      this.followSystem = val;
    }
  }, {
    key: "setPrefersReducedMotion",
    value: function setPrefersReducedMotion(val) {
      this.prefersReducedMotion = val;
    }
  }, {
    key: "updatePrefersReducedMotion",
    value: function () {
      var _updatePrefersReducedMotion = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(val) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.setPrefersReducedMotion(val);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function updatePrefersReducedMotion(_x2) {
        return _updatePrefersReducedMotion.apply(this, arguments);
      }
      return updatePrefersReducedMotion;
    }()
  }, {
    key: "reducedMotion",
    get: function get() {
      if (this.prefersReducedMotion === 'always') {
        return true;
      }
      if (this.prefersReducedMotion === 'never') {
        return false;
      }
      return undefined;
    }
  }, {
    key: "updateThemeType",
    value: function () {
      var _updateThemeType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(type) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(type === 'followSystem')) {
                _context3.n = 1;
                break;
              }
              this.setFollowSystem(true);
              return _context3.a(2);
            case 1:
              this.setFollowSystem(false);
              this.setThemeType(type);
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function updateThemeType(_x3) {
        return _updateThemeType.apply(this, arguments);
      }
      return updateThemeType;
    }()
    /**
     * the type that this app supported theme types, only use in new spring-ui project
     */
  }, {
    key: "supportedThemeTypes",
    get: function get() {
      var _this$_themeOptions3;
      var shouldSupportedTypes = ((_this$_themeOptions3 = this._themeOptions) === null || _this$_themeOptions3 === void 0 ? void 0 : _this$_themeOptions3.supportedThemeTypes) || DEFAULT_THEME_TYPES;
      if (shouldSupportedTypes.length === 0) {
        return [];
      }
      var themeMap = this._brand.suiThemeMap;
      var localThemeData = Object.entries(themeMap);

      // when every themeMap is empty, that means not use suiThemeMap, just use default theme
      if (localThemeData.every(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          map = _ref2[1];
        return map.length === 0;
      })) {
        return shouldSupportedTypes;
      }
      var supportedTypes = localThemeData.reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          map = _ref4[1];
        if (key === 'default') return acc;
        if (map.length > 0 && shouldSupportedTypes.indexOf(key) !== -1) {
          acc.push(key);
        }
        return acc;
      }, []);

      // only when both support light and dark can support followSystem
      if (supportedTypes.includes('light') && supportedTypes.includes('dark')) {
        supportedTypes.push('followSystem');
      }
      return supportedTypes.sort(function (a, b) {
        return shouldSupportedTypes.indexOf(a) - shouldSupportedTypes.indexOf(b);
      });
    }
  }, {
    key: "supportListenSystemTheme",
    get: function get() {
      var _this$supportedThemeT;
      return Boolean((_this$supportedThemeT = this.supportedThemeTypes) === null || _this$supportedThemeT === void 0 ? void 0 : _this$supportedThemeT.includes('followSystem'));
    }
  }, {
    key: "selectedThemeType",
    get: function get() {
      return this.followSystem ? 'followSystem' : this.themeType;
    }
  }, {
    key: "checkCurrThemeTypeBeSupported",
    value:
    // check current theme type is inside supported theme types
    function checkCurrThemeTypeBeSupported() {
      var _this2 = this;
      var currentThemeShouldInSupportThemeList$ = (0, _nextCore.fromWatchValue)(this, function () {
        return [_this2.themeType, _this2.supportedThemeTypes];
      }, {
        multiple: true
      }).pipe((0, _rxjs.tap)(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          themeType = _ref6[0],
          supportedThemeTypes = _ref6[1];
        if (!supportedThemeTypes.includes(themeType)) {
          var targetType = supportedThemeTypes[0] || 'light';
          _this2.setThemeType(targetType);
        }
      }));
      this.readyState$.pipe((0, _rxjs.switchMap)(function (ready) {
        return ready ? currentThemeShouldInSupportThemeList$ : _rxjs.EMPTY;
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "listenSystemTheme",
    value: function listenSystemTheme() {
      var _this3 = this;
      var systemThemeChange$ = (0, _nextCore.fromWatchValue)(this, function () {
        return _this3.followSystem;
      }).pipe((0, _rxjs.switchMap)(function (followSystem) {
        var _window, _window$matchMedia;
        if (!followSystem) return _rxjs.EMPTY;
        var darkTheme = (_window = window) === null || _window === void 0 ? void 0 : (_window$matchMedia = _window.matchMedia) === null || _window$matchMedia === void 0 ? void 0 : _window$matchMedia.call(_window, '(prefers-color-scheme: dark)');
        return darkTheme ? (0, _rxjs.fromEvent)(darkTheme, 'change').pipe((0, _rxjs.startWith)(null), (0, _rxjs.map)(function () {
          var isDark = darkTheme.matches;
          return isDark;
        })) : _rxjs.EMPTY;
      }), (0, _rxjs.tap)(function (isDark) {
        _nextCore.logger.log("[".concat(_this3.identifier, "] system theme is"), isDark ? 'dark' : 'light');
        var themeType = isDark ? 'dark' : 'light';
        _this3.setThemeType(themeType);
      }));
      var systemTheme$ = (0, _nextCore.fromWatchValue)(this, function () {
        return _this3.supportListenSystemTheme;
      }).pipe((0, _rxjs.switchMap)(function (supportListenSystemTheme) {
        return supportListenSystemTheme ? systemThemeChange$ : _rxjs.EMPTY;
      }));
      this.readyState$.pipe((0, _rxjs.switchMap)(function (ready) {
        return ready ? (0, _rxjs.merge)(systemTheme$, _this3.syncThemeStateToLocalStorage$) : _rxjs.EMPTY;
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "listenThemeChange",
    value: function listenThemeChange() {
      var _this4 = this;
      (0, _nextCore.watch)(this, function () {
        return _this4.themeType;
      }, function () {
        var _document;
        (_document = document) === null || _document === void 0 ? void 0 : _document.dispatchEvent(new CustomEvent('theme-change', {
          bubbles: false,
          detail: _this4.themeType
        }));
      });
    }
  }, {
    key: "sendModuleInitEvent",
    value: function sendModuleInitEvent() {
      var _document2,
        _this5 = this;
      (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.dispatchEvent(new CustomEvent('theme-init', {
        bubbles: false,
        detail: function detail(type) {
          // this be init before module init, set theme directly, that will be use before redux
          _this5.themeType = type;
        }
      }));
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this6 = this;
      // those old logic only exec in non spring-ui project, new project should base on BSS to get the brand theme
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        var _this$_themeOptions4, _this$_themeOptions5;
        if (!((_this$_themeOptions4 = this._themeOptions) === null || _this$_themeOptions4 === void 0 ? void 0 : _this$_themeOptions4.ignoreInitDefaultTheme)) {
          var isThemeReady = this.themeType !== '';
          if (!isThemeReady) {
            var _this$_brand$brandCon;
            var defaultThemeType = (_this$_brand$brandCon = this._brand.brandConfig.theme) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.defaultTheme;
            if (defaultThemeType) {
              this.setThemeType(defaultThemeType);
            }
          }
        }
        if (!((_this$_themeOptions5 = this._themeOptions) === null || _this$_themeOptions5 === void 0 ? void 0 : _this$_themeOptions5.ignoreThemeTypeInMapCheck)) {
          (0, _nextCore.watch)(this, function () {
            return _this6._brand.brandConfig.theme;
          }, function (newValue) {
            // when current theme type not in new theme map, switch to default theme
            if ((newValue === null || newValue === void 0 ? void 0 : newValue.themeMap) && !Object.hasOwnProperty.call(newValue.themeMap, _this6.themeType)) {
              var newDefaultThemeType = newValue === null || newValue === void 0 ? void 0 : newValue.defaultTheme;
              if (newDefaultThemeType && newDefaultThemeType !== _this6.themeType) {
                _this6.setThemeType(newDefaultThemeType);
              }
            }
          });
        }
      }
    }
  }, {
    key: "theme",
    get: function get() {
      var _this$_brand$brandCon2, _this$_brand$brandCon3, _this$_brand$defaultC, _this$_brand$defaultC2, _this$_themeOptions6;
      var themeType = this.themeType;
      // when themeType not be set, use light as default theme to find correct theme
      var targetThemeType = themeType || 'light';
      var curr = ((_this$_brand$brandCon2 = this._brand.brandConfig.theme) === null || _this$_brand$brandCon2 === void 0 ? void 0 : (_this$_brand$brandCon3 = _this$_brand$brandCon2.themeMap) === null || _this$_brand$brandCon3 === void 0 ? void 0 : _this$_brand$brandCon3[targetThemeType]) || ((_this$_brand$defaultC = this._brand.defaultConfig.theme) === null || _this$_brand$defaultC === void 0 ? void 0 : (_this$_brand$defaultC2 = _this$_brand$defaultC.themeMap) === null || _this$_brand$defaultC2 === void 0 ? void 0 : _this$_brand$defaultC2[targetThemeType]) ||
      // when still not found, use default juno theme
      // we must have default theme, that will use in c2d variable
      (0, _createTheme["default"])();
      var processTheme = (_this$_themeOptions6 = this._themeOptions) === null || _this$_themeOptions6 === void 0 ? void 0 : _this$_themeOptions6.processTheme;
      return processTheme ? processTheme(targetThemeType, curr) : curr;
    }
  }, {
    key: "variable",
    get: function get() {
      var _this$_brand$brandCon4;
      return _objectSpread(_objectSpread({}, _defaultCssVariable.defaultCssVariable), (_this$_brand$brandCon4 = this._brand.brandConfig.theme) === null || _this$_brand$brandCon4 === void 0 ? void 0 : _this$_brand$brandCon4.variable);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "themeId", [_nextCore.globalStorage, _nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setThemeId", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeId"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "themeType", [_nextCore.globalStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setThemeType", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_setThemeType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setThemeType", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeType"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "followSystem", [_nextCore.globalStorage, _nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this$_themeOptions$f, _this$_themeOptions7;
    return (_this$_themeOptions$f = (_this$_themeOptions7 = this._themeOptions) === null || _this$_themeOptions7 === void 0 ? void 0 : _this$_themeOptions7.followSystem) !== null && _this$_themeOptions$f !== void 0 ? _this$_themeOptions$f : true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setFollowSystem", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "setFollowSystem"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefersReducedMotion", [_nextCore.globalStorage, _nextCore.state, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return process.env.NODE_ENV === 'test' ?
    // in test env, we always enable reduced motion to ignore the animation
    'always' :
    // currently we always disable reduced motion in production as default value
    'never';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setPrefersReducedMotion", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "setPrefersReducedMotion"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePrefersReducedMotion", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePrefersReducedMotion"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reducedMotion", [_nextCore.computed, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "reducedMotion"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateThemeType", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "updateThemeType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "supportedThemeTypes", [_nextCore.computed, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "supportedThemeTypes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "supportListenSystemTheme", [_nextCore.computed, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "supportListenSystemTheme"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "theme", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "theme"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "variable", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "variable"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Theme.js.map
