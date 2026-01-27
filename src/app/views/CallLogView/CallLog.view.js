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
exports.CallLogView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _CallLogPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/CallLogPanel"));
var _react = _interopRequireWildcard(require("react"));
var _services3 = require("../../services");
var _CallLogCallCtrlView = require("../CallLogCallCtrlView");
var _CallLogSection = require("../CallLogSection");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var CallLogView = exports.CallLogView = (_dec = (0, _nextCore.injectable)({
  name: 'CallLogView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('CallLogViewOptions')(target, undefined, 14);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 15);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services3.CallLogger === "undefined" ? Object : _services3.CallLogger, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.DateTimeFormat === "undefined" ? Object : _services2.DateTimeFormat, typeof _CallLogSection.CallLogSection === "undefined" ? Object : _CallLogSection.CallLogSection, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services3.ActiveCallControl === "undefined" ? Object : _services3.ActiveCallControl, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services3.CallingSettings === "undefined" ? Object : _services3.CallingSettings, typeof _services3.ForwardingNumber === "undefined" ? Object : _services3.ForwardingNumber, typeof _services3.CallMonitor === "undefined" ? Object : _services3.CallMonitor, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof CallLogViewOptions === "undefined" ? Object : CallLogViewOptions, typeof _CallLogCallCtrlView.CallLogCallCtrlView === "undefined" ? Object : _CallLogCallCtrlView.CallLogCallCtrlView]), _dec6 = (0, _services.track)(_trackEvents.trackEvents.transferSwitchOnholdCall), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = (0, _services.track)(_trackEvents.trackEvents.clickParticipantsIcon), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = (0, _services.track)(_trackEvents.trackEvents.clickRemoveParticipant), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallLogView(_locale, _callLogger, _rateLimiter, _regionSettings, _dateTimeFormat, _callLogSection, _router, _activeCallControl, _appFeatures, _connectivityMonitor, _callingSettings, _forwardingNumber, _callMonitor, _accountInfo, _callLogViewOptions, _callLogCallCtrlView) {
    var _this;
    _classCallCheck(this, CallLogView);
    _this = _callSuper(this, CallLogView);
    _this._locale = _locale;
    _this._callLogger = _callLogger;
    _this._rateLimiter = _rateLimiter;
    _this._regionSettings = _regionSettings;
    _this._dateTimeFormat = _dateTimeFormat;
    _this._callLogSection = _callLogSection;
    _this._router = _router;
    _this._activeCallControl = _activeCallControl;
    _this._appFeatures = _appFeatures;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._callingSettings = _callingSettings;
    _this._forwardingNumber = _forwardingNumber;
    _this._callMonitor = _callMonitor;
    _this._accountInfo = _accountInfo;
    _this._callLogViewOptions = _callLogViewOptions;
    _this._callLogCallCtrlView = _callLogCallCtrlView;
    return _this;
  }
  _inherits(CallLogView, _RcViewModule);
  return _createClass(CallLogView, [{
    key: "trackSwitchWarmTransferSession",
    value: function trackSwitchWarmTransferSession() {
      //
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      var _this$_callLogSection = this._callLogSection,
        currentNotificationIdentify = _this$_callLogSection.currentNotificationIdentify,
        currentIdentify = _this$_callLogSection.currentIdentify,
        warmTransferActiveTelephonySessionId = _this$_callLogSection.warmTransferActiveTelephonySessionId;
      var isInTransferPage = this._router.currentPath.match('^/transfer/|/addCall');
      return {
        currentLocale: this._locale.currentLocale,
        header: true,
        showSpinner: !(this._locale.ready && this._regionSettings.ready && this._dateTimeFormat.ready && this._appFeatures.ready && (!this._callLogger || this._callLogger.ready)),
        isInTransferPage: isInTransferPage,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.restricted,
        currentIdentify: currentIdentify,
        // notification props
        currentNotificationIdentify: currentNotificationIdentify,
        currentSession: this._activeCallControl.getActiveSession(this._activeCallControl.sessionIdToTelephonySessionIdMapping[currentNotificationIdentify]),
        activeSession: this._callMonitor.currDeviceHasActiveCalls,
        isWebRTC: this._callingSettings.callWith === _services3.callingOptions.browser,
        forwardingNumbers: this._forwardingNumber.forwardingNumbers,
        warmTransferActiveTelephonySessionId: warmTransferActiveTelephonySessionId
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength
          }) || (0, _i18n.t)('unknown');
        },
        goBack: function goBack() {
          _this2._callLogSection.closeLogSection();
          _this2._callLogSection.closeLogNotification();
          // trigger rerender log icon after edit log and back to call history
          _this2._router.replace(_this2._router.currentPath);
        },
        renderCallLogCallControl: function renderCallLogCallControl(telephonySessionId, isWide, enableReply, isCurrentDeviceCall, warmTransferActiveTelephonySessionId) {
          return _this2._callLogCallCtrlView ? /*#__PURE__*/_react["default"].createElement(_this2._callLogCallCtrlView.component, {
            currentLocale: _this2._locale.currentLocale,
            telephonySessionId: telephonySessionId,
            isCurrentDeviceCall: isCurrentDeviceCall,
            warmTransferActiveTelephonySessionId: warmTransferActiveTelephonySessionId,
            isWide: isWide,
            enableReply: enableReply
          }) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
        },
        // notification props
        onSaveNotification: function onSaveNotification() {
          return _this2._callLogSection.saveAndHandleNotification();
        },
        onDiscardNotification: function onDiscardNotification() {
          return _this2._callLogSection.discardAndHandleNotification();
        },
        onCloseNotification: function onCloseNotification() {
          return _this2._callLogSection.closeLogNotification();
        },
        onExpandNotification: function onExpandNotification() {
          return _this2._callLogSection.expandLogNotification();
        },
        onSwitchWarmTransferSession: function onSwitchWarmTransferSession() {
          _this2.trackSwitchWarmTransferSession();
          var _this2$_callLogSectio = _this2._callLogSection,
            currentCall = _this2$_callLogSectio.currentCall,
            currentWarmTransferCall = _this2$_callLogSectio.currentWarmTransferCall,
            warmTransferActiveTelephonySessionId = _this2$_callLogSectio.warmTransferActiveTelephonySessionId;
          if (!currentCall || !currentWarmTransferCall) return;
          var isTransferCallActive = (currentWarmTransferCall === null || currentWarmTransferCall === void 0 ? void 0 : currentWarmTransferCall.telephonySessionId) === warmTransferActiveTelephonySessionId;
          var activeCall = isTransferCallActive ? currentWarmTransferCall : currentCall;
          var subCall = isTransferCallActive ? currentCall : currentWarmTransferCall;
          var isActiveCallOnHold = (0, _callLogHelpers.isOnHold)(activeCall);
          if (isActiveCallOnHold) {
            _this2._callLogSection.setWarmTransferCallActiveId(subCall.telephonySessionId);
            return;
          }
          return _this2._activeCallControl.unhold(subCall.telephonySessionId);
        },
        onReject: function onReject(sessionId) {
          var telephonySessionId = _this2._activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
          return _this2._activeCallControl.reject(telephonySessionId);
        },
        onHangup: function onHangup(sessionId) {
          var telephonySessionId = _this2._activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
          return _this2._activeCallControl.hangUp(telephonySessionId);
        },
        onIgnore: function onIgnore(telephonySessionId) {
          var _this2$_activeCallCon, _this2$_activeCallCon2;
          (_this2$_activeCallCon = (_this2$_activeCallCon2 = _this2._activeCallControl).ignore) === null || _this2$_activeCallCon === void 0 ? void 0 : _this2$_activeCallCon.call(_this2$_activeCallCon2, telephonySessionId);
          _this2._callLogSection.closeLogNotification();
        },
        onForward: function onForward(phoneNumber, telephonySessionId) {
          if (phoneNumber === 'custom') {
            _this2._router.push("/forward/".concat(telephonySessionId));
          } else {
            var _this2$_activeCallCon3, _this2$_activeCallCon4;
            (_this2$_activeCallCon3 = (_this2$_activeCallCon4 = _this2._activeCallControl).forward) === null || _this2$_activeCallCon3 === void 0 ? void 0 : _this2$_activeCallCon3.call(_this2$_activeCallCon4, phoneNumber, telephonySessionId);
            _this2._callLogSection.closeLogNotification();
          }
        },
        reply: function reply(telephonySessionId) {
          _this2._router.push("/replyWithMessage/".concat(telephonySessionId, "/active"));
        },
        endAndAnswer: function endAndAnswer(telephonySessionId) {
          var _this2$_activeCallCon5, _this2$_activeCallCon6;
          (_this2$_activeCallCon5 = (_this2$_activeCallCon6 = _this2._activeCallControl).answerAndEnd) === null || _this2$_activeCallCon5 === void 0 ? void 0 : _this2$_activeCallCon5.call(_this2$_activeCallCon6, telephonySessionId);
          _this2._callLogSection.discardAndHandleNotification();
        },
        holdAndAnswer: function holdAndAnswer(telephonySessionId) {
          var _this2$_activeCallCon7, _this2$_activeCallCon8;
          (_this2$_activeCallCon7 = (_this2$_activeCallCon8 = _this2._activeCallControl).answerAndHold) === null || _this2$_activeCallCon7 === void 0 ? void 0 : _this2$_activeCallCon7.call(_this2$_activeCallCon8, telephonySessionId);
          _this2._callLogSection.discardAndHandleNotification();
        },
        toVoicemail: function toVoicemail(telephonySessionId) {
          _this2._activeCallControl.reject(telephonySessionId);
          _this2._callLogSection.closeLogNotification();
        },
        answer: function answer(telephonySessionId) {
          var _this2$_activeCallCon9, _this2$_activeCallCon0;
          (_this2$_activeCallCon9 = (_this2$_activeCallCon0 = _this2._activeCallControl).answer) === null || _this2$_activeCallCon9 === void 0 ? void 0 : _this2$_activeCallCon9.call(_this2$_activeCallCon0, telephonySessionId);
          _this2._callLogSection.discardAndHandleNotification();
        },
        onRemoveParticipant: function onRemoveParticipant(telephonySessionId, partyId) {
          var _this2$_activeCallCon1, _this2$_activeCallCon10;
          return (_this2$_activeCallCon1 = (_this2$_activeCallCon10 = _this2._activeCallControl).removeConferenceParticipant) === null || _this2$_activeCallCon1 === void 0 ? void 0 : _this2$_activeCallCon1.call(_this2$_activeCallCon10, telephonySessionId, partyId);
        },
        clickForwardTrack: function clickForwardTrack() {
          var _this2$_activeCallCon11, _this2$_activeCallCon12;
          return (_this2$_activeCallCon11 = (_this2$_activeCallCon12 = _this2._activeCallControl).clickForwardTrack) === null || _this2$_activeCallCon11 === void 0 ? void 0 : _this2$_activeCallCon11.call(_this2$_activeCallCon12);
        },
        clickParticipantsIconTrack: function clickParticipantsIconTrack() {
          return _this2.clickParticipantsIconTrack();
        },
        clickRemoveParticipantTrack: function clickRemoveParticipantTrack() {
          return _this2.clickRemoveParticipantTrack();
        },
        openEntityDetailLinkTrack: function openEntityDetailLinkTrack(path) {
          var _this2$_activeCallCon13, _this2$_activeCallCon14;
          return (_this2$_activeCallCon13 = (_this2$_activeCallCon14 = _this2._activeCallControl).openEntityDetailLinkTrack) === null || _this2$_activeCallCon13 === void 0 ? void 0 : _this2$_activeCallCon13.call(_this2$_activeCallCon14, path);
        }
      };
    }
  }, {
    key: "clickParticipantsIconTrack",
    value: function clickParticipantsIconTrack() {
      //
    }
  }, {
    key: "clickRemoveParticipantTrack",
    value: function clickRemoveParticipantTrack() {
      //
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_callLogViewOpt;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_callLogViewOpt = this._callLogViewOptions) === null || _this$_callLogViewOpt === void 0 ? void 0 : _this$_callLogViewOpt.component) || _CallLogPanel["default"];
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "trackSwitchWarmTransferSession", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "trackSwitchWarmTransferSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickParticipantsIconTrack", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "clickParticipantsIconTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickRemoveParticipantTrack", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "clickRemoveParticipantTrack"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallLog.view.js.map
