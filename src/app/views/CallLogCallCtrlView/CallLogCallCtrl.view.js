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
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _CallLogCallCtrlPanel = require("@ringcentral-integration/widgets/components/CallLogCallCtrlPanel");
var _react = _interopRequireDefault(require("react"));
var _services2 = require("../../services");
var _MergeCallConfirmView = require("../MergeCallConfirmView");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var CallLogCallCtrlView = exports.CallLogCallCtrlView = (_dec = (0, _nextCore.injectable)({
  name: 'CallLogCallCtrlView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('CallLogCallCtrlViewOptions')(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.ActiveCallControl === "undefined" ? Object : _services2.ActiveCallControl, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.CallingSettings === "undefined" ? Object : _services2.CallingSettings, typeof _services2.ForwardingNumber === "undefined" ? Object : _services2.ForwardingNumber, typeof _services2.CallMonitor === "undefined" ? Object : _services2.CallMonitor, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof CallLogCallCtrlViewOptions === "undefined" ? Object : CallLogCallCtrlViewOptions, typeof _MergeCallConfirmView.MergeCallConfirmView === "undefined" ? Object : _MergeCallConfirmView.MergeCallConfirmView]), _dec6 = (0, _services.track)(_trackEvents.trackEvents.completeWarmTransfer), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallLogCallCtrlView(_activeCallControl, _connectivityMonitor, _rateLimiter, _router, _callingSettings, _forwardingNumber, _callMonitor, _extensionFeatures, _callLogCallCtrlViewOptions, _mergeCallConfirmView) {
    var _this;
    _classCallCheck(this, CallLogCallCtrlView);
    _this = _callSuper(this, CallLogCallCtrlView);
    _this._activeCallControl = _activeCallControl;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._rateLimiter = _rateLimiter;
    _this._router = _router;
    _this._callingSettings = _callingSettings;
    _this._forwardingNumber = _forwardingNumber;
    _this._callMonitor = _callMonitor;
    _this._extensionFeatures = _extensionFeatures;
    _this._callLogCallCtrlViewOptions = _callLogCallCtrlViewOptions;
    _this._mergeCallConfirmView = _mergeCallConfirmView;
    _this._onTransfer = function (telephonySessionId) {
      _this._activeCallControl.clickTransferTrack();
      return _this._router.push("/transfer/".concat(telephonySessionId, "/active"));
    };
    return _this;
  }
  _inherits(CallLogCallCtrlView, _RcViewModule);
  return _createClass(CallLogCallCtrlView, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_activeCallCont, _this$_activeCallCont2, _this$_activeCallCont3, _this$_activeCallCont4, _this$_activeCallCont5, _this$_activeCallCont6, _this$_callLogCallCtr;
      var telephonySessionId = _ref.telephonySessionId;
      var isWebphone = this._callingSettings.callingMode === _services2.callingModes.webphone;
      var currentSession = this._activeCallControl.getActiveSession(telephonySessionId);
      // we can get real callee call status from telephony session
      var realOutboundCallStatus = (_this$_activeCallCont = this._activeCallControl) === null || _this$_activeCallCont === void 0 ? void 0 : (_this$_activeCallCont2 = _this$_activeCallCont.getSession(telephonySessionId)) === null || _this$_activeCallCont2 === void 0 ? void 0 : (_this$_activeCallCont3 = _this$_activeCallCont2.otherParties[0]) === null || _this$_activeCallCont3 === void 0 ? void 0 : (_this$_activeCallCont4 = _this$_activeCallCont3.status) === null || _this$_activeCallCont4 === void 0 ? void 0 : _this$_activeCallCont4.code;
      var _this$_callMonitor = this._callMonitor,
        activeOnHoldCalls = _this$_callMonitor.activeOnHoldCalls,
        activeCurrentCalls = _this$_callMonitor.activeCurrentCalls;
      var controlBusy = ((_this$_activeCallCont5 = this._activeCallControl) === null || _this$_activeCallCont5 === void 0 ? void 0 : _this$_activeCallCont5.busy) || false;
      var otherActiveCalls = currentSession && !!activeOnHoldCalls.concat(activeCurrentCalls).filter(function (call) {
        return call.sessionId !== currentSession.sessionId;
      }).length;
      var isEnablePickup = !!this._activeCallControl.pickUpCallDataMap[telephonySessionId];
      var allowPickupCall = isEnablePickup && isWebphone;
      var isCurrentCall = this._callMonitor.activeCurrentCallTelephonySessionId === telephonySessionId;
      var isCallQueueCall = !!((_this$_activeCallCont6 = this._activeCallControl.getSession(telephonySessionId)) === null || _this$_activeCallCont6 === void 0 ? void 0 : _this$_activeCallCont6.callQueueName);
      return {
        isWebphone: isWebphone,
        currentSession: currentSession,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.restricted || controlBusy,
        telephonySessionId: telephonySessionId,
        forwardingNumbers: this._forwardingNumber.forwardingNumbers,
        otherActiveCalls: otherActiveCalls,
        realOutboundCallStatus: realOutboundCallStatus,
        allowPickupCall: allowPickupCall,
        showConferenceCall: (_this$_callLogCallCtr = this._callLogCallCtrlViewOptions) === null || _this$_callLogCallCtr === void 0 ? void 0 : _this$_callLogCallCtr.showConferenceCall,
        isCurrentCall: isCurrentCall,
        isCallQueueCall: isCallQueueCall
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
      var telephonySessionId = _ref2.telephonySessionId;
      return {
        mute: this._activeCallControl.mute.bind(this._activeCallControl),
        unmute: this._activeCallControl.unmute.bind(this._activeCallControl),
        hangUp: this._activeCallControl.hangUp.bind(this._activeCallControl),
        reject: this._activeCallControl.reject.bind(this._activeCallControl),
        onHold: this._activeCallControl.hold.bind(this._activeCallControl),
        onUnHold: this._activeCallControl.unhold.bind(this._activeCallControl),
        startRecord: this._activeCallControl.startRecord.bind(this._activeCallControl),
        stopRecord: this._activeCallControl.stopRecord.bind(this._activeCallControl),
        onCompleteWarmTransfer: function onCompleteWarmTransfer(telephonySession) {
          _this2.completeWarmTransferTrack();
          return _this2._activeCallControl.completeWarmTransfer(telephonySession);
        },
        onTransfer: this._onTransfer,
        onAddCall: function () {
          var _onAddCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _this2._router.push("/addCall");
                case 1:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function onAddCall() {
            return _onAddCall.apply(this, arguments);
          }
          return onAddCall;
        }(),
        sendDTMF: function sendDTMF(dtmfValue, telephonySessionId) {
          return _this2._activeCallControl.sendDTMF(dtmfValue, telephonySessionId);
        },
        answer: this._activeCallControl.answer.bind(this._activeCallControl),
        forward: function forward(phoneNumber, telephonySessionId) {
          if (phoneNumber === 'custom') {
            _this2._router.push("/forward/".concat(telephonySessionId));
          } else {
            _this2._activeCallControl.forward.call(_this2._activeCallControl, phoneNumber, telephonySessionId);
          }
        },
        reply: function reply(telephonySessionId) {
          _this2._router.push("/replyWithMessage/".concat(telephonySessionId, "/active"));
        },
        ignore: this._activeCallControl.ignore.bind(this._activeCallControl),
        answerAndHold: this._activeCallControl.answerAndHold.bind(this._activeCallControl),
        answerAndEnd: this._activeCallControl.answerAndEnd.bind(this._activeCallControl),
        dialpadToggleTrack: function dialpadToggleTrack(open) {
          if (open) {
            _this2._activeCallControl.dialpadOpenTrack();
          } else {
            _this2._activeCallControl.dialpadCloseTrack();
          }
        },
        clickForwardTrack: this._activeCallControl.clickForwardTrack.bind(this._activeCallControl),
        onMergeCall: function () {
          var _onMergeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            var _this2$_mergeCallConf;
            var telephonySessionIdToMergeWith, confirmed;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _this2._activeCallControl.clickConferenceCallMerge('Call log page');
                  telephonySessionIdToMergeWith = _this2._callMonitor.activeCurrentCalls[0].telephonySessionId;
                  if (telephonySessionIdToMergeWith) {
                    _context2.n = 1;
                    break;
                  }
                  console.warn('[ActiveCalls.view] No active call to merge.');
                  return _context2.a(2);
                case 1:
                  _context2.n = 2;
                  return (_this2$_mergeCallConf = _this2._mergeCallConfirmView) === null || _this2$_mergeCallConf === void 0 ? void 0 : _this2$_mergeCallConf.confirm({
                    telephonySessionId: telephonySessionId
                    // telephonySessionIdToMergeWith,
                  });
                case 2:
                  confirmed = _context2.v;
                  if (confirmed) {
                    _this2._activeCallControl.mergeCalls(telephonySessionId, telephonySessionIdToMergeWith);
                  }
                case 3:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function onMergeCall() {
            return _onMergeCall.apply(this, arguments);
          }
          return onMergeCall;
        }()
      };
    }
  }, {
    key: "completeWarmTransferTrack",
    value: function completeWarmTransferTrack() {
      //
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_callLogCallCtr2;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        var uiFunctions = _this3.getUIFunctions(props);
        return _objectSpread(_objectSpread(_objectSpread({}, props), uiProps), uiFunctions);
      });
      var Component = ((_this$_callLogCallCtr2 = this._callLogCallCtrlViewOptions) === null || _this$_callLogCallCtr2 === void 0 ? void 0 : _this$_callLogCallCtr2.component) || _CallLogCallCtrlPanel.CallLogCallCtrlPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _props);
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransferTrack", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransferTrack"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallLogCallCtrl.view.js.map
