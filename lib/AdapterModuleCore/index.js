"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ALL_CALL_PATH = void 0;
require("regenerator-runtime/runtime");
var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _selector = require("@ringcentral-integration/commons/lib/selector");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _utils = require("@ringcentral-integration/utils");
var _i18n = _interopRequireDefault(require("../../components/CallMonitorBar/i18n"));
var _AdapterModuleCoreBase = _interopRequireDefault(require("../AdapterModuleCoreBase"));
var _baseActionTypes = require("../AdapterModuleCoreBase/baseActionTypes");
var _IframeMessageTransport = _interopRequireDefault(require("../IframeMessageTransport"));
var _i18n2 = _interopRequireDefault(require("../getPresenceStatusName/i18n"));
var _dec, _class, _class2, _descriptor; // @ts-nocheck
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
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
var ALL_CALL_PATH = '/calls';
exports.ALL_CALL_PATH = ALL_CALL_PATH;
var ACTIVE_CALL_PATH = '/calls/active';
var AdapterModuleCore = (_dec = (0, _di.Module)({
  deps: ['CallingSettings', 'GlobalStorage', 'Locale', 'Presence', 'RouterInteraction', 'Storage', 'Webphone', 'CallMonitor', {
    dep: 'ActiveCallControl',
    optional: true
  }, {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'QuickAccess',
    optional: true
  }, {
    dep: 'CallLogSection',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_AdapterModuleCoreBas) {
  _inherits(AdapterModuleCore, _AdapterModuleCoreBas);
  var _super = _createSuper(AdapterModuleCore);
  function AdapterModuleCore(_ref) {
    var _this;
    var prefix = _ref.prefix,
      _ref$storageKey = _ref.storageKey,
      storageKey = _ref$storageKey === void 0 ? 'adapterCore' : _ref$storageKey,
      _ref$actionTypes = _ref.actionTypes,
      actionTypes = _ref$actionTypes === void 0 ? _baseActionTypes.baseActionTypes : _ref$actionTypes,
      callingSettings = _ref.callingSettings,
      globalStorage = _ref.globalStorage,
      locale = _ref.locale,
      presence = _ref.presence,
      routerInteraction = _ref.routerInteraction,
      webphone = _ref.webphone,
      callMonitor = _ref.callMonitor,
      userGuide = _ref.userGuide,
      quickAccess = _ref.quickAccess,
      _ref$messageTransport = _ref.messageTransport,
      messageTransport = _ref$messageTransport === void 0 ? new _IframeMessageTransport["default"]({
        targetWindow: window.parent
      }) : _ref$messageTransport,
      activeCallControl = _ref.activeCallControl,
      callLogSection = _ref.callLogSection,
      options = _objectWithoutProperties(_ref, ["prefix", "storageKey", "actionTypes", "callingSettings", "globalStorage", "locale", "presence", "routerInteraction", "webphone", "callMonitor", "userGuide", "quickAccess", "messageTransport", "activeCallControl", "callLogSection"]);
    _classCallCheck(this, AdapterModuleCore);
    _this = _super.call(this, _objectSpread({
      prefix: prefix,
      actionTypes: actionTypes,
      locale: locale,
      messageTransport: messageTransport,
      presence: presence,
      routerInteraction: routerInteraction,
      globalStorage: globalStorage,
      storageKey: storageKey
    }, options));
    _this._callingSettings = void 0;
    _this._callLogSection = void 0;
    _this._activeCallControl = void 0;
    _this._userGuide = void 0;
    _this._webphone = void 0;
    _this._callMonitor = void 0;
    _this._quickAccess = void 0;
    _this._showIncomingCallPage = void 0;
    _this.onAllCallsPath = void 0;
    _this.onCurrentCallPath = void 0;
    _this._lastShowIncomingCallPage = void 0;
    _this._showCallLogPage = void 0;
    _this._lastShowCallLogPage = void 0;
    _initializerDefineProperty(_this, "localeStrings", _descriptor, _assertThisInitialized(_this));
    _this._callingSettings = callingSettings;
    _this._webphone = webphone;
    _this._callMonitor = callMonitor;
    _this._userGuide = userGuide;
    _this._quickAccess = quickAccess;
    _this._activeCallControl = activeCallControl;
    _this._callLogSection = callLogSection;
    return _this;
  }
  _createClass(AdapterModuleCore, [{
    key: "_pushOtherStateChanges",
    value: function _pushOtherStateChanges() {
      this._pushRingState();
    }
  }, {
    key: "_pushRingState",
    value: function _pushRingState() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$forcePush = _ref2.forcePush,
        forcePush = _ref2$forcePush === void 0 ? false : _ref2$forcePush;
      if (!this.ready) return;

      // TODO: we should refactor the entire sync logic to be more
      // declarative and straightforward
      if (forcePush) {
        this._postMessage({
          type: this._messageTypes.pushLocale,
          strings: this.localeStrings
        });
      }
      if (!this._callingSettings) return;
      var callingMode = this._callingSettings.callingMode;
      if (callingMode === _CallingSettings.callingModes.webphone) {
        // TODO: should change to use ActiveCallControl module when introduce ActiveCallControl module into other project
        if (this._activeCallControl) {
          this._pushActiveCallRingingState(forcePush);
        } else {
          this._pushWebphoneRingingState(forcePush);
        }
        this._pushCallStartTime(forcePush);
        this._pushIncomingCallPage(forcePush);
      } else {
        this._pushRingoutRingingState();
      }
    }
  }, {
    key: "_pushActiveCallRingingState",
    value: function _pushActiveCallRingingState(forcePush) {
      if (this._activeCallControl.ringSessions.length > 0 && this._activeCallControl.ringSessionId && (this._activeCallControl.ringSessionId !== this._ringSessionId || forcePush)) {
        this._ringSessionId = this._activeCallControl.ringSessionId;
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: true
        });
      }
      // Check if ringing is over
      if (this._ringSessionId) {
        if (this._activeCallControl.ringSessions.length === 0) {
          this._postMessage({
            type: this._messageTypes.pushRingState,
            ringing: false
          });
          this._ringSessionId = null;
        }
      } else {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: false
        });
      }
    }
  }, {
    key: "_pushWebphoneRingingState",
    value: function _pushWebphoneRingingState(forcePush) {
      var webphone = this._webphone;
      if (!webphone) {
        throw new Error('webphone is a required dependency for monitoring WebRTC call');
      }
      if (webphone.ringSession && (webphone.ringSessionId !== this._ringSessionId || forcePush)) {
        this._ringSessionId = webphone.ringSessionId;
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: true
        });
      }
      // Check if ringing is over
      if (this._ringSessionId) {
        var ringingSessions = webphone.sessions.filter(function (session) {
          return session.callStatus === 'webphone-session-connecting' && session.direction === 'Inbound';
        });
        if (ringingSessions.length === 0) {
          this._postMessage({
            type: this._messageTypes.pushRingState,
            ringing: false
          });
          this._ringSessionId = null;
        }
      } else {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: false
        });
      }
    }
  }, {
    key: "_pushRingoutRingingState",
    value: function _pushRingoutRingingState() {
      var status = this._presence.telephonyStatus;
      if (this._presence.telephonyStatus !== this._telephonyStatus) {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: status === 'Ringing'
        });
        this._telephonyStatus = status;
      }
    }
  }, {
    key: "_pushIncomingCallPage",
    value: function _pushIncomingCallPage(forcePush) {
      var _this$_callLogSection;
      this._showIncomingCallPage = !!(this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized);
      this._showCallLogPage = !!((_this$_callLogSection = this._callLogSection) === null || _this$_callLogSection === void 0 ? void 0 : _this$_callLogSection.show);
      if (forcePush || this._lastPath !== this._router.currentPath || this._lastShowIncomingCallPage !== this._showIncomingCallPage || this._lastShowCallLogPage !== this._showCallLogPage) {
        var _this$_activeCallCont;
        this._lastPath = this._router.currentPath;
        this._lastShowIncomingCallPage = this._showIncomingCallPage;
        this._lastShowCallLogPage = this._showCallLogPage;
        var onCurrentCallPath = this._callLogSection ? this._callLogSection.show && this._callLogSection.currentIdentify === ((_this$_activeCallCont = this._activeCallControl.activeSession) === null || _this$_activeCallCont === void 0 ? void 0 : _this$_activeCallCont.sessionId) : (this._router.currentPath === ACTIVE_CALL_PATH || this._router.currentPath === "".concat(ACTIVE_CALL_PATH, "/").concat(this._webphone.activeSessionId)) && !this._showIncomingCallPage;
        if (forcePush || this.onCurrentCallPath !== onCurrentCallPath || this._lastShowIncomingCallPage !== this._showIncomingCallPage || this._lastShowCallLogPage !== this._showCallLogPage) {
          this.onCurrentCallPath = onCurrentCallPath;
          this._lastShowIncomingCallPage = this._showIncomingCallPage;
          this._lastShowCallLogPage = this._showCallLogPage;
          this._postMessage({
            type: this._messageTypes.pushOnCurrentCallPath,
            onCurrentCallPath: onCurrentCallPath
          });
        }
        var onAllCallsPath = this._router.currentPath === ALL_CALL_PATH && (this._callLogSection ? !this._callLogSection.show : !this._showIncomingCallPage);
        if (forcePush || this.onAllCallsPath !== onAllCallsPath) {
          this.onAllCallsPath = onAllCallsPath;
          this._postMessage({
            type: this._messageTypes.pushOnAllCallsPath,
            onAllCallsPath: onAllCallsPath
          });
        }
      }
    }
  }, {
    key: "_pushCallStartTime",
    value: function _pushCallStartTime(forcePush) {
      var ringingCallsLength = this._callMonitor.activeRingCalls.length;
      var onHoldCallsLength = this._callMonitor.activeOnHoldCalls.length;
      var otherDeviceCallsLength = this._callMonitor.otherDeviceCalls.length;
      var currentStartTime = this._callMonitor.activeCurrentCalls && this._callMonitor.activeCurrentCalls.length > 0 && this._callMonitor.activeCurrentCalls[0].startTime || 0;
      if (forcePush || this._lastRingCallsLength !== ringingCallsLength || this._lastOnHoldCallsLength !== onHoldCallsLength || this._lastCurrentStartTime !== currentStartTime || this._otherDeviceCallsLength !== otherDeviceCallsLength) {
        this._lastRingCallsLength = ringingCallsLength;
        this._lastOnHoldCallsLength = onHoldCallsLength;
        this._lastCurrentStartTime = currentStartTime;
        this._otherDeviceCallsLength = otherDeviceCallsLength;
        this._postMessage({
          type: this._messageTypes.pushCalls,
          ringingCallsLength: ringingCallsLength,
          onHoldCallsLength: onHoldCallsLength,
          otherDeviceCallsLength: otherDeviceCallsLength,
          currentStartTime: currentStartTime
        });
        this._postMessage({
          type: this._messageTypes.pushLocale,
          strings: this.localeStrings
        });
      }
    }
  }, {
    key: "_onNavigateToCurrentCall",
    value: function () {
      var _onNavigateToCurrentCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_activeCallCont2, _this$_activeCallCont3;
        var currentSession, currentCallPath;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentSession = this._webphone.activeSession;
                if (currentSession) {
                  currentCallPath = "".concat(ACTIVE_CALL_PATH, "/").concat(currentSession.id);
                  this._router.push(currentCallPath);
                }
                if (this._userGuide && this._userGuide.started) {
                  this._userGuide.dismiss();
                }
                if (this._quickAccess && this._quickAccess.entered) {
                  this._quickAccess.exit();
                }
                if (this._callLogSection && ((_this$_activeCallCont2 = this._activeCallControl) === null || _this$_activeCallCont2 === void 0 ? void 0 : (_this$_activeCallCont3 = _this$_activeCallCont2.activeSession) === null || _this$_activeCallCont3 === void 0 ? void 0 : _this$_activeCallCont3.sessionId)) {
                  this._callLogSection.showLogSection(this._activeCallControl.activeSession.sessionId);
                } else if (this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized) {
                  this._webphone.toggleMinimized(this._webphone.ringSession.id);
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _onNavigateToCurrentCall() {
        return _onNavigateToCurrentCall2.apply(this, arguments);
      }
      return _onNavigateToCurrentCall;
    }()
  }, {
    key: "_onNavigateToViewCalls",
    value: function () {
      var _onNavigateToViewCalls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$_callLogSection2;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._router.push(ALL_CALL_PATH);
                if (this._userGuide && this._userGuide.started) {
                  this._userGuide.dismiss();
                }
                if (this._quickAccess && this._quickAccess.entered) {
                  this._quickAccess.exit();
                }
                if (this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized) {
                  this._webphone.toggleMinimized(this._webphone.ringSession.id);
                }
                (_this$_callLogSection2 = this._callLogSection) === null || _this$_callLogSection2 === void 0 ? void 0 : _this$_callLogSection2.closeLogSection();
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _onNavigateToViewCalls() {
        return _onNavigateToViewCalls2.apply(this, arguments);
      }
      return _onNavigateToViewCalls;
    }()
  }]);
  return AdapterModuleCore;
}(_AdapterModuleCoreBase["default"]), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "localeStrings", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;
    return [function () {
      return _this2._locale.ready;
    }, function () {
      return _this2._locale.currentLocale;
    }, function () {
      return _this2._callMonitor.activeRingCalls.length;
    }, function () {
      return _this2._callMonitor.activeOnHoldCalls.length;
    }, function () {
      return _this2._callMonitor.otherDeviceCalls.length;
    }, function (localeReady, currentLocale, ringingCallsLength, onHoldCallsLength, otherDeviceCallsLength) {
      var ringCallsInfo = ringingCallsLength === 1 ? (0, _utils.format)(_i18n["default"].getString('incomingCall', currentLocale), {
        numberOf: ringingCallsLength
      }) : (0, _utils.format)(_i18n["default"].getString('incomingCalls', currentLocale), {
        numberOf: ringingCallsLength
      });
      var onHoldCallsInfo = onHoldCallsLength === 1 ? (0, _utils.format)(_i18n["default"].getString('callOnHold', currentLocale), {
        numberOf: onHoldCallsLength
      }) : (0, _utils.format)(_i18n["default"].getString('callsOnHold', currentLocale), {
        numberOf: onHoldCallsLength
      });
      var otherDeviceCallsInfo = otherDeviceCallsLength === 1 ? (0, _utils.format)(_i18n["default"].getString('otherDeviceCall', currentLocale), {
        numberOf: otherDeviceCallsLength
      }) : (0, _utils.format)(_i18n["default"].getString('otherDeviceCalls', currentLocale), {
        numberOf: otherDeviceCallsLength
      });
      var availableBtn = _i18n2["default"].getString(_presenceStatus.presenceStatus.available, currentLocale);
      var busyBtn = _i18n2["default"].getString(_presenceStatus.presenceStatus.busy, currentLocale);
      var offlineBtn = _i18n2["default"].getString(_presenceStatus.presenceStatus.offline, currentLocale);
      var doNotAcceptAnyCallsBtn = _i18n2["default"].getString(_Presence.dndStatus.doNotAcceptAnyCalls, currentLocale);
      return {
        currentCallBtn: _i18n["default"].getString('currentCall', currentLocale),
        viewCallsBtn: _i18n["default"].getString('viewCalls', currentLocale),
        ringCallsInfo: ringCallsInfo,
        onHoldCallsInfo: onHoldCallsInfo,
        otherDeviceCallsInfo: otherDeviceCallsInfo,
        availableBtn: availableBtn,
        busyBtn: busyBtn,
        offlineBtn: offlineBtn,
        doNotAcceptAnyCallsBtn: doNotAcceptAnyCallsBtn
      };
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToCurrentCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToCurrentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToViewCalls", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToViewCalls"), _class2.prototype)), _class2)) || _class);
exports["default"] = AdapterModuleCore;
//# sourceMappingURL=index.js.map
