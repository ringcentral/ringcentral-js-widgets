"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ALL_CALL_PATH = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.filter");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");

var _di = require("@ringcentral-integration/commons/lib/di");

var _proxify = _interopRequireDefault(require("@ringcentral-integration/commons/lib/proxy/proxify"));

var _selector = require("@ringcentral-integration/commons/lib/selector");

var _callingModes = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingModes"));

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _i18n = _interopRequireDefault(require("../getPresenceStatusName/i18n"));

var _i18n2 = _interopRequireDefault(require("../../components/CallMonitorBar/i18n"));

var _AdapterModuleCoreBase = _interopRequireDefault(require("../AdapterModuleCoreBase"));

var _baseActionTypes = require("../AdapterModuleCoreBase/baseActionTypes");

var _IframeMessageTransport = _interopRequireDefault(require("../IframeMessageTransport"));

var _dec, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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

      if (!this.ready) return; // TODO: we should refactor the entire sync logic to be more
      // declarative and straightforward

      if (forcePush) {
        this._postMessage({
          type: this._messageTypes.pushLocale,
          strings: this.localeStrings
        });
      }

      if (!this._callingSettings) return;
      var callingMode = this._callingSettings.callingMode;

      if (callingMode === _callingModes["default"].webphone) {
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
      } // Check if ringing is over


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
      } // Check if ringing is over


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
      var ringCallsInfo = ringingCallsLength === 1 ? (0, _formatMessage["default"])(_i18n2["default"].getString('incomingCall', currentLocale), {
        numberOf: ringingCallsLength
      }) : (0, _formatMessage["default"])(_i18n2["default"].getString('incomingCalls', currentLocale), {
        numberOf: ringingCallsLength
      });
      var onHoldCallsInfo = onHoldCallsLength === 1 ? (0, _formatMessage["default"])(_i18n2["default"].getString('callOnHold', currentLocale), {
        numberOf: onHoldCallsLength
      }) : (0, _formatMessage["default"])(_i18n2["default"].getString('callsOnHold', currentLocale), {
        numberOf: onHoldCallsLength
      });
      var otherDeviceCallsInfo = otherDeviceCallsLength === 1 ? (0, _formatMessage["default"])(_i18n2["default"].getString('otherDeviceCall', currentLocale), {
        numberOf: otherDeviceCallsLength
      }) : (0, _formatMessage["default"])(_i18n2["default"].getString('otherDeviceCalls', currentLocale), {
        numberOf: otherDeviceCallsLength
      });

      var availableBtn = _i18n["default"].getString(_presenceStatus.presenceStatus.available, currentLocale);

      var busyBtn = _i18n["default"].getString(_presenceStatus.presenceStatus.busy, currentLocale);

      var offlineBtn = _i18n["default"].getString(_presenceStatus.presenceStatus.offline, currentLocale);

      var doNotAcceptAnyCallsBtn = _i18n["default"].getString(_dndStatus["default"].doNotAcceptAnyCalls, currentLocale);

      return {
        currentCallBtn: _i18n2["default"].getString('currentCall', currentLocale),
        viewCallsBtn: _i18n2["default"].getString('viewCalls', currentLocale),
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
}), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToCurrentCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToCurrentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToViewCalls", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToViewCalls"), _class2.prototype)), _class2)) || _class);
exports["default"] = AdapterModuleCore;
//# sourceMappingURL=index.js.map
