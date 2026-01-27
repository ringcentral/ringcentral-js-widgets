"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemePlugin = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _ThemeProvider = require("@ringcentral/juno/es6/foundation/theme/ThemeProvider.js");
var _react = _interopRequireWildcard(require("react"));
var _services = require("../../services");
var _utils = require("./utils");
var _templateObject, _dec, _dec2, _dec3, _dec4, _class;
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
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var GlobalVariablesStyles = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  :root {\n    color-scheme: ", ";\n    ", ";\n    ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.type;
}, function (_ref2) {
  var variable = _ref2.variable,
    theme = _ref2.theme;
  return (0, _utils.getThemeVariableString)(variable, theme);
}, function (_ref3) {
  var addition = _ref3.addition;
  return addition;
});
var ThemePlugin = exports.ThemePlugin = (_dec = (0, _nextCore.injectable)({
  name: 'ThemePlugin'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ThemePluginOptions')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Theme === "undefined" ? Object : _services.Theme, typeof ThemePluginOptions === "undefined" ? Object : ThemePluginOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_PluginModule) {
  function ThemePlugin(_theme, _themePluginOptions) {
    var _this;
    _classCallCheck(this, ThemePlugin);
    _this = _callSuper(this, ThemePlugin);
    _this._theme = _theme;
    _this._themePluginOptions = _themePluginOptions;
    _this._hostStyleElement = void 0;
    _this.provider = function (_ref4) {
      var children = _ref4.children;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            theme: _this._theme.theme,
            variable: _this._theme.variable
          };
        }),
        variable = _useConnector.variable,
        theme = _useConnector.theme;
      var junoCss = (0, _react.useMemo)(function () {
        return (0, _utils.getCssVariablesFromObject)(theme === null || theme === void 0 ? void 0 : theme.palette, 'j-');
      }, [theme === null || theme === void 0 ? void 0 : theme.palette]);
      (0, _react.useEffect)(function () {
        return function () {
          var _this$_hostStyleEleme, _this$_hostStyleEleme2;
          (_this$_hostStyleEleme = _this._hostStyleElement) === null || _this$_hostStyleEleme === void 0 ? void 0 : (_this$_hostStyleEleme2 = _this$_hostStyleEleme.remove) === null || _this$_hostStyleEleme2 === void 0 ? void 0 : _this$_hostStyleEleme2.call(_this$_hostStyleEleme);
        };
      }, []);
      return /*#__PURE__*/_react["default"].createElement(_styledComponents.StyleSheetManager, {
        target: _this._hostStyleElement
      }, /*#__PURE__*/_react["default"].createElement(_ThemeProvider.RcThemeProvider, {
        theme: theme
      }, /*#__PURE__*/_react["default"].createElement(GlobalVariablesStyles, {
        variable: variable,
        addition: junoCss
      }), children));
    };
    return _this;
  }

  // for our old system can work with Juno, need host juno inside body, make that always have the higher priority, also make that work in shared worker
  _inherits(ThemePlugin, _PluginModule);
  return _createClass(ThemePlugin, [{
    key: "getHostElement",
    value: function getHostElement() {
      var _this$_themePluginOpt, _this$_themePluginOpt2;
      return ((_this$_themePluginOpt = this._themePluginOptions) === null || _this$_themePluginOpt === void 0 ? void 0 : (_this$_themePluginOpt2 = _this$_themePluginOpt.getHostElement) === null || _this$_themePluginOpt2 === void 0 ? void 0 : _this$_themePluginOpt2.call(_this$_themePluginOpt)) || function () {
        var element = document.createElement('div');
        element.setAttribute('id', 'theme-plugin-host');
        document.body.appendChild(element);
        return element;
      }();
    }
  }, {
    key: "afterCreateStore",
    value: function afterCreateStore(store) {
      if (global.document && !this._hostStyleElement) {
        this._hostStyleElement = this.getHostElement();
      }
      return store;
    }
  }]);
}(_nextCore.PluginModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Theme.plugin.js.map
