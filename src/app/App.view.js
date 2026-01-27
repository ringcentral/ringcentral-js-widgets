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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingAppView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _nextMicro = require("@ringcentral-integration/next-micro");
var _react = _interopRequireDefault(require("react"));
var _styles = require("../styles");
var _views2 = require("./views");
var _CallQueueManagementView = require("./views/CallQueueManagementView");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var SettingAppView = exports.SettingAppView = (_dec = (0, _nextCore.injectable)({
  name: 'SettingAppView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _services.Theme === "undefined" ? Object : _services.Theme, typeof _views2.SettingsView === "undefined" ? Object : _views2.SettingsView, typeof _views2.CallingSettingsView === "undefined" ? Object : _views2.CallingSettingsView, typeof _views2.RegionSettingsView === "undefined" ? Object : _views2.RegionSettingsView, typeof _views2.AudioSettingsView === "undefined" ? Object : _views2.AudioSettingsView, typeof _views2.FeedbackView === "undefined" ? Object : _views2.FeedbackView, typeof _views2.IssuesTrackingView === "undefined" ? Object : _views2.IssuesTrackingView, typeof _CallQueueManagementView.CallQueueManagementView === "undefined" ? Object : _CallQueueManagementView.CallQueueManagementView, typeof _views.MFEAppRootView === "undefined" ? Object : _views.MFEAppRootView]), _dec4 = (0, _nextCore.delegate)('server'), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [String]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcMicroAppView) {
  function SettingAppView(_theme, _settingsView, _callingSettingsView, _regionSettingsView, _audioSettingsView, _feedbackView, _issuesTrackingView, _callQueueManagementView, _mfeAppRootView) {
    var _this;
    _classCallCheck(this, SettingAppView);
    _this = _callSuper(this, SettingAppView);
    _this._theme = _theme;
    _this._settingsView = _settingsView;
    _this._callingSettingsView = _callingSettingsView;
    _this._regionSettingsView = _regionSettingsView;
    _this._audioSettingsView = _audioSettingsView;
    _this._feedbackView = _feedbackView;
    _this._issuesTrackingView = _issuesTrackingView;
    _this._callQueueManagementView = _callQueueManagementView;
    _this._mfeAppRootView = _mfeAppRootView;
    _this._mfeAppRootView.setRoutes(_this, _this.Routes);
    return _this;
  }
  _inherits(SettingAppView, _RcMicroAppView);
  return _createClass(SettingAppView, [{
    key: "setThemeType",
    value: function () {
      var _setThemeType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(type) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._theme.setThemeType(type);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setThemeType(_x) {
        return _setThemeType.apply(this, arguments);
      }
      return setThemeType;
    }()
  }, {
    key: "Routes",
    value: function Routes() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement(_nextCore.Switch, null, /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
        path: "/settings",
        component: function component() {
          return /*#__PURE__*/_react["default"].createElement(_nextCore.Switch, null, /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings",
            exact: true,
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._settingsView.component, {
                // appCode={appCode}
                showQuickAccess: true,
                showAudio: _this2._audioSettingsView.showSetting
              });
            }
          }), _this2._callingSettingsView.showSetting && /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings/calling",
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._callingSettingsView.component, null);
            }
          }), /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings/region",
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._regionSettingsView.component, null);
            }
          }), _this2._audioSettingsView.showSetting && /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings/audio",
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._audioSettingsView.component, null);
            }
          }), /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings/feedback",
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._feedbackView.component, null);
            }
          }), /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings/issuesTracking",
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._issuesTrackingView.component, null);
            }
          }), /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
            path: "/settings/callQueueManagement",
            component: function component() {
              return /*#__PURE__*/_react["default"].createElement(_this2._callQueueManagementView.component, null);
            }
          }));
        }
      }));
    }
  }, {
    key: "component",
    value: function component() {
      var MicroAuth = (0, _nextMicro.useMicroApp)(this, {
        name: '@ringcentral-integration/micro-auth',
        loader: function loader() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@ringcentral-integration/micro-auth/src/bootstrap'));
          });
        }
      });
      if (!this.isAppShell) return /*#__PURE__*/_react["default"].createElement(MicroAuth, null);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_styles.GlobalStyle, null), /*#__PURE__*/_react["default"].createElement(MicroAuth, null), /*#__PURE__*/_react["default"].createElement(this._mfeAppRootView.DefaultRoute, null), /*#__PURE__*/_react["default"].createElement(this._mfeAppRootView.Routes, {
        appShell: this
      }));
    }
  }]);
}(_nextMicro.RcMicroAppView), _applyDecoratedDescriptor(_class2.prototype, "setThemeType", [_dec4, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Routes", [_nextCore.autobind, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "Routes"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=App.view.js.map
