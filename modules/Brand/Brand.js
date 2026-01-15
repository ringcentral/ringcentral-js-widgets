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
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _i18n = require("@ringcentral-integration/i18n");
var _processI18n = require("@ringcentral-integration/i18n/lib/processI18n");
var _di = require("../../lib/di");
var _processAssets = require("./processAssets");
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor;
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
var Brand = exports.Brand = (_dec = (0, _di.Module)({
  name: 'Brand',
  deps: ['BrandConfig', 'Locale', {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'BrandConfigOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_deps$locale, _that$_deps$locale2;
  return [that._dynamicConfig, (_that$_deps$locale = that._deps.locale) === null || _that$_deps$locale === void 0 ? void 0 : _that$_deps$locale.currentLocale, (_that$_deps$locale2 = that._deps.locale) === null || _that$_deps$locale2 === void 0 ? void 0 : _that$_deps$locale2.defaultLocale];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.brandConfig];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._defaultConfig];
}), _dec5 = (0, _core.computed)(function (that) {
  var _that$_deps$locale3, _that$_deps$locale4;
  return [that._defaultConfig, that._dynamicConfig, (_that$_deps$locale3 = that._deps.locale) === null || _that$_deps$locale3 === void 0 ? void 0 : _that$_deps$locale3.currentLocale, (_that$_deps$locale4 = that._deps.locale) === null || _that$_deps$locale4 === void 0 ? void 0 : _that$_deps$locale4.defaultLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function Brand(deps) {
    var _this$_deps$brandConf;
    var _this;
    _classCallCheck(this, Brand);
    _this = _callSuper(this, Brand, [{
      deps: deps
    }]);
    _this._prefix = null;
    _initializerDefineProperty(_this, "_dynamicConfig", _descriptor, _this);
    _this._prefix = "".concat(_this._deps.brandConfig.code, "-").concat((_this$_deps$brandConf = _this._deps.brandConfig.application) !== null && _this$_deps$brandConf !== void 0 ? _this$_deps$brandConf : '');
    _this.bindUpdateDocumentVariables();
    return _this;
  }
  _inherits(Brand, _RcModuleV);
  return _createClass(Brand, [{
    key: "setDynamicConfig",
    value: function setDynamicConfig(config) {
      this._dynamicConfig = config;
    }
  }, {
    key: "bindUpdateDocumentVariables",
    value: function bindUpdateDocumentVariables() {
      var _this2 = this;
      if (!global.document) return;
      var updateDocumentVariables = function updateDocumentVariables() {
        var check = function check() {
          return JSON.stringify(_this2.brandConfig.styleVariable);
        };
        var updateVal = check();
        _this2.updateDocumentVariables();
        (0, _core.watch)(_this2, check, function (val) {
          if (val === updateVal) return;
          updateVal = val;
          _this2.updateDocumentVariables();
        });
      };

      // * in old arch chrome extension content page, need to wait a tick, otherwise the watch event will not get any update
      Promise.resolve().then(updateDocumentVariables);
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
      var _this$_deps$locale$cu, _this$_deps$locale, _this$_deps$locale$de, _this$_deps$locale2;
      return this._dynamicConfig && (0, _processI18n.processI18n)(this._dynamicConfig, (_this$_deps$locale$cu = (_this$_deps$locale = this._deps.locale) === null || _this$_deps$locale === void 0 ? void 0 : _this$_deps$locale.currentLocale) !== null && _this$_deps$locale$cu !== void 0 ? _this$_deps$locale$cu : _i18n.DEFAULT_LOCALE, (_this$_deps$locale$de = (_this$_deps$locale2 = this._deps.locale) === null || _this$_deps$locale2 === void 0 ? void 0 : _this$_deps$locale2.defaultLocale) !== null && _this$_deps$locale$de !== void 0 ? _this$_deps$locale$de : _i18n.DEFAULT_LOCALE);
    }

    /**
     * default brand config with assets processed
     */
  }, {
    key: "_defaultConfig",
    get: function get() {
      var _this$_deps$brandConf2;
      var brandConfig = this._deps.brandConfig;
      if (!(brandConfig === null || brandConfig === void 0 ? void 0 : brandConfig.assets)) return brandConfig;

      /**
       * use current window location.origin as origin
       * to avoid app inject into others page meet resource path issue
       * like chrome extension content page
       */
      return _objectSpread(_objectSpread({}, brandConfig), {}, {
        assets: (0, _processAssets.processAssets)(brandConfig.assets, ((_this$_deps$brandConf2 = this._deps.brandConfigOptions) === null || _this$_deps$brandConf2 === void 0 ? void 0 : _this$_deps$brandConf2.assetOrigin) || location.origin)
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
      var _this$_dynamicConfig, _this$_deps$locale$cu2, _this$_deps$locale3, _this$_deps$locale$de2, _this$_deps$locale4;
      return (0, _processI18n.processI18n)((_this$_dynamicConfig = this._dynamicConfig) !== null && _this$_dynamicConfig !== void 0 ? _this$_dynamicConfig : this._defaultConfig, (_this$_deps$locale$cu2 = (_this$_deps$locale3 = this._deps.locale) === null || _this$_deps$locale3 === void 0 ? void 0 : _this$_deps$locale3.currentLocale) !== null && _this$_deps$locale$cu2 !== void 0 ? _this$_deps$locale$cu2 : _i18n.DEFAULT_LOCALE, (_this$_deps$locale$de2 = (_this$_deps$locale4 = this._deps.locale) === null || _this$_deps$locale4 === void 0 ? void 0 : _this$_deps$locale4.defaultLocale) !== null && _this$_deps$locale$de2 !== void 0 ? _this$_deps$locale$de2 : _i18n.DEFAULT_LOCALE);
    }
  }, {
    key: "prefix",
    get: function get() {
      var _this$_deps$prefix;
      return (_this$_deps$prefix = this._deps.prefix) !== null && _this$_deps$prefix !== void 0 ? _this$_deps$prefix : this._prefix;
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
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dynamicConfig", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDynamicConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDynamicConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dynamicConfig", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "dynamicConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_defaultConfig", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_defaultConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultConfig", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "brandConfig", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "brandConfig"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Brand.js.map
