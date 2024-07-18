"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme = void 0;
var _core = require("@ringcentral-integration/core");
var _juno = require("@ringcentral/juno");
var _di = require("../../lib/di");
var _defaultCssVariable = require("./defaultCssVariable");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var Theme = (_dec = (0, _di.Module)({
  name: 'Theme',
  deps: ['Brand', {
    dep: 'ThemeOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_deps$brand$bra, _that$_deps$brand$def;
  return [that.themeType, that._deps.brand.themeMap, (_that$_deps$brand$bra = that._deps.brand.brandConfig.theme) === null || _that$_deps$brand$bra === void 0 ? void 0 : _that$_deps$brand$bra.themeMap, (_that$_deps$brand$def = that._deps.brand.defaultConfig.theme) === null || _that$_deps$brand$def === void 0 ? void 0 : _that$_deps$brand$def.themeMap];
}), _dec3 = (0, _core.computed)(function (that) {
  var _that$_deps$brand$bra2;
  return [(_that$_deps$brand$bra2 = that._deps.brand.brandConfig.theme) === null || _that$_deps$brand$bra2 === void 0 ? void 0 : _that$_deps$brand$bra2.variable];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Theme, _RcModuleV);
  var _super = _createSuper(Theme);
  function Theme(deps) {
    var _this;
    _classCallCheck(this, Theme);
    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: true,
      storageKey: 'Theme'
    });
    _initializerDefineProperty(_this, "themeId", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "themeType", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Theme, [{
    key: "setThemeId",
    value: function setThemeId(val) {
      this.themeId = val;
    }
  }, {
    key: "setThemeType",
    value: function setThemeType(type) {
      this.themeType = type;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this$_deps$brand$bra,
        _this2 = this;
      var defaultThemeType = (_this$_deps$brand$bra = this._deps.brand.brandConfig.theme) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.defaultTheme;
      if (defaultThemeType) {
        this.setThemeType(defaultThemeType);
      }
      (0, _core.watch)(this, function () {
        return _this2._deps.brand.brandConfig.theme;
      }, function (newValue) {
        var newDefaultThemeType = newValue === null || newValue === void 0 ? void 0 : newValue.defaultTheme;
        if (newDefaultThemeType && newDefaultThemeType !== _this2.themeType) {
          _this2.setThemeType(newDefaultThemeType);
        }
      });
    }
  }, {
    key: "theme",
    get: function get() {
      var _this$_deps$brand$bra2, _this$_deps$brand$bra3, _this$_deps$brand$def, _this$_deps$brand$def2, _this$_deps$themeOpti;
      var themeType = this.themeType;

      // when themeType not be set, use light as default theme to find correct theme
      var targetThemeType = themeType || 'light';
      var curr = ((_this$_deps$brand$bra2 = this._deps.brand.brandConfig.theme) === null || _this$_deps$brand$bra2 === void 0 ? void 0 : (_this$_deps$brand$bra3 = _this$_deps$brand$bra2.themeMap) === null || _this$_deps$brand$bra3 === void 0 ? void 0 : _this$_deps$brand$bra3[targetThemeType]) || ((_this$_deps$brand$def = this._deps.brand.defaultConfig.theme) === null || _this$_deps$brand$def === void 0 ? void 0 : (_this$_deps$brand$def2 = _this$_deps$brand$def.themeMap) === null || _this$_deps$brand$def2 === void 0 ? void 0 : _this$_deps$brand$def2[targetThemeType]) ||
      // when still not found, use default juno theme
      // we must have default theme, that will use in c2d variable
      (0, _juno.createTheme)();
      var processTheme = (_this$_deps$themeOpti = this._deps.themeOptions) === null || _this$_deps$themeOpti === void 0 ? void 0 : _this$_deps$themeOpti.processTheme;
      return processTheme ? processTheme(targetThemeType, curr) : curr;
    }
  }, {
    key: "variable",
    get: function get() {
      var _this$_deps$brand$bra4;
      return _objectSpread(_objectSpread({}, _defaultCssVariable.defaultCssVariable), (_this$_deps$brand$bra4 = this._deps.brand.brandConfig.theme) === null || _this$_deps$brand$bra4 === void 0 ? void 0 : _this$_deps$brand$bra4.variable);
    }
  }]);
  return Theme;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "themeId", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setThemeId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeId"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "themeType", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setThemeType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "theme", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "theme"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "variable", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "variable"), _class2.prototype)), _class2)) || _class);
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map
