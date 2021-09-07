"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.filter");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _proxify = _interopRequireDefault(require("@ringcentral-integration/commons/lib/proxy/proxify"));

var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _callingModes = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingModes"));

var _selector = require("@ringcentral-integration/commons/lib/selector");

var _IframeMessageTransport = _interopRequireDefault(require("../IframeMessageTransport"));

var _i18n = _interopRequireDefault(require("../../components/CallMonitorBar/i18n"));

var _i18n2 = _interopRequireDefault(require("../../components/PresenceItem/i18n"));

var _AdapterModuleCoreBase = _interopRequireDefault(require("../AdapterModuleCoreBase"));

var _baseActionTypes = _interopRequireDefault(require("../AdapterModuleCoreBase/baseActionTypes"));

var _dec, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var ALL_CALL_PATH = '/calls';
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
        actionTypes = _ref$actionTypes === void 0 ? _baseActionTypes["default"] : _ref$actionTypes,
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
        options = _objectWithoutProperties(_ref, ["prefix", "storageKey", "actionTypes", "callingSettings", "globalStorage", "locale", "presence", "routerInteraction", "webphone", "callMonitor", "userGuide", "quickAccess", "messageTransport", "activeCallControl"]);

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

    _initializerDefineProperty(_this, "localeStrings", _descriptor, _assertThisInitialized(_this));

    _this._callingSettings = callingSettings;
    _this._webphone = webphone;
    _this._callMonitor = callMonitor;
    _this._userGuide = userGuide;
    _this._quickAccess = quickAccess;
    _this._activeCallControl = activeCallControl;
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
      this._showIncomingCallPage = !!(this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized);

      if (forcePush || this._lastPath !== this._router.currentPath || this._lastShowIncomingCallPage !== this._showIncomingCallPage) {
        this._lastPath = this._router.currentPath;
        this._lastShowIncomingCallPage = this._showIncomingCallPage;
        var onCurrentCallPath = (this._router.currentPath === ACTIVE_CALL_PATH || this._router.currentPath === "".concat(ACTIVE_CALL_PATH, "/").concat(this._webphone.activeSessionId)) && !this._showIncomingCallPage;

        if (forcePush || this.onCurrentCallPath !== onCurrentCallPath || this._lastShowIncomingCallPage !== this._showIncomingCallPage) {
          this.onCurrentCallPath = onCurrentCallPath;
          this._lastShowIncomingCallPage = this._showIncomingCallPage;

          this._postMessage({
            type: this._messageTypes.pushOnCurrentCallPath,
            onCurrentCallPath: onCurrentCallPath
          });
        }

        var onAllCallsPath = this._router.currentPath === ALL_CALL_PATH && !this._showIncomingCallPage;

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
      var currentStartTime = this._callMonitor.activeCurrentCalls && this._callMonitor.activeCurrentCalls.length > 0 && this._callMonitor.activeCurrentCalls[0].startTime || 0;

      if (forcePush || this._lastRingCallsLength !== ringingCallsLength || this._lastOnHoldCallsLength !== onHoldCallsLength || this._lastCurrentStartTime !== currentStartTime) {
        this._lastRingCallsLength = ringingCallsLength;
        this._lastOnHoldCallsLength = onHoldCallsLength;
        this._lastCurrentStartTime = currentStartTime;

        this._postMessage({
          type: this._messageTypes.pushCalls,
          ringingCallsLength: ringingCallsLength,
          onHoldCallsLength: onHoldCallsLength,
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

                if (this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized) {
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

              case 4:
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
    }, function (localeReady, currentLocale, ringingCallsLength, onHoldCallsLength) {
      var ringCallsInfo = ringingCallsLength === 1 ? (0, _formatMessage["default"])(_i18n["default"].getString('incomingCall', currentLocale), {
        numberOf: ringingCallsLength
      }) : (0, _formatMessage["default"])(_i18n["default"].getString('incomingCalls', currentLocale), {
        numberOf: ringingCallsLength
      });
      var onHoldCallsInfo = onHoldCallsLength === 1 ? (0, _formatMessage["default"])(_i18n["default"].getString('callOnHold', currentLocale), {
        numberOf: onHoldCallsLength
      }) : (0, _formatMessage["default"])(_i18n["default"].getString('callsOnHold', currentLocale), {
        numberOf: onHoldCallsLength
      });

      var availableBtn = _i18n2["default"].getString(_presenceStatus.presenceStatus.available, currentLocale);

      var busyBtn = _i18n2["default"].getString(_presenceStatus.presenceStatus.busy, currentLocale);

      var offlineBtn = _i18n2["default"].getString(_presenceStatus.presenceStatus.offline, currentLocale);

      var doNotAcceptAnyCallsBtn = _i18n2["default"].getString(_dndStatus["default"].doNotAcceptAnyCalls, currentLocale);

      return {
        currentCallBtn: _i18n["default"].getString('currentCall', currentLocale),
        viewCallsBtn: _i18n["default"].getString('viewCalls', currentLocale),
        ringCallsInfo: ringCallsInfo,
        onHoldCallsInfo: onHoldCallsInfo,
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
