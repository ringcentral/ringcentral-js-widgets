"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brand = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _i18n = require("@ringcentral-integration/i18n");
var _processI18n = require("@ringcentral-integration/i18n/lib/processI18n");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _Locale = require("../Locale");
var _processAssets = require("./processAssets");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var Brand = exports.Brand = (_dec = (0, _nextCore.injectable)({
  name: 'Brand'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('BrandConfig')(target, undefined, 0);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('Prefix')(target, undefined, 2);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('BrandConfigOptions')(target, undefined, 3);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof BrandConfig === "undefined" ? Object : BrandConfig, typeof _Locale.Locale === "undefined" ? Object : _Locale.Locale, String, typeof BrandConfigOptions === "undefined" ? Object : BrandConfigOptions]), _dec7 = Reflect.metadata("design:type", typeof T === "undefined" ? Object : T), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof T === "undefined" ? Object : T]), _dec0 = Reflect.metadata("design:type", typeof SuiBrandThemeMap === "undefined" ? Object : SuiBrandThemeMap), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof SuiBrandThemeMap === "undefined" ? Object : SuiBrandThemeMap]), _dec11 = (0, _nextCore.computed)(function (that) {
  var _that$_locale, _that$_locale2;
  return [that._dynamicConfig, (_that$_locale = that._locale) === null || _that$_locale === void 0 ? void 0 : _that$_locale.currentLocale, (_that$_locale2 = that._locale) === null || _that$_locale2 === void 0 ? void 0 : _that$_locale2.defaultLocale];
}), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = (0, _nextCore.computed)(function (that) {
  return [that._brandConfig];
}), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = (0, _nextCore.computed)(function (that) {
  return [that._defaultConfig];
}), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = (0, _nextCore.computed)(function (that) {
  var _that$_locale3, _that$_locale4;
  return [that._defaultConfig, that._dynamicConfig, (_that$_locale3 = that._locale) === null || _that$_locale3 === void 0 ? void 0 : _that$_locale3.currentLocale, (_that$_locale4 = that._locale) === null || _that$_locale4 === void 0 ? void 0 : _that$_locale4.defaultLocale];
}), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Brand(_brandConfig, _locale, _prefix, _brandConfigOptions) {
    var _this$_brandConfig$ap;
    var _this;
    _classCallCheck(this, Brand);
    _this = _callSuper(this, Brand);
    _this._brandConfig = _brandConfig;
    _this._locale = _locale;
    _this._prefix = _prefix;
    _this._brandConfigOptions = _brandConfigOptions;
    _this._defaultPrefix = "".concat(_this._brandConfig.code, "-").concat((_this$_brandConfig$ap = _this._brandConfig.application) !== null && _this$_brandConfig$ap !== void 0 ? _this$_brandConfig$ap : '');
    _initializerDefineProperty(_this, "_dynamicConfig", _descriptor, _this);
    _initializerDefineProperty(_this, "suiThemeMap", _descriptor2, _this);
    _this.bindUpdateDocumentVariables();
    return _this;
  }
  _inherits(Brand, _RcModule);
  return _createClass(Brand, [{
    key: "setDynamicConfig",
    value: function setDynamicConfig(config) {
      this._dynamicConfig = config;
    }
  }, {
    key: "setSuiThemeMap",
    value: function setSuiThemeMap(val) {
      this.suiThemeMap = val;
    }
  }, {
    key: "bindUpdateDocumentVariables",
    value: function bindUpdateDocumentVariables() {
      var _this2 = this;
      if (!global.document) return;
      var obs$ = (0, _nextCore.fromWatchValue)(this, function () {
        return JSON.stringify(_this2.brandConfig.styleVariable);
      }).pipe((0, _rxjs.distinctUntilChanged)(), (0, _rxjs.tap)(function () {
        return _this2.updateDocumentVariables();
      }), _nextCore.takeUntilAppDestroy);
      obs$.subscribe();
    }
  }, {
    key: "updateDocumentVariables",
    value: function updateDocumentVariables() {
      var _this$brandConfig$sty;
      // apply that style variable to global css variable
      Object.entries((_this$brandConfig$sty = this.brandConfig.styleVariable) !== null && _this$brandConfig$sty !== void 0 ? _this$brandConfig$sty : {}).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        document.documentElement.style.setProperty("--".concat(key), "".concat(value));
      });
    }

    /**
     * dynamic brand config with i18n processed with currentLocale
     */
  }, {
    key: "dynamicConfig",
    get: function get() {
      var _this$_locale$current, _this$_locale, _this$_locale$default, _this$_locale2;
      return this._dynamicConfig && (0, _processI18n.processI18n)(this._dynamicConfig, (_this$_locale$current = (_this$_locale = this._locale) === null || _this$_locale === void 0 ? void 0 : _this$_locale.currentLocale) !== null && _this$_locale$current !== void 0 ? _this$_locale$current : _i18n.DEFAULT_LOCALE, (_this$_locale$default = (_this$_locale2 = this._locale) === null || _this$_locale2 === void 0 ? void 0 : _this$_locale2.defaultLocale) !== null && _this$_locale$default !== void 0 ? _this$_locale$default : _i18n.DEFAULT_LOCALE);
    }

    /**
     * default brand config with assets processed
     */
  }, {
    key: "_defaultConfig",
    get: function get() {
      var _this$_brandConfigOpt;
      var brandConfig = this._brandConfig;
      if (!(brandConfig === null || brandConfig === void 0 ? void 0 : brandConfig.assets)) return brandConfig;

      /**
       * use current window location.origin as origin
       * to avoid app inject into others page meet resource path issue
       * like chrome extension content page
       */
      return _objectSpread(_objectSpread({}, brandConfig), {}, {
        assets: (0, _processAssets.processAssets)(brandConfig.assets, ((_this$_brandConfigOpt = this._brandConfigOptions) === null || _this$_brandConfigOpt === void 0 ? void 0 : _this$_brandConfigOpt.assetOrigin) || global.location.origin)
      });
    }

    /**
     * default brand config with assets and i18n processed using en-US
     */
  }, {
    key: "defaultConfig",
    get: function get() {
      return (0, _processI18n.processI18n)(this._defaultConfig);
    }

    /**
     * Generic brand config accessor that returns dynamic config if available, and defaults
     * to default config. The result is assets and i18n processed with current Locale.
     */
  }, {
    key: "brandConfig",
    get: function get() {
      var _this$_dynamicConfig, _this$_locale$current2, _this$_locale3, _this$_locale$default2, _this$_locale4;
      return (0, _processI18n.processI18n)((_this$_dynamicConfig = this._dynamicConfig) !== null && _this$_dynamicConfig !== void 0 ? _this$_dynamicConfig : this._defaultConfig, (_this$_locale$current2 = (_this$_locale3 = this._locale) === null || _this$_locale3 === void 0 ? void 0 : _this$_locale3.currentLocale) !== null && _this$_locale$current2 !== void 0 ? _this$_locale$current2 : _i18n.DEFAULT_LOCALE, (_this$_locale$default2 = (_this$_locale4 = this._locale) === null || _this$_locale4 === void 0 ? void 0 : _this$_locale4.defaultLocale) !== null && _this$_locale$default2 !== void 0 ? _this$_locale$default2 : _i18n.DEFAULT_LOCALE);
    }
  }, {
    key: "prefix",
    get: function get() {
      var _this$_prefix;
      return (_this$_prefix = this._prefix) !== null && _this$_prefix !== void 0 ? _this$_prefix : this._defaultPrefix;
    }
  }, {
    key: "id",
    get: function get() {
      return this.brandConfig.id;
    }
  }, {
    key: "code",
    get: function get() {
      return this.brandConfig.code;
    }
  }, {
    key: "name",
    get: function get() {
      return this.brandConfig.name;
    }
  }, {
    key: "shortName",
    get: function get() {
      var _this$brandConfig$sho;
      return (_this$brandConfig$sho = this.brandConfig.shortName) !== null && _this$brandConfig$sho !== void 0 ? _this$brandConfig$sho : this.brandConfig.name;
    }
  }, {
    key: "appName",
    get: function get() {
      return this.brandConfig.appName;
    }
  }, {
    key: "shortAppName",
    get: function get() {
      return this.brandConfig.shortAppName;
    }
  }, {
    key: "rcvProductName",
    get: function get() {
      return this.brandConfig.rcvProductName;
    }
  }, {
    key: "rcvE2EESupportUrl",
    get: function get() {
      return this.brandConfig.rcvE2EESupportUrl;
    }
  }, {
    key: "application",
    get: function get() {
      return this.brandConfig.application;
    }
  }, {
    key: "rcvTeleconference",
    get: function get() {
      return this.brandConfig.rcvTeleconference;
    }
  }, {
    key: "assets",
    get: function get() {
      return this.brandConfig.assets;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dynamicConfig", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDynamicConfig", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "setDynamicConfig"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "suiThemeMap", [_nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      "default": [],
      light: [],
      dark: [],
      contrast: []
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSuiThemeMap", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "setSuiThemeMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dynamicConfig", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "dynamicConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_defaultConfig", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_defaultConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultConfig", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "brandConfig", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "brandConfig"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Brand.js.map
