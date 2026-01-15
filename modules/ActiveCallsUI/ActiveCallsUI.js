"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
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
exports.ActiveCallsUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _ActiveCallControl = require("@ringcentral-integration/commons/modules/ActiveCallControl");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _webphoneHelper = require("@ringcentral-integration/commons/modules/Webphone/webphoneHelper");
var _core = require("@ringcentral-integration/core");
var _react = _interopRequireDefault(require("react"));
var _ActiveCallItemV = require("../../components/ActiveCallItemV2");
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ModalContentRendererID = 'ActiveCallsUI.ModalContentRenderer';
var ActiveCallsUI = exports.ActiveCallsUI = (_dec = (0, _di.Module)({
  name: 'ActiveCallsUI',
  deps: ['Brand', 'Locale', 'CallMonitor', 'RateLimiter', 'ContactSearch', 'RegionSettings', 'ContactMatcher', 'CallingSettings', 'RouterInteraction', 'AppFeatures', 'ConnectivityMonitor', 'AccountInfo', 'ExtensionInfo', {
    dep: 'ModalUI',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'ComposeText',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function ActiveCallsUI(deps) {
    var _this$_deps$modalUI;
    var _this;
    _classCallCheck(this, ActiveCallsUI);
    _this = _callSuper(this, ActiveCallsUI, [{
      deps: deps
    }]);
    _this._defaultOnViewContact = function (options) {
      var _this$_deps$contactDe;
      var _options$contact = options.contact,
        id = _options$contact.id,
        type = _options$contact.type;
      (_this$_deps$contactDe = _this._deps.contactDetailsUI) === null || _this$_deps$contactDe === void 0 ? void 0 : _this$_deps$contactDe.showContactDetails({
        type: type,
        id: id,
        direct: true
      });
    };
    (_this$_deps$modalUI = _this._deps.modalUI) === null || _this$_deps$modalUI === void 0 ? void 0 : _this$_deps$modalUI.registerRenderer(ModalContentRendererID, function (_ref) {
      var currentLocale = _ref.currentLocale,
        contactName = _ref.contactName;
      return /*#__PURE__*/_react["default"].createElement(_ActiveCallItemV.ModalContent, {
        currentLocale: currentLocale,
        contactName: contactName
      });
    });
    return _this;
  }
  _inherits(ActiveCallsUI, _RcUIModuleV);
  return _createClass(ActiveCallsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_deps$activeCal, _this$_deps$conferenc, _this$_deps$webphone, _this$_deps$callLogge;
      var _ref2$showContactDisp = _ref2.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref2$showContactDisp === void 0 ? false : _ref2$showContactDisp,
        _ref2$showRingoutCall = _ref2.showRingoutCallControl,
        showRingoutCallControl = _ref2$showRingoutCall === void 0 ? false : _ref2$showRingoutCall,
        _ref2$showSwitchCall = _ref2.showSwitchCall,
        showSwitchCall = _ref2$showSwitchCall === void 0 ? false : _ref2$showSwitchCall,
        _ref2$showTransferCal = _ref2.showTransferCall,
        showTransferCall = _ref2$showTransferCal === void 0 ? true : _ref2$showTransferCal,
        _ref2$showHoldOnOther = _ref2.showHoldOnOtherDevice,
        showHoldOnOtherDevice = _ref2$showHoldOnOther === void 0 ? false : _ref2$showHoldOnOther,
        _ref2$showCallerIdNam = _ref2.showCallerIdName,
        showCallerIdName = _ref2$showCallerIdNam === void 0 ? false : _ref2$showCallerIdNam,
        useV2 = _ref2.useV2,
        showMergeCall = _ref2.showMergeCall,
        useCallControl = _ref2.useCallControl;
      var isWebRTC = this._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;
      var controlBusy = ((_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.busy) || false;
      return {
        currentLocale: this._deps.locale.currentLocale,
        activeRingCalls: this._deps.callMonitor.activeRingCalls,
        activeOnHoldCalls: this._deps.callMonitor.activeOnHoldCalls,
        activeCurrentCalls: this._deps.callMonitor.activeCurrentCalls,
        otherDeviceCalls: this._deps.callMonitor.otherDeviceCalls,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        showSpinner: !!((_this$_deps$conferenc = this._deps.conferenceCall) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.isMerging),
        brand: this._deps.brand.name,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        showRingoutCallControl: showRingoutCallControl,
        showTransferCall: showTransferCall,
        showHoldOnOtherDevice: showHoldOnOtherDevice,
        showSwitchCall: !!(showSwitchCall && isWebRTC && ((_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.connected)),
        autoLog: !!((_this$_deps$callLogge = this._deps.callLogger) === null || _this$_deps$callLogge === void 0 ? void 0 : _this$_deps$callLogge.autoLog),
        isWebRTC: isWebRTC,
        conferenceCallParties: this._deps.conferenceCall ? this._deps.conferenceCall.partyProfiles : null,
        useV2: useV2,
        showMergeCall: showMergeCall,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling || controlBusy,
        useCallControl: useCallControl,
        isWide: this.isWide,
        allCalls: this._deps.callMonitor.calls,
        showCallerIdName: showCallerIdName
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;
      var _ref3$composeTextRout = _ref3.composeTextRoute,
        composeTextRoute = _ref3$composeTextRout === void 0 ? '/composeText' : _ref3$composeTextRout,
        _ref3$callCtrlRoute = _ref3.callCtrlRoute,
        callCtrlRoute = _ref3$callCtrlRoute === void 0 ? '/calls/active' : _ref3$callCtrlRoute,
        onCreateContact = _ref3.onCreateContact,
        onLogCall = _ref3.onLogCall,
        isLoggedContact = _ref3.isLoggedContact,
        onCallsEmpty = _ref3.onCallsEmpty,
        _ref3$onViewContact = _ref3.onViewContact,
        _onViewContact = _ref3$onViewContact === void 0 ? this._defaultOnViewContact : _ref3$onViewContact,
        _ref3$showViewContact = _ref3.showViewContact,
        showViewContact = _ref3$showViewContact === void 0 ? true : _ref3$showViewContact,
        getAvatarUrl = _ref3.getAvatarUrl,
        useV2 = _ref3.useV2,
        useCallControl = _ref3.useCallControl;
      // Toggle to control if use new call control API, should using the ActiveCallControl module same time,
      // when you set this toggle to true (https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)
      var useActiveCallControl = !!(useCallControl && this._deps.activeCallControl);
      return {
        modalConfirm: function modalConfirm(props) {
          var _this2$_deps$modalUI;
          return (// @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            (_this2$_deps$modalUI = _this2._deps.modalUI) === null || _this2$_deps$modalUI === void 0 ? void 0 : _this2$_deps$modalUI.confirm(_objectSpread(_objectSpread({}, props), {}, {
              content: ModalContentRendererID
            }))
          );
        },
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        modalClose: function modalClose(id) {
          var _this2$_deps$modalUI2;
          return (_this2$_deps$modalUI2 = _this2._deps.modalUI) === null || _this2$_deps$modalUI2 === void 0 ? void 0 : _this2$_deps$modalUI2.close(id);
        },
        formatPhone: function formatPhone(phoneNumber) {
          var _this2$_deps$extensio;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._deps.regionSettings.areaCode,
            countryCode: _this2._deps.regionSettings.countryCode,
            maxExtensionLength: _this2._deps.accountInfo.maxExtensionNumberLength,
            siteCode: (_this2$_deps$extensio = _this2._deps.extensionInfo.site) === null || _this2$_deps$extensio === void 0 ? void 0 : _this2$_deps$extensio.code,
            isMultipleSiteEnabled: _this2._deps.extensionInfo.isMultipleSiteEnabled
          });
        },
        onMergeCall: undefined,
        webphoneAnswer: function () {
          var _webphoneAnswer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sessionId, telephonySessionId) {
            var isHoldAndAnswer,
              session,
              _args = arguments;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  isHoldAndAnswer = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
                  if (!useActiveCallControl) {
                    _context.n = 1;
                    break;
                  }
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  isHoldAndAnswer && _this2._deps.activeCallControl.answerAndHold ?
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  _this2._deps.activeCallControl.answerAndHold(telephonySessionId) :
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  _this2._deps.activeCallControl.answer(telephonySessionId);
                  _context.n = 3;
                  break;
                case 1:
                  if (_this2._deps.webphone) {
                    _context.n = 2;
                    break;
                  }
                  return _context.a(2);
                case 2:
                  session = _this2._deps.webphone.sessions.find(function (session) {
                    return session.id === sessionId;
                  });
                  if (_this2._deps.conferenceCall && session && session.direction === _callDirections["default"].inbound) {
                    _this2._deps.conferenceCall.closeMergingPair();
                  }
                  _this2._deps.webphone.answer(sessionId);
                case 3:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function webphoneAnswer(_x, _x2) {
            return _webphoneAnswer.apply(this, arguments);
          }
          return webphoneAnswer;
        }(),
        // @ts-expect-error TS(2322): Type '(sessionId: string, telephonySessionId: stri... Remove this comment to see the full error message
        webphoneToVoicemail: function webphoneToVoicemail(sessionId, telephonySessionId) {
          var _this2$_deps$webphone;
          if (useActiveCallControl) {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            return _this2._deps.activeCallControl.reject(telephonySessionId);
          }
          return (_this2$_deps$webphone = _this2._deps.webphone) === null || _this2$_deps$webphone === void 0 ? void 0 : _this2$_deps$webphone.toVoiceMail(sessionId);
        },
        // @ts-expect-error TS(2322): Type 'Promise<void> | undefined' is not assignable... Remove this comment to see the full error message
        webphoneReject: function webphoneReject(sessionId) {
          var _this2$_deps$webphone2;
          return (_this2$_deps$webphone2 = _this2._deps.webphone) === null || _this2$_deps$webphone2 === void 0 ? void 0 : _this2$_deps$webphone2.reject(sessionId);
        },
        webphoneHangup: function webphoneHangup(sessionId, telephonySessionId) {
          var _this2$_deps$webphone3;
          // user action track
          _this2._deps.callMonitor.allCallsClickHangupTrack();
          if (useActiveCallControl) {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            return _this2._deps.activeCallControl.hangUp(telephonySessionId);
          }
          return (_this2$_deps$webphone3 = _this2._deps.webphone) === null || _this2$_deps$webphone3 === void 0 ? void 0 : _this2$_deps$webphone3.hangup(sessionId);
        },
        webphoneResume: function () {
          var _webphoneResume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sessionId, telephonySessionId) {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  if (!useActiveCallControl) {
                    _context2.n = 1;
                    break;
                  }
                  return _context2.a(2, _this2._deps.activeCallControl.unhold(telephonySessionId));
                case 1:
                  if (_this2._deps.webphone) {
                    _context2.n = 2;
                    break;
                  }
                  return _context2.a(2);
                case 2:
                  _context2.n = 3;
                  return _this2._deps.webphone.resume(sessionId);
                case 3:
                  if (_this2._deps.routerInteraction.currentPath !== callCtrlRoute && !useV2) {
                    _this2._deps.routerInteraction.push(callCtrlRoute);
                  }
                case 4:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function webphoneResume(_x3, _x4) {
            return _webphoneResume.apply(this, arguments);
          }
          return webphoneResume;
        }(),
        webphoneHold: function webphoneHold(sessionId, telephonySessionId) {
          var _this2$_deps$webphone4;
          // user action track
          _this2._deps.callMonitor.allCallsClickHoldTrack();
          if (useActiveCallControl) {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            return _this2._deps.activeCallControl.hold(telephonySessionId);
          }
          return (_this2$_deps$webphone4 = _this2._deps.webphone) === null || _this2$_deps$webphone4 === void 0 ? void 0 : _this2$_deps$webphone4.hold(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(activeCall: SwitchCallActiveCallParams | Ac... Remove this comment to see the full error message
        webphoneSwitchCall: function () {
          var _webphoneSwitchCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(activeCall) {
            var session;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  if (!useActiveCallControl) {
                    _context3.n = 1;
                    break;
                  }
                  return _context3.a(2, _this2._deps.activeCallControl["switch"](activeCall.telephonySessionId));
                case 1:
                  if (_this2._deps.webphone) {
                    _context3.n = 2;
                    break;
                  }
                  return _context3.a(2);
                case 2:
                  _context3.n = 3;
                  return _this2._deps.webphone.switchCall(activeCall, _this2._deps.regionSettings.homeCountryId);
                case 3:
                  session = _context3.v;
                  return _context3.a(2, session);
              }
            }, _callee3);
          }));
          function webphoneSwitchCall(_x5) {
            return _webphoneSwitchCall.apply(this, arguments);
          }
          return webphoneSwitchCall;
        }(),
        webphoneIgnore: function webphoneIgnore(telephonySessionId) {
          var _this2$_deps$activeCa;
          return (_this2$_deps$activeCa = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa === void 0 ? void 0 : _this2$_deps$activeCa.ignore(telephonySessionId);
        },
        ringoutHangup: function () {
          var _ringoutHangup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
            var _this2$_deps$activeCa2;
            var _len,
              args,
              _key,
              _args4 = arguments;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  // user action track
                  _this2._deps.callMonitor.allCallsClickHangupTrack();
                  for (_len = _args4.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = _args4[_key];
                  }
                  return _context4.a(2, (_this2$_deps$activeCa2 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa2 === void 0 ? void 0 : _this2$_deps$activeCa2.hangUp.apply(_this2$_deps$activeCa2, args));
              }
            }, _callee4);
          }));
          function ringoutHangup() {
            return _ringoutHangup.apply(this, arguments);
          }
          return ringoutHangup;
        }(),
        ringoutTransfer: function ringoutTransfer(sessionId) {
          _this2._deps.routerInteraction.push("/transfer/".concat(sessionId, "/active"));
        },
        ringoutReject: function () {
          var _ringoutReject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(sessionId) {
            var _this2$_deps$activeCa3;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  // user action track
                  _this2._deps.callMonitor.allCallsClickRejectTrack();
                  return _context5.a(2, (_this2$_deps$activeCa3 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa3 === void 0 ? void 0 : _this2$_deps$activeCa3.reject(sessionId));
              }
            }, _callee5);
          }));
          function ringoutReject(_x6) {
            return _ringoutReject.apply(this, arguments);
          }
          return ringoutReject;
        }(),
        onViewContact: function onViewContact(options) {
          if (!showViewContact) return;
          _onViewContact(options);
        },
        onClickToSms: this._deps.composeText ? (/*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(contact) {
            var isDummyContact,
              _ref5,
              name,
              _args6 = arguments;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  isDummyContact = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;
                  if (_this2._deps.routerInteraction) {
                    _this2._deps.routerInteraction.push(composeTextRoute);
                  }
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  _this2._deps.composeText.clean();
                  _ref5 = contact, name = _ref5.name;
                  if (name && contact.phoneNumber && isDummyContact) {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _this2._deps.composeText.updateTypingToNumber(name);
                    _this2._deps.contactSearch.search({
                      searchString: name
                    });
                  } else {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _this2._deps.composeText.addToRecipients(contact);
                  }
                case 1:
                  return _context6.a(2);
              }
            }, _callee6);
          }));
          return function (_x7) {
            return _ref4.apply(this, arguments);
          };
        }()) : undefined,
        // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
        onCreateContact: onCreateContact ? (/*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(_ref6) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  phoneNumber = _ref6.phoneNumber, name = _ref6.name, entityType = _ref6.entityType;
                  _context7.n = 1;
                  return _this2._deps.contactMatcher.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  });
                case 1:
                  hasMatchNumber = _context7.v;
                  if (hasMatchNumber) {
                    _context7.n = 3;
                    break;
                  }
                  _context7.n = 2;
                  return onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  });
                case 2:
                  _context7.n = 3;
                  return _this2._deps.contactMatcher.forceMatchNumber({
                    phoneNumber: phoneNumber
                  });
                case 3:
                  return _context7.a(2);
              }
            }, _callee7);
          }));
          return function (_x8) {
            return _ref7.apply(this, arguments);
          };
        }()) : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || this._deps.callLogger && (/*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(_ref8) {
            var call, contact, _ref8$redirect, redirect;
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  call = _ref8.call, contact = _ref8.contact, _ref8$redirect = _ref8.redirect, redirect = _ref8$redirect === void 0 ? true : _ref8$redirect;
                  _context8.n = 1;
                  return _this2._deps.callLogger.logCall({
                    call: call,
                    contact: contact,
                    redirect: redirect
                  });
                case 1:
                  return _context8.a(2);
              }
            }, _callee8);
          }));
          return function (_x9) {
            return _ref9.apply(this, arguments);
          };
        }()),
        onCallsEmpty: onCallsEmpty || function () {
          var isWebRTC = _this2._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;

          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          if (isWebRTC && !_this2._deps.webphone.sessions.length) {
            _this2._deps.routerInteraction.push('/dialer');
          }
        },
        isSessionAConferenceCall: function isSessionAConferenceCall(sessionId) {
          var _this2$_deps$conferen;
          return !!((_this2$_deps$conferen = _this2._deps.conferenceCall) === null || _this2$_deps$conferen === void 0 ? void 0 : _this2$_deps$conferen.isConferenceSession(sessionId));
        },
        onCallItemClick: function onCallItemClick(call) {
          if (!call.webphoneSession) {
            // For ringout call
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              return;
            }
            var telephonySessionId = call.telephonySessionId;
            // to track the call item be clicked.
            _this2._deps.callMonitor.callItemClickTrack();
            _this2._deps.routerInteraction.push("/simplifycallctrl/".concat(telephonySessionId));
          } else {
            // For webphone call
            // show the ring call modal when click a ringing call.
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              _this2._deps.webphone.toggleMinimized(call.webphoneSession.id);
              return;
            }
            if (call.webphoneSession && call.webphoneSession.id) {
              // to track the call item be clicked.
              _this2._deps.callMonitor.callItemClickTrack();
              _this2._deps.routerInteraction.push("".concat(callCtrlRoute, "/").concat(call.webphoneSession.id));
            }
          }
        },
        getAvatarUrl: getAvatarUrl,
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return (
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this2._deps.webphone.updateSessionMatchedContact(sessionId, contact)
          );
        },
        // function to check if a call is on hold status
        isOnHold: function isOnHold(webphoneSession) {
          if (useActiveCallControl) {
            var call = _this2._deps.callMonitor.calls.find(function (call) {
              return call.webphoneSession === webphoneSession;
            }) || {};
            // @ts-expect-error TS(2339): Property 'telephonySession' does not exist on type... Remove this comment to see the full error message
            var telephonySession = call.telephonySession;
            return (0, _ActiveCallControl.isHolding)(telephonySession);
          }
          return (0, _webphoneHelper.isOnHold)(webphoneSession);
        },
        clickSwitchTrack: function clickSwitchTrack() {
          var _this2$_deps$activeCa4, _this2$_deps$activeCa5;
          (_this2$_deps$activeCa4 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa4 === void 0 ? void 0 : (_this2$_deps$activeCa5 = _this2$_deps$activeCa4.clickSwitchTrack) === null || _this2$_deps$activeCa5 === void 0 ? void 0 : _this2$_deps$activeCa5.call(_this2$_deps$activeCa4);
        }
      };
    }
  }, {
    key: "isWide",
    get: function get() {
      return true;
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=ActiveCallsUI.js.map
