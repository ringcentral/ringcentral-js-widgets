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
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
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
exports.CallControlUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _sessionStatus = require("@ringcentral-integration/commons/modules/Webphone/sessionStatus");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _CallControlUI2 = require("./CallControlUI.interface");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var CallControlUI = exports.CallControlUI = (_dec = (0, _di.Module)({
  name: 'CallControlUI',
  deps: ['Webphone', 'Locale', 'ContactMatcher', 'RegionSettings', 'Brand', 'ContactSearch', 'CallingSettings', 'ConnectivityManager', 'ForwardingNumber', 'CallMonitor', 'ExtensionInfo', 'AppFeatures', 'AccountInfo', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.currentSessionId, that._deps.webphone.sessions, that._deps.webphone.activeSession];
}), _dec3 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa;
  return [(_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, that.currentSession.from];
}), _dec4 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa2;
  return [(_that$_deps$contactMa2 = that._deps.contactMatcher) === null || _that$_deps$contactMa2 === void 0 ? void 0 : _that$_deps$contactMa2.dataMapping, that.currentSession.to];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function CallControlUI(deps) {
    var _this;
    _classCallCheck(this, CallControlUI);
    _this = _callSuper(this, CallControlUI, [{
      deps: deps
    }]);
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    _this.currentSessionId = null;
    _this.getInitialLayout = function (_ref) {
      var conferenceCallEquipped = _ref.conferenceCallEquipped,
        isOnConference = _ref.isOnConference,
        lastCallInfo = _ref.lastCallInfo,
        session = _ref.session;
      var layout = _callCtrlLayouts["default"].normalCtrl;
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (session.warmTransferSessionId) {
        return _callCtrlLayouts["default"].completeTransferCtrl;
      }
      if (!conferenceCallEquipped) {
        return layout;
      }
      if (isOnConference) {
        return _callCtrlLayouts["default"].conferenceCtrl;
      }
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var isInboundCall = session.direction === _callDirections["default"].inbound;

      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var fromSessionId = _this._deps.conferenceCall.mergingPair.fromSessionId;
      var fromSession = (0, _ramda.find)(function (x) {
        return x.id === fromSessionId;
      }, _this._deps.webphone.sessions);
      var activeSessionId = _this._deps.webphone && _this._deps.webphone.activeSession && _this._deps.webphone.activeSession.id;
      if (!isOnConference && !isInboundCall && fromSession &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      fromSessionId !== session.id && lastCallInfo && (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.callStatus !== _sessionStatus.sessionStatus.onHold ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.callStatus === _sessionStatus.sessionStatus.onHold &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.id === activeSessionId)) {
        // enter merge ctrl page.
        layout = _callCtrlLayouts["default"].mergeCtrl;
      }
      return layout;
    };
    return _this;
  }
  _inherits(CallControlUI, _RcUIModuleV);
  return _createClass(CallControlUI, [{
    key: "currentSession",
    get: function get() {
      var _this2 = this;
      return (this.currentSessionId ? (0, _ramda.find)(function (session) {
        return session.id === _this2.currentSessionId;
      }, this._deps.webphone.sessions) : this._deps.webphone.activeSession) || {};
    }
  }, {
    key: "fromMatches",
    get: function get() {
      var _this$_deps$contactMa, _this$_deps$contactMa2, _this$_deps$contactMa3;
      return (_this$_deps$contactMa = (_this$_deps$contactMa2 = this._deps.contactMatcher) === null || _this$_deps$contactMa2 === void 0 ? void 0 : (_this$_deps$contactMa3 = _this$_deps$contactMa2.dataMapping) === null || _this$_deps$contactMa3 === void 0 ? void 0 : _this$_deps$contactMa3[this.currentSession.from]) !== null && _this$_deps$contactMa !== void 0 ? _this$_deps$contactMa : [];
    }
  }, {
    key: "toMatches",
    get: function get() {
      var _this$_deps$contactMa4, _this$_deps$contactMa5, _this$_deps$contactMa6;
      return (_this$_deps$contactMa4 = (_this$_deps$contactMa5 = this._deps.contactMatcher) === null || _this$_deps$contactMa5 === void 0 ? void 0 : (_this$_deps$contactMa6 = _this$_deps$contactMa5.dataMapping) === null || _this$_deps$contactMa6 === void 0 ? void 0 : _this$_deps$contactMa6[this.currentSession.to]) !== null && _this$_deps$contactMa4 !== void 0 ? _this$_deps$contactMa4 : [];
    }
  }, {
    key: "callerIdName",
    get: function get() {
      return (0, _callLogHelpers.getWebphoneSessionDisplayName)(this.currentSession);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_deps$conferenc,
        _this$_deps$conferenc2,
        _this$_deps$conferenc3,
        _this$_deps$conferenc4,
        _this3 = this;
      var params = _ref2.params,
        _ref2$showCallQueueNa = _ref2.showCallQueueName,
        showCallQueueName = _ref2$showCallQueueNa === void 0 ? false : _ref2$showCallQueueNa,
        _ref2$showCallerIdNam = _ref2.showCallerIdName,
        showCallerIdName = _ref2$showCallerIdNam === void 0 ? false : _ref2$showCallerIdNam,
        _ref2$showPark = _ref2.showPark,
        showPark = _ref2$showPark === void 0 ? false : _ref2$showPark,
        children = _ref2.children;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      this.currentSessionId = params === null || params === void 0 ? void 0 : params.sessionId;
      var nameMatches = this.currentSession.direction === _callDirections["default"].outbound ? this.toMatches : this.fromMatches;
      var isWebRTC = this._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;
      var isInboundCall = this.currentSession.direction === _callDirections["default"].inbound;
      var lastCallInfo = (_this$_deps$conferenc = this._deps.conferenceCall) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.lastCallInfo;
      var conferenceCallEquipped = (_this$_deps$conferenc2 = (_this$_deps$conferenc3 = this._deps.conferenceCall) === null || _this$_deps$conferenc3 === void 0 ? void 0 : _this$_deps$conferenc3.hasPermission) !== null && _this$_deps$conferenc2 !== void 0 ? _this$_deps$conferenc2 : false;
      var conferenceData = conferenceCallEquipped ?
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (0, _ramda.values)(this._deps.conferenceCall.conferences)[0] : undefined;
      var isOnConference = conferenceCallEquipped ?
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.conferenceCall.isConferenceSession(this.currentSession.id) : false;
      var isMerging =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      conferenceCallEquipped && this._deps.conferenceCall.isMerging;
      var conferenceCallId = conferenceData && isWebRTC ? conferenceData.conference.id : null;
      var isConferenceCallOverload = conferenceData && isWebRTC ?
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.conferenceCall.isOverload(conferenceCallId) : false;
      var hasConferenceCall = !!conferenceData;
      var conferenceCallParties = conferenceCallEquipped ?
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.conferenceCall.partyProfiles : undefined;

      // TODO: investigate whether this can simply use isMerging
      var fromSessionId = conferenceCallEquipped ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (_this$_deps$conferenc4 = this._deps.conferenceCall.mergingPair) === null || _this$_deps$conferenc4 === void 0 ? void 0 : _this$_deps$conferenc4.fromSessionId : undefined;
      var hideChildren = conferenceCallEquipped && !isInboundCall && fromSessionId && fromSessionId !== this.currentSession.id && lastCallInfo && lastCallInfo.status !== _sessionStatus.sessionStatus.finished;
      if (this.currentSession.warmTransferSessionId) {
        var warmTransferSession = this._deps.webphone.sessions.find(function (session) {
          return session.id === _this3.currentSession.warmTransferSessionId;
        });
        lastCallInfo = (0, _CallControlUI2.getLastCallInfoFromWebphoneSession)(warmTransferSession, this._deps.contactMatcher.dataMapping);
      }
      var disableLinks = !!(this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isVoipOnlyMode);
      var phoneNumber = this.currentSession.direction === _callDirections["default"].outbound ? this.currentSession.to : this.currentSession.from;
      if (this._deps.appFeatures.isCDCEnabled && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, nameMatches)) {
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
        phoneNumber = null;
      }
      return {
        brand: this._deps.brand.name,
        nameMatches: nameMatches,
        phoneNumber: phoneNumber,
        currentLocale: this._deps.locale.currentLocale,
        session: this.currentSession,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        showBackButton: true,
        // callMonitor.calls.length > 0,
        searchContactList: this._deps.contactSearch.sortedResult,
        showSpinner: isMerging,
        conferenceCallEquipped: conferenceCallEquipped,
        hasConferenceCall: hasConferenceCall,
        conferenceCallParties: conferenceCallParties,
        conferenceCallId: conferenceCallId,
        lastCallInfo: lastCallInfo,
        showCallerIdName: showCallerIdName,
        callerIdName: showCallerIdName ? this.callerIdName : undefined,
        // TODO: investigate whether it's better to just
        // use isMerging and let the component decide whether to display children
        children: hideChildren ? null : children,
        isOnConference: isOnConference,
        isWebRTC: isWebRTC,
        disableLinks: disableLinks,
        isConferenceCallOverload: isConferenceCallOverload,
        disableFlip: this._deps.forwardingNumber.flipNumbers.length === 0,
        showCallQueueName: showCallQueueName,
        showPark: showPark,
        controlBusy: this.currentSession.callStatus === _sessionStatus.sessionStatus.setup
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this4 = this;
      var getAvatarUrl = _ref3.getAvatarUrl,
        onBackButtonClick = _ref3.onBackButtonClick,
        phoneTypeRenderer = _ref3.phoneTypeRenderer,
        phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer;
      return {
        getInitialLayout: this.getInitialLayout,
        formatPhone: function formatPhone(phoneNumber) {
          var _this4$_deps$extensio, _this4$_deps$extensio2, _this4$_deps$extensio3;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this4._deps.regionSettings.areaCode,
            countryCode: _this4._deps.regionSettings.countryCode,
            siteCode: (_this4$_deps$extensio = (_this4$_deps$extensio2 = _this4._deps.extensionInfo) === null || _this4$_deps$extensio2 === void 0 ? void 0 : (_this4$_deps$extensio3 = _this4$_deps$extensio2.site) === null || _this4$_deps$extensio3 === void 0 ? void 0 : _this4$_deps$extensio3.code) !== null && _this4$_deps$extensio !== void 0 ? _this4$_deps$extensio : '',
            isMultipleSiteEnabled: _this4._deps.extensionInfo.isMultipleSiteEnabled,
            maxExtensionLength: _this4._deps.accountInfo.maxExtensionNumberLength,
            isEDPEnabled: _this4._deps.appFeatures.isEDPEnabled
          });
        },
        onHangup: function onHangup(sessionId, layout) {
          _this4._deps.webphone.hangup(sessionId);
          if (layout && layout === _callCtrlLayouts["default"].mergeCtrl) {
            _this4._deps.callMonitor.mergeControlClickHangupTrack();
          }
        },
        onMute: function onMute(sessionId) {
          return _this4._deps.webphone.mute(sessionId);
        },
        onUnmute: function onUnmute(sessionId) {
          return _this4._deps.webphone.unmute(sessionId);
        },
        onHold: function onHold(sessionId) {
          return _this4._deps.webphone.hold(sessionId);
        },
        onUnhold: function onUnhold(sessionId) {
          _this4._deps.webphone.unhold(sessionId);
        },
        onRecord: function onRecord(sessionId) {
          return _this4._deps.webphone.startRecord(sessionId);
        },
        onStopRecord: function onStopRecord(sessionId) {
          return _this4._deps.webphone.stopRecord(sessionId);
        },
        sendDTMF: function sendDTMF() {
          var _this4$_deps$webphone;
          return (_this4$_deps$webphone = _this4._deps.webphone).sendDTMF.apply(_this4$_deps$webphone, arguments);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact() {
          var _this4$_deps$webphone2;
          return (_this4$_deps$webphone2 = _this4._deps.webphone).updateSessionMatchedContact.apply(_this4$_deps$webphone2, arguments);
        },
        getAvatarUrl: getAvatarUrl,
        onBackButtonClick: onBackButtonClick,
        onFlip: function onFlip(sessionId) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          _this4._deps.routerInteraction.push("/flip/".concat(sessionId));
        },
        onTransfer: function onTransfer(sessionId) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          _this4._deps.routerInteraction.push("/transfer/".concat(sessionId, "/webphone"));
        },
        onCompleteTransfer: function onCompleteTransfer(sessionId) {
          _this4._deps.webphone.completeWarmTransfer(sessionId);
        },
        onPark: function onPark(sessionId) {
          return _this4._deps.webphone.park(sessionId);
        },
        searchContact: function searchContact(searchString) {
          return _this4._deps.contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        onAdd: function onAdd(sessionId) {
          // track user click add on call control
          _this4._deps.callMonitor.callControlClickAddTrack();
          var session = (0, _ramda.find)(function (x) {
            return x.id === sessionId;
          }, _this4._deps.webphone.sessions);
          if (!session ||
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          !_this4._deps.conferenceCall.validateCallRecording(session)) {
            return;
          }
          var fromNumber = _this4._deps.callingSettings.fromNumber;
          if (session.direction === _callDirections["default"].outbound) {
            fromNumber = session.fromNumber; // keep the same fromNumber
          }
          var otherCalls = (0, _ramda.filter)(function (call) {
            return call.webphoneSession && call.webphoneSession.id !== session.id;
          }, _this4._deps.callMonitor.allCalls);
          if (otherCalls.length) {
            // goto 'calls on hold' page
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this4._deps.routerInteraction.push("/conferenceCall/callsOnhold/".concat(fromNumber, "/").concat(session.id));
          } else {
            if (_this4._deps.conferenceCall) {
              _this4._deps.conferenceCall.setMergeParty({
                fromSessionId: sessionId
              });
            }
            // goto dialer directly
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this4._deps.routerInteraction.push("/conferenceCall/dialer/".concat(fromNumber, "/").concat(sessionId));
          }
        },
        onBeforeMerge: function onBeforeMerge(sessionId) {
          var session = (0, _ramda.find)(function (x) {
            return x.id === sessionId;
          }, _this4._deps.webphone.sessions);
          if (!session ||
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          !_this4._deps.conferenceCall.validateCallRecording(session)) {
            return false;
          }
          if (_this4._deps.conferenceCall) {
            var conferenceData = Object.values(_this4._deps.conferenceCall.conferences)[0];
            if (conferenceData) {
              var conferenceSession = (0, _ramda.find)(function (x) {
                return x.id === conferenceData.sessionId;
              }, _this4._deps.webphone.sessions);
              if (conferenceSession && !_this4._deps.conferenceCall.validateCallRecording(conferenceSession)) {
                return false;
              }
            }
          }
          return true;
        },
        onMerge: function () {
          var _onMerge = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sessionId) {
            var sessions;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return _this4._deps.conferenceCall.parseMergingSessions({
                    sessionId: sessionId
                  });
                case 1:
                  sessions = _context.v;
                  if (!sessions) {
                    _context.n = 2;
                    break;
                  }
                  _context.n = 2;
                  return _this4._deps.conferenceCall.mergeSessions(sessions);
                case 2:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function onMerge(_x) {
            return _onMerge.apply(this, arguments);
          }
          return onMerge;
        }(),
        gotoParticipantsCtrl: function gotoParticipantsCtrl() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          _this4._deps.routerInteraction.push('/conferenceCall/participants');
          // track user click participant area on call control
          _this4._deps.callMonitor.callControlClickParticipantAreaTrack();
        },
        loadConference: function loadConference(conferenceId) {
          if (_this4._deps.conferenceCall) {
            _this4._deps.conferenceCall.loadConference(conferenceId);
          }
        },
        closeMergingPair: function closeMergingPair() {
          return _this4._deps.conferenceCall && _this4._deps.conferenceCall.closeMergingPair();
        },
        setMergeParty: function setMergeParty() {
          var _this4$_deps$conferen;
          return _this4._deps.conferenceCall && (_this4$_deps$conferen = _this4._deps.conferenceCall).setMergeParty.apply(_this4$_deps$conferen, arguments);
        },
        // user action track functions
        afterHideMergeConfirm: function afterHideMergeConfirm() {
          return _this4._deps.callMonitor.confirmMergeClickCloseTrack();
        },
        afterConfirmMerge: function afterConfirmMerge() {
          return _this4._deps.callMonitor.confirmMergeClickMergeTrack();
        },
        afterOnMerge: function afterOnMerge() {
          return _this4._deps.callMonitor.callControlClickMergeTrack();
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "currentSession", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromMatches", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "fromMatches"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toMatches", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "toMatches"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=CallControlUI.js.map
