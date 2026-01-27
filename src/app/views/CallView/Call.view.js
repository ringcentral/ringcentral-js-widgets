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
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallView = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/esnext.global-this.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _services2 = require("../../services");
var _CallLogFormView = require("../CallLogFormView");
var _QuickCallActionView = require("../QuickCallActionView");
var _i18n = _interopRequireDefault(require("./i18n"));
var _ActiveCallsViewSpring = require("./routes/ActiveCallsViewSpring");
var _AddCallViewSpring = require("./routes/AddCallViewSpring");
var _CallControlViewSpring = require("./routes/CallControlViewSpring");
var _ForwardViewSpring = require("./routes/ForwardViewSpring");
var _IncomingCallViewSpring = require("./routes/IncomingCallViewSpring");
var _KeypadViewSpring = require("./routes/KeypadViewSpring");
var _PostCallViewSpring = require("./routes/PostCallViewSpring");
var _ReplyWithMessageViewSpring = require("./routes/ReplyWithMessageViewSpring");
var _TransferViewSpring = require("./routes/TransferViewSpring");
var _services3 = require("./services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var FullWrapper = function FullWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex: 0,
    className: "absolute top-0 left-0 size-full z-drawer flex flex-col"
  }, children), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
var CallView = exports.CallView = (_dec = (0, _nextCore.injectable)({
  name: 'CallView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 21);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('CallViewOptions')(target, undefined, 22);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.CallAction === "undefined" ? Object : _services2.CallAction, typeof _services2.CallMonitor === "undefined" ? Object : _services2.CallMonitor, typeof _views.SyncTabView === "undefined" ? Object : _views.SyncTabView, typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof _services3.CallViewState === "undefined" ? Object : _services3.CallViewState, typeof _KeypadViewSpring.KeypadView === "undefined" ? Object : _KeypadViewSpring.KeypadView, typeof _IncomingCallViewSpring.IncomingCallView === "undefined" ? Object : _IncomingCallViewSpring.IncomingCallView, typeof _ActiveCallsViewSpring.ActiveCallsView === "undefined" ? Object : _ActiveCallsViewSpring.ActiveCallsView, typeof _TransferViewSpring.TransferView === "undefined" ? Object : _TransferViewSpring.TransferView, typeof _CallControlViewSpring.CallControlView === "undefined" ? Object : _CallControlViewSpring.CallControlView, typeof _ForwardViewSpring.ForwardView === "undefined" ? Object : _ForwardViewSpring.ForwardView, typeof _ReplyWithMessageViewSpring.ReplyWithMessageView === "undefined" ? Object : _ReplyWithMessageViewSpring.ReplyWithMessageView, typeof _PostCallViewSpring.PostCallView === "undefined" ? Object : _PostCallViewSpring.PostCallView, typeof _AddCallViewSpring.AddCallView === "undefined" ? Object : _AddCallViewSpring.AddCallView, typeof _QuickCallActionView.QuickCallActionView === "undefined" ? Object : _QuickCallActionView.QuickCallActionView, typeof _services2.ActiveCallControl === "undefined" ? Object : _services2.ActiveCallControl, typeof _services2.PreinsertCall === "undefined" ? Object : _services2.PreinsertCall, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services.RingCentralExtensions === "undefined" ? Object : _services.RingCentralExtensions, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services2.Webphone === "undefined" ? Object : _services2.Webphone, typeof _CallLogFormView.CallLogFormView === "undefined" ? Object : _CallLogFormView.CallLogFormView, typeof CallViewOptions === "undefined" ? Object : CallViewOptions]), _dec6 = Reflect.metadata("design:type", String), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [String]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _nextCore.dynamic)('SmartNotes'), _dec13 = Reflect.metadata("design:type", typeof SmartNotes === "undefined" ? Object : SmartNotes), _dec14 = (0, _nextCore.dynamic)('SmartNotesView'), _dec15 = Reflect.metadata("design:type", typeof SmartNotesView === "undefined" ? Object : SmartNotesView), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof Call === "undefined" ? Object : Call]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [typeof CallLogFormViewProps === "undefined" ? Object : CallLogFormViewProps]), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [Object]), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallView(_callAction, _callMonitor, _syncTabView, _root, _callViewState, _keypadView, _incomingCallView, _activeCallsView, _transferView, _callControlView, _forwardView, _replyWithMessageView, _postCallView, _addCallView, _quickCallActionView, _activeCallControl, _preInsertCall, _portManager, _ringCentralExtensions, _rateLimiter, _webphone, _callLogFormView, _callViewOptions) {
    var _this;
    _classCallCheck(this, CallView);
    _this = _callSuper(this, CallView);
    _this._callAction = _callAction;
    _this._callMonitor = _callMonitor;
    _this._syncTabView = _syncTabView;
    _this._root = _root;
    _this._callViewState = _callViewState;
    _this._keypadView = _keypadView;
    _this._incomingCallView = _incomingCallView;
    _this._activeCallsView = _activeCallsView;
    _this._transferView = _transferView;
    _this._callControlView = _callControlView;
    _this._forwardView = _forwardView;
    _this._replyWithMessageView = _replyWithMessageView;
    _this._postCallView = _postCallView;
    _this._addCallView = _addCallView;
    _this._quickCallActionView = _quickCallActionView;
    _this._activeCallControl = _activeCallControl;
    _this._preInsertCall = _preInsertCall;
    _this._portManager = _portManager;
    _this._ringCentralExtensions = _ringCentralExtensions;
    _this._rateLimiter = _rateLimiter;
    _this._webphone = _webphone;
    _this._callLogFormView = _callLogFormView;
    _this._callViewOptions = _callViewOptions;
    _initializerDefineProperty(_this, "closedOtherTelephonySessionId", _descriptor, _this);
    _initializerDefineProperty(_this, "_smartNotes", _descriptor2, _this);
    _initializerDefineProperty(_this, "_smartNotesView", _descriptor3, _this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindCallListeners();
      });
      _this._portManager.onMainTab(function () {
        _this.bindBeforeunload();
      });
      _this._portManager.onClient(function () {
        _this.initWebphoneEvent();
      });
    } else {
      _this.bindCallListeners();
      _this.bindBeforeunload();
      _this.initWebphoneEvent();
    }
    return _this;
  }
  _inherits(CallView, _RcViewModule);
  return _createClass(CallView, [{
    key: "_setClosedOtherTelephonySessionId",
    value: function _setClosedOtherTelephonySessionId(val) {
      this.closedOtherTelephonySessionId = val;
    }
  }, {
    key: "setClosedOtherTelephonySessionId",
    value: function () {
      var _setClosedOtherTelephonySessionId2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(val) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setClosedOtherTelephonySessionId(val);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setClosedOtherTelephonySessionId(_x) {
        return _setClosedOtherTelephonySessionId2.apply(this, arguments);
      }
      return setClosedOtherTelephonySessionId;
    }()
  }, {
    key: "showQuickCallAction",
    get: function get() {
      switch (this._callViewState.view) {
        case 'callList':
          return false;
        case 'addCall':
          return true;
        default:
          return this._callAction.hasHiddenCalls;
      }
    }
  }, {
    key: "isShowPostCallView",
    get: function get() {
      var _this$_callViewOption, _this$_callViewOption2;
      return (_this$_callViewOption = (_this$_callViewOption2 = this._callViewOptions) === null || _this$_callViewOption2 === void 0 ? void 0 : _this$_callViewOption2.showPostCallView) !== null && _this$_callViewOption !== void 0 ? _this$_callViewOption : true;
    }
  }, {
    key: "defaultCallLogFormExpanded",
    get: function get() {
      var _this$_callViewOption3, _this$_callViewOption4;
      return this._callAction.expandedAbility && ((_this$_callViewOption3 = (_this$_callViewOption4 = this._callViewOptions) === null || _this$_callViewOption4 === void 0 ? void 0 : _this$_callViewOption4.defaultCallLogFormExpanded) !== null && _this$_callViewOption3 !== void 0 ? _this$_callViewOption3 : true);
    }
  }, {
    key: "bindCallListeners",
    value: function bindCallListeners() {
      var _this2 = this;
      var newCallProcess$ = this._callMonitor.addListener('NewCall').pipe((0, _rxjs.mergeMap)(function (call) {
        _this2.logger.log('new call', call);
        var outboundCall = (0, _callLogHelpers.isOutbound)(call);
        var newTelephonySessionId = call.telephonySessionId;
        var currentCallEnd$ = _this2._callMonitor.addListener('CallEnded').pipe((0, _rxjs.filter)(function (currCall) {
          return currCall.telephonySessionId === newTelephonySessionId;
        }), (0, _rxjs.tap)(function (currCall) {
          _this2.logger.log("call ended", {
            currCall: currCall,
            newTelephonySessionId: newTelephonySessionId,
            allCalls: _this2._callMonitor.allCalls
          });
          _this2._callAction.trackCallEventResult(currCall);
          var result = _this2.processShowPostCallView(newTelephonySessionId, currCall);
          if (!result) {
            _this2._callAction._remove(newTelephonySessionId);
          }
        }));
        var untilCallEnd = (0, _rxjs.pipe)(
        // use NEVER to keep the subscription alive for the takeUntil always listen the call end event
        (0, _rxjs.switchMap)(function () {
          return _rxjs.NEVER;
        }), (0, _rxjs.takeUntil)(currentCallEnd$));
        var newCall$ = (0, _rxjs.defer)(function () {
          _this2.processNewCall(call);
          var newCallTelephonyStatus = call.telephonyStatus;
          var isRingingView = !outboundCall && newCallTelephonyStatus === 'Ringing';
          return (0, _rxjs.of)(isRingingView);
        });
        if (outboundCall) {
          _this2.logger.log("new outbound call");
          return newCall$.pipe(untilCallEnd);
        }
        var call$ = _this2._callAction.fromCallAllInfo(newTelephonySessionId).pipe((0, _rxjs.map)(function (info) {
          return info === null || info === void 0 ? void 0 : info.call;
        }), (0, _rxjs.distinctUntilChanged)(), (0, _rxjs.share)());

        // from have webphone session to not have webphone session, means be ignored
        var ignored$ = call$.pipe((0, _rxjs.filter)(function (_call) {
          return Boolean(_call && _call.webphoneSession);
        }), (0, _rxjs.take)(1), (0, _rxjs.switchMap)(function () {
          return call$;
        }), (0, _rxjs.filter)(function (_call) {
          return Boolean(_call && !_call.webphoneSession);
        }));
        var currentCallConnected$ = _this2._callMonitor.addListener('CallUpdated').pipe((0, _rxjs.filter)(function (call) {
          return call.telephonySessionId === newTelephonySessionId;
        }), (0, _rxjs.filter)(function (call) {
          return call.telephonyStatus === 'CallConnected';
        }), (0, _rxjs.tap)(function () {
          _this2.logger.log("inbound call connected");
        }), (0, _rxjs.share)());
        _this2.logger.log("new inbound call");
        return newCall$.pipe((0, _rxjs.switchMap)(function (isRingingView) {
          // only be ringing view need to wait for call connected
          return isRingingView ? (0, _rxjs.merge)(currentCallConnected$.pipe((0, _rxjs.take)(1), (0, _rxjs.switchMap)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return _this2._callAction.openAndNavigate(newTelephonySessionId, {
                    currentPath: 'controls',
                    minimized: false
                  }, {
                    view: 'activeCall'
                  });
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          })))), ignored$.pipe((0, _rxjs.take)(1), (0, _rxjs.tap)(function (call) {
            _this2.logger.log("call webphone be ignored", call);
            _this2._callAction.updateCallMetaInfo(newTelephonySessionId, {
              open: false,
              minimized: false
            });
          }), (0, _rxjs.takeUntil)(currentCallConnected$))) : _rxjs.NEVER;
        }), untilCallEnd);
      }), _nextCore.takeUntilAppDestroy);
      var callListProcess$ = (0, _rxjs.combineLatest)([(0, _nextCore.fromWatch)(this, function () {
        return _this2._callViewState.view;
      }).pipe((0, _rxjs.tap)(function (view) {
        // once view become the callList, close all incoming calls
        if (view === 'callList') {
          _this2._callAction.closeAllIncomingCalls();
        }
      })), (0, _nextCore.fromWatch)(this, function () {
        return _this2._callMonitor.allCalls.length;
      })]).pipe((0, _rxjs.tap)(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          view = _ref4[0],
          length = _ref4[1];
        // when call become only have one call, back to active call view
        if (view === 'callList' && length <= 1 || view === 'addCall' && length === 0) {
          return _this2._callViewState._setView('activeCall');
        }
        return _rxjs.EMPTY;
      }), _nextCore.takeUntilAppDestroy);
      var expandedCallProcess$ = (0, _nextCore.fromWatch)(this, function () {
        return [_this2._callAction.displayCallAllInfo, _this2._callViewState.view];
      }, {
        multiple: true
      }).pipe((0, _rxjs.map)(function (_ref5) {
        var _info$call;
        var _ref6 = _slicedToArray(_ref5, 2),
          info = _ref6[0],
          view = _ref6[1];
        var beQueueCall = (info === null || info === void 0 ? void 0 : info.call) && (0, _services2.isQueueCall)(info.call);
        var telephonySessionId = info === null || info === void 0 ? void 0 : (_info$call = info.call) === null || _info$call === void 0 ? void 0 : _info$call.telephonySessionId;
        var meta = info === null || info === void 0 ? void 0 : info.meta;
        return {
          id: telephonySessionId,
          expanded: meta &&
          // only expanded when info be open
          meta.open &&
          // only when view is activeCall and expanded able to show
          view === 'activeCall' &&
          // minimized mode never show expanded panel
          !meta.minimized && (
          // when queue call only when controls path is not `incoming`
          beQueueCall ? meta.currentPath !== 'incoming' && meta.expanded : meta.expanded)
        };
      }),
      // only when id or expanded change, need to update the expanded state
      (0, _rxjs.distinctUntilChanged)(function (prev, curr) {
        return (0, _isEqual["default"])(prev, curr);
      }), (0, _rxjs.tap)(function (state) {
        _this2.logger.log("display call change", state);
      }), (0, _rxjs.tap)(function (_ref7) {
        var id = _ref7.id,
          expanded = _ref7.expanded;
        _this2.processExpandedCall(id, expanded);
      }), _nextCore.takeUntilAppDestroy);
      newCallProcess$.subscribe();
      callListProcess$.subscribe();
      this._callAction.fullScreenCallActionOpened$.pipe(_nextCore.takeUntilAppDestroy).subscribe();
      if (this.defaultCallLogFormExpanded) expandedCallProcess$.subscribe();
    }

    /**
     * use one action to batch the dispatch action in once
     */
  }, {
    key: "processNewCall",
    value: function processNewCall(call) {
      var _this$_callAction$exi, _this$_callAction$exi2, _this$_callAction$exi3;
      var inbound = (0, _callLogHelpers.isInbound)(call);
      var newTelephonySessionId = call.telephonySessionId;
      var newCallTelephonyStatus = call.telephonyStatus;
      var actions = this._callAction.actions;
      var activeSessionId = this._activeCallControl.activeSessionId;
      var outbound = !inbound;
      // when new outbound but have existing call, hold existing call
      if (outbound &&
      // when be conference call, the exist active call will be terminated, not need hold
      !call.isConferenceCall && activeSessionId && newTelephonySessionId !== activeSessionId) {
        var _this$_callAction$act;
        var activeCall = (_this$_callAction$act = this._callAction.activeCallInfo) === null || _this$_callAction$act === void 0 ? void 0 : _this$_callAction$act.call;
        if (
        // new call is outbound, and curr call be active call and not in other device, then should hold current call
        activeCall && activeCall.telephonySessionId !== newTelephonySessionId && !(0, _services2.isOtherDeviceCall)(activeCall) && !(0, _services2.isHoldingCall)(activeCall) && !(0, _services2.isRingingCall)(activeCall)) {
          actions.hold(activeSessionId);
        }
        this._callAction._updateCallMetaInfo(activeSessionId, {
          open: false,
          minimized: false
        });
      }
      var isRingingView = inbound && newCallTelephonyStatus === 'Ringing';
      this._callAction['_openAndNavigate'](newTelephonySessionId, {
        currentPath: isRingingView ? 'incoming' : 'controls',
        minimized: isRingingView ? (_this$_callAction$exi = (_this$_callAction$exi2 = this._callAction.existRingingOpenCallMetaInfo) === null || _this$_callAction$exi2 === void 0 ? void 0 : (_this$_callAction$exi3 = _this$_callAction$exi2.meta) === null || _this$_callAction$exi3 === void 0 ? void 0 : _this$_callAction$exi3.minimized) !== null && _this$_callAction$exi !== void 0 ? _this$_callAction$exi : true : false
      }, {
        closeOtherActives: !inbound,
        view: isRingingView ? undefined : 'activeCall'
      });
      this.logger.log("openAndNavigate", newTelephonySessionId);
    }

    // for batch the action in once
  }, {
    key: "processExpandedCall",
    value: function processExpandedCall(id, expanded) {
      if (!id || expanded === undefined) {
        this._root['_setExpanded'](false);
        return;
      }
      if (expanded === null) {
        // when first time
        this._callAction['_updateCallMetaInfo'](id, {
          expanded: true
        });
        return;
      }

      // when expanded state change, update the expanded state to target call
      if (this._root.expanded !== expanded) {
        this._root['_setExpanded'](expanded);
      }
    }
  }, {
    key: "processWarmTransferEnd",
    value: function processWarmTransferEnd(newTelephonySessionId, currCall) {
      var warnTransferringData = this._activeCallControl.transferCallMapping[currCall.telephonySessionId];
      if (!warnTransferringData) return;
      var isDisplayCall = this._callAction.isFullSizeDisplayCall(newTelephonySessionId) || this._callAction.isFullSizeDisplayCall(warnTransferringData.relatedTelephonySessionId);
      if (isDisplayCall) {
        this._callAction._updateCallMetaInfo(warnTransferringData.relatedTelephonySessionId, {
          open: true
        });
      }
      if (!warnTransferringData.isOriginal) {
        this.logger.log("warn transferring related call end, original call be", warnTransferringData.relatedTelephonySessionId);
        return warnTransferringData.relatedTelephonySessionId;
      } else {
        this.logger.log("warn transferring original call end", newTelephonySessionId);
        return newTelephonySessionId;
      }
    }
  }, {
    key: "processShowPostCallView",
    value: function processShowPostCallView(newTelephonySessionId, currCall) {
      var _transferringOriginal;
      var transferringOriginalTelephonySessionId = this.processWarmTransferEnd(newTelephonySessionId, currCall);
      if (!this.isShowPostCallView) return;
      if (this._preInsertCall.isBringInPartyPreinsertStatus(newTelephonySessionId)) {
        this.logger.log("bring in party conference call ended, not into history page");
        return;
      }
      var isDisplayCall = this._callAction.isFullSizeDisplayCall(newTelephonySessionId);
      if (!isDisplayCall) return;
      var transferringOriginalInfo = transferringOriginalTelephonySessionId && this._callAction.getAllInfoByTelephonySessionId(transferringOriginalTelephonySessionId);
      var shouldIntoPostCall = transferringOriginalInfo ?
      // if that be transferring original call, only when that be connected able to into post call page, because when hangup the transfer target directly, that not need into post call page, keep in original call page
      ['CallConnected'].includes((_transferringOriginal = transferringOriginalInfo.call) === null || _transferringOriginal === void 0 ? void 0 : _transferringOriginal.telephonyStatus) : ['CallConnected', 'OnHold'].includes(currCall.telephonyStatus);
      if (!shouldIntoPostCall) return;
      var targetTelephonySessionId = transferringOriginalTelephonySessionId || newTelephonySessionId;
      this.logger.log("redirect to post call page", targetTelephonySessionId);
      this._callViewState._setPostCallView(targetTelephonySessionId);
      return newTelephonySessionId;
    }
  }, {
    key: "initWebphoneEvent",
    value: function () {
      var _initWebphoneEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this3 = this;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._webphone.onWebphoneRegistered(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                var _t;
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.p = _context3.n) {
                    case 0:
                      if (!(!_this3._rateLimiter.restricted && _this3._ringCentralExtensions)) {
                        _context3.n = 4;
                        break;
                      }
                      _context3.p = 1;
                      _this3.logger.log('[onWebphoneRegistered] recover websocket');
                      _context3.n = 2;
                      return _this3._ringCentralExtensions.recoverWebSocketConnection();
                    case 2:
                      _context3.n = 4;
                      break;
                    case 3:
                      _context3.p = 3;
                      _t = _context3.v;
                      _this3.logger.warn('[onWebphoneRegistered]', _t);
                    case 4:
                      return _context3.a(2);
                  }
                }, _callee3, null, [[1, 3]]);
              })));
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function initWebphoneEvent() {
        return _initWebphoneEvent.apply(this, arguments);
      }
      return initWebphoneEvent;
    }()
  }, {
    key: "bindBeforeunload",
    value: function bindBeforeunload() {
      var _this4 = this;
      globalThis.window.addEventListener('beforeunload', function (event) {
        var calling = _this4._webphone.sessions.length > 0;
        if (calling) {
          event.preventDefault();
          event.returnValue = true;
        }
      });
    }
  }, {
    key: "enableSmartNote",
    get: function get() {
      var _this$_callViewOption5;
      // if project provide the brandAllowsSmartNotes, and not support smart notes, early return false
      if (((_this$_callViewOption5 = this._callViewOptions) === null || _this$_callViewOption5 === void 0 ? void 0 : _this$_callViewOption5.brandAllowsSmartNotes) === false) {
        return false;
      }
      return !!this._smartNotes && !!this._smartNotesView;
    }
  }, {
    key: "CallDetailForm",
    value: function CallDetailForm(_ref9) {
      var _this5 = this;
      var _ref9$variant = _ref9.variant,
        variant = _ref9$variant === void 0 ? 'history' : _ref9$variant,
        info = _ref9.info;
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      var afterCallEnd = variant === 'history' || variant === 'postCall';
      var tabs = (0, _react.useMemo)(function () {
        var result = [];
        if (!info) return result;

        // call log form
        if (_this5._callLogFormView) {
          result.push({
            id: _views.CallLogSyncTabId.LOG,
            label: t('callLogTitle'),
            component: /*#__PURE__*/_react["default"].createElement(_this5._callLogFormView.component, {
              variant: variant,
              info: info
            })
          });
        }

        // smart note
        if (_this5.enableSmartNote) {
          var _this5$_smartNotes;
          if (afterCallEnd && info.hasSmartNote) {
            result.push({
              id: _views.CallLogSyncTabId.AI_NOTE,
              label: t('aiNoteTitleInHistory'),
              component: _this5._smartNotesView ? /*#__PURE__*/_react["default"].createElement(_this5._smartNotesView.component, {
                variant: afterCallEnd ? 'history' : 'expanded',
                info: info,
                mode: "post-call",
                "data-sign": "ai-notes-panel",
                "data-tab-type": "history"
              }) : null
            });
          } else if (variant === 'expanded' && ((_this5$_smartNotes = _this5._smartNotes) === null || _this5$_smartNotes === void 0 ? void 0 : _this5$_smartNotes.hasPermission)) {
            result.push({
              id: _views.CallLogSyncTabId.AI_NOTE,
              label: t('aiNoteTitleInActiveCall'),
              component: _this5._smartNotesView ? /*#__PURE__*/_react["default"].createElement(_this5._smartNotesView.component, {
                variant: variant,
                info: info,
                mode: "in-call",
                "data-sign": "ai-notes-panel",
                "data-tab-type": "active-call"
              }) : null
            });
          }
        }
        return result;
      }, [info, afterCallEnd, t, variant]);
      if (tabs.length === 0) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, tabs.length === 1 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, variant !== 'expanded' && /*#__PURE__*/_react["default"].createElement(_springUi.Divider, {
        className: "mx-4"
      }), tabs[0].component) : /*#__PURE__*/_react["default"].createElement(this._syncTabView.component, {
        id: _views.SyncTabId.CALL_LOG,
        "data-sign": "call-log-tabs",
        variant: "standard",
        pill: afterCallEnd,
        tabs: tabs,
        className: (0, _clsx["default"])('flex-none', afterCallEnd && 'px-4'),
        tabClassName: "flex-none w-auto",
        tabRootClassName: "h-8"
      }));
    }
  }, {
    key: "CallLogArea",
    value: function CallLogArea() {
      var _this6 = this;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            postCallCallLog: _this6._callViewState.postCallCallLog,
            info: _this6._callAction.displayCallAllInfo,
            view: _this6._callViewState.view,
            expanded: _this6._root.expanded
          };
        }),
        expanded = _useConnector.expanded,
        info = _useConnector.info,
        view = _useConnector.view,
        postCallCallLog = _useConnector.postCallCallLog;
      var curr = info || postCallCallLog;
      var isPostCall = view === 'postCall';
      var shouldRender = isPostCall || !isPostCall && (expanded ||
      // when first time end call, the call will be dismiss, and expanded be false but still should keep the dom render to avoid user typing be interrupted
      !(info === null || info === void 0 ? void 0 : info.call));
      var call = (0, _services2.useLatestExistCall)(info);
      var renderInfo = call || postCallCallLog;
      var logSectionRef = (0, _react.useRef)(null);
      (0, _react.useLayoutEffect)(function () {
        if (isPostCall) {
          var activeElement = document.activeElement;
          var logSection = logSectionRef.current;
          if (activeElement && (logSection === null || logSection === void 0 ? void 0 : logSection.contains(activeElement))) {
            _this6.logger.log('still active inside the log section, scroll into view');
            activeElement.scrollIntoView();
          }
        }
      }, [isPostCall]);
      var open = curr && view !== 'hidden';

      /**
       * we use the same dom element to prevent the flicker when switch between call log and post call log
       */
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, open ? /*#__PURE__*/_react["default"].createElement(_components.ExpandedLayoutPopper, {
        expanded: !isPostCall
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: _views.VIEW_TRANSITION_DETAIL_IDENTIFY,
        className: "flex flex-col w-full h-full",
        "data-sign": isPostCall ? 'post-log-panel' : 'during-call-log-panel',
        "data-call-log-id": renderInfo === null || renderInfo === void 0 ? void 0 : renderInfo.telephonySessionId
      }, isPostCall ?
      /*#__PURE__*/
      // the top info of post call log
      _react["default"].createElement("div", {
        className: "flex-none"
      }, /*#__PURE__*/_react["default"].createElement(this._postCallView.component, {
        variant: "header"
      })) : null, /*#__PURE__*/_react["default"].createElement("div", {
        ref: logSectionRef,
        "data-sign": "log-notes-transcript-section",
        className: "pointer-events-auto flex-auto flex flex-col overflow-y-auto overflow-x-hidden"
      }, isPostCall && /*#__PURE__*/_react["default"].createElement(this._postCallView.component, {
        variant: "info"
      }),
      // when ever have call log, but both log not exist, means that redux still processing, keep the dom
      shouldRender && /*#__PURE__*/_react["default"].createElement(this.CallDetailForm, {
        variant: isPostCall ? 'postCall' : 'expanded',
        info: renderInfo
      })), shouldRender && this._callLogFormView && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.ToastPositionAdjustor, null, /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(this._callLogFormView.Save, null)))))) : null);
    }
  }, {
    key: "CallItem",
    value: function CallItem(_ref0) {
      var call = _ref0.call,
        meta = _ref0.meta;
      if (!meta) {
        this.logger.error('meta not found', {
          call: call
        });
        return null;
      }
      var open = meta.open,
        currentPath = meta.currentPath;
      if (!open) return null;
      if (!call) {
        this.logger.error('call not found', {
          call: call
        });
        return null;
      }
      switch (currentPath) {
        case 'keypad':
          return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(this._keypadView.component, _extends({
            call: call
          }, meta)));
        case 'incoming':
          return /*#__PURE__*/_react["default"].createElement(this._incomingCallView.component, _extends({
            call: call
          }, meta));
        case 'controls':
          return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(this._callControlView.component, _extends({
            call: call
          }, meta)));
        case 'transfer':
          return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(this._transferView.component, _extends({
            call: call
          }, meta)));
        case 'forward':
          return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(this._forwardView.component, _extends({
            call: call
          }, meta)));
        case 'reply':
          return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(this._replyWithMessageView.component, _extends({
            call: call
          }, meta)));
        default:
          this.logger.error('unknown call path, should not happen', {
            currentPath: currentPath,
            call: call,
            meta: meta
          });
          return null;
      }
    }
  }, {
    key: "Announcement",
    value: function Announcement() {
      var _this7 = this;
      var _useConnector2 = (0, _nextCore.useConnector)(function () {
          return {
            showQuickCallAction: _this7.showQuickCallAction
          };
        }),
        showQuickCallAction = _useConnector2.showQuickCallAction;
      return showQuickCallAction ? /*#__PURE__*/_react["default"].createElement(this._quickCallActionView.component, null) : null;
    }
  }, {
    key: "IncomingCallList",
    value: function IncomingCallList() {
      var _this8 = this;
      var _useConnector3 = (0, _nextCore.useConnector)(function () {
          return {
            ringingCallInfoList: _this8._callAction.ringingCallInfoList
          };
        }),
        ringingCallInfoList = _useConnector3.ringingCallInfoList;
      return /*#__PURE__*/_react["default"].createElement(_components.AppMainContent, null, ringingCallInfoList.map(function (info) {
        return /*#__PURE__*/_react["default"].createElement(_this8.CallItem, _extends({
          key: info.call.telephonySessionId
        }, info));
      }));
    }
  }, {
    key: "component",
    value: function component() {
      var _this9 = this;
      var view = (0, _nextCore.useConnector)(function () {
        return _this9._callViewState.view;
      });
      var activeRenderCallInfo = (0, _services2.useActiveCallInfoWithPreinsert)(this._callAction);
      var modeView = (0, _react.useMemo)(function () {
        switch (view) {
          case 'callList':
            return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(_this9._activeCallsView.component, null));
          case 'addCall':
            return /*#__PURE__*/_react["default"].createElement(FullWrapper, null, /*#__PURE__*/_react["default"].createElement(_this9._addCallView.component, null));
          case 'activeCall':
            {
              // only show active call when not ringing call, ringing call will show in the ringing call list
              var notRingingCall = activeRenderCallInfo && !(0, _services2.isRingingCall)(activeRenderCallInfo.call);
              if (notRingingCall) {
                return /*#__PURE__*/_react["default"].createElement(_this9.CallItem, activeRenderCallInfo);
              }
              _this9.logger.error('wrong view', {
                view: view,
                activeRenderCallInfo: activeRenderCallInfo
              });
              return null;
            }
          case 'postCall':
          case 'hidden':
            return null;
          default:
            _this9.logger.error('wrong view', {
              view: view
            });
            return null;
        }
      }, [activeRenderCallInfo, view]);
      return /*#__PURE__*/_react["default"].createElement(_components.AppMainContent, null, modeView, /*#__PURE__*/_react["default"].createElement(this.CallLogArea, null));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "closedOtherTelephonySessionId", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setClosedOtherTelephonySessionId", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setClosedOtherTelephonySessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setClosedOtherTelephonySessionId", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setClosedOtherTelephonySessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showQuickCallAction", [_nextCore.computed, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "showQuickCallAction"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_smartNotes", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_smartNotesView", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "processNewCall", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "processNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "processExpandedCall", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "processExpandedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableSmartNote", [_nextCore.computed, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "enableSmartNote"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "CallDetailForm", [_nextCore.autobind, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "CallDetailForm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "CallLogArea", [_nextCore.autobind, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "CallLogArea"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "CallItem", [_nextCore.autobind, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "CallItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Announcement", [_nextCore.autobind, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "Announcement"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "IncomingCallList", [_nextCore.autobind, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "IncomingCallList"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Call.view.js.map
