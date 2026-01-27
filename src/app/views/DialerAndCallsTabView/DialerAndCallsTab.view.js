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
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
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
exports.DialerAndCallsTabView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _TabContentView = require("@ringcentral-integration/widgets/components/TabContentView");
var _hasActiveCalls = require("@ringcentral-integration/widgets/lib/hasActiveCalls");
var _react = _interopRequireWildcard(require("react"));
var _services2 = require("../../services");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var DialerAndCallsTabView = exports.DialerAndCallsTabView = (_dec = (0, _nextCore.injectable)({
  name: 'DialerAndCallsTabView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 4);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('DialerAndCallsTabViewOptions')(target, undefined, 5);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.CallingSettings === "undefined" ? Object : _services2.CallingSettings, typeof _services2.Webphone === "undefined" ? Object : _services2.Webphone, typeof _services2.CallMonitor === "undefined" ? Object : _services2.CallMonitor, typeof DialerAndCallsTabViewOptions === "undefined" ? Object : DialerAndCallsTabViewOptions]), _dec7 = (0, _nextCore.computed)(function (that) {
  return [that._locale.currentLocale, that._router.currentPath];
}), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function DialerAndCallsTabView(_locale, _router, _callingSettings, _webphone, _callMonitor, _dialerAndCallsTabViewOptions) {
    var _this;
    _classCallCheck(this, DialerAndCallsTabView);
    _this = _callSuper(this, DialerAndCallsTabView);
    _this._locale = _locale;
    _this._router = _router;
    _this._callingSettings = _callingSettings;
    _this._webphone = _webphone;
    _this._callMonitor = _callMonitor;
    _this._dialerAndCallsTabViewOptions = _dialerAndCallsTabViewOptions;
    return _this;
  }
  _inherits(DialerAndCallsTabView, _RcViewModule);
  return _createClass(DialerAndCallsTabView, [{
    key: "tabs",
    get: function get() {
      var _this2 = this;
      return [{
        path: '/dialer',
        label: (0, _i18n.t)('dialer'),
        dataSign: 'dialer',
        isActive: function isActive() {
          return _this2._router.currentPath === '/dialer';
        }
      }, {
        path: '/calls',
        label: (0, _i18n.t)('allCalls'),
        dataSign: 'allCalls',
        isActive: function isActive() {
          return _this2._router.currentPath === '/calls';
        }
      }];
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      return {
        showTabs: props.hasActiveCalls ? props.hasActiveCalls({
          callingSettings: this._callingSettings,
          webphone: this._webphone,
          callMonitor: this._callMonitor
        }) : (0, _hasActiveCalls.hasActiveCalls)({
          callingSettings: this._callingSettings,
          webphone: this._webphone,
          callMonitor: this._callMonitor
        }),
        // TODO: fix type
        showSpinner: !this._locale.ready,
        tabs: this.tabs
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this3 = this;
      return {
        goTo: function goTo(path) {
          _this3._router.push(path);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_dialerAndCalls;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_dialerAndCalls = this._dialerAndCallsTabViewOptions) === null || _this$_dialerAndCalls === void 0 ? void 0 : _this$_dialerAndCalls.component) || _TabContentView.TabContentView;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "tabs"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=DialerAndCallsTab.view.js.map
