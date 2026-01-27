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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringThemePlugin = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _springTheme = require("@ringcentral/spring-theme");
var _framerMotion = require("framer-motion");
var _react = _interopRequireWildcard(require("react"));
var _services = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var sprintDefaultThemeMap = {
  dark: _springTheme.suiDark,
  contrast: _springTheme.suiHighContrast
};
var SpringThemePlugin = exports.SpringThemePlugin = (_dec = (0, _nextCore.injectable)({
  name: 'SpringThemePlugin'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('SpringThemePluginOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof _services.Theme === "undefined" ? Object : _services.Theme, typeof SpringThemePluginOptions === "undefined" ? Object : SpringThemePluginOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_PluginModule) {
  function SpringThemePlugin(_brand, _theme, _springThemePluginOptions) {
    var _this;
    _classCallCheck(this, SpringThemePlugin);
    _this = _callSuper(this, SpringThemePlugin);
    _this._brand = _brand;
    _this._theme = _theme;
    _this._springThemePluginOptions = _springThemePluginOptions;
    _this.provider = function (_ref) {
      var children = _ref.children;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return _this.themeProps;
        }),
        theme = _useConnector.theme,
        themeType = _useConnector.themeType,
        prefersReducedMotion = _useConnector.prefersReducedMotion;
      (0, _react.useEffect)(function () {
        _nextCore.logger.log("[".concat((0, _nextCore.getRef)(_this).identifier, "] theme info"), {
          themeType: themeType
        });
      }, [themeType]);
      return /*#__PURE__*/_react["default"].createElement(_springTheme.ThemeProvider, {
        theme: theme
      }, /*#__PURE__*/_react["default"].createElement(_framerMotion.MotionConfig, {
        reducedMotion: prefersReducedMotion
      }, children));
    };
    return _this;
  }
  _inherits(SpringThemePlugin, _PluginModule);
  return _createClass(SpringThemePlugin, [{
    key: "themeProps",
    get: function get() {
      var currType = this._theme.themeType || localStorage.getItem(_services.THEME_TYPE_STORAGE_KEY) || 'light';
      return {
        themeType: currType,
        theme: this.getTheme(currType),
        prefersReducedMotion: this._theme.prefersReducedMotion
      };
    }
  }, {
    key: "getTheme",
    value: function getTheme(type) {
      var _this$_springThemePlu, _curr$;
      // spring only support dark rcDark and rcHighContact in rc brand
      // so for those theme type use default theme map instead directly
      if (type === 'dark' || type === 'contrast') {
        return sprintDefaultThemeMap[type];
      }
      var processTheme = (_this$_springThemePlu = this._springThemePluginOptions) === null || _this$_springThemePlu === void 0 ? void 0 : _this$_springThemePlu.processTheme;
      if (processTheme) {
        return processTheme(type) || _springTheme.suiJunoLight;
      }
      var brand = this._brand;
      var IDBTheme = brand.brandConfig.theme;
      if (// when is force idb theme, never use brand assets data from brand.suiThemeMap
      IDBTheme === null || IDBTheme === void 0 ? void 0 : IDBTheme.force) {
        var _IDBTheme$suiThemeMap;
        if ((_IDBTheme$suiThemeMap = IDBTheme.suiThemeMap) === null || _IDBTheme$suiThemeMap === void 0 ? void 0 : _IDBTheme$suiThemeMap[type]) {
          return IDBTheme.suiThemeMap[type];
        }
        return _springTheme.suiJunoLight;
      }
      var curr = brand.suiThemeMap[type];
      return (curr === null || curr === void 0 ? void 0 : (_curr$ = curr[0]) === null || _curr$ === void 0 ? void 0 : _curr$.theme) || _springTheme.suiJunoLight;
    }
  }]);
}(_nextCore.PluginModule), _applyDecoratedDescriptor(_class2.prototype, "themeProps", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "themeProps"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SpringTheme.plugin.js.map
