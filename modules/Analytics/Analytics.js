"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = track;
exports.Analytics = exports.tracking = exports.DEFAULT_TAG_NAME = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.to-iso-string");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _saveBlob = _interopRequireDefault(require("../../lib/saveBlob"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = require("./actionTypes");

var _getAnalyticsReducer = _interopRequireDefault(require("./getAnalyticsReducer"));

var _Analytics = require("../../lib/Analytics");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function warn() {
  console.warn('Do NOT call this directly.');
}

var TRACK_LIST = [];

function track(tagName) {
  return function _track(prototype, property, descriptor) {
    var value = descriptor.value,
        options = _objectWithoutProperties(descriptor, ["value"]);

    if (typeof value === 'function') {
      TRACK_LIST.push({
        tagName: tagName,
        funcName: property,
        funcImpl: value
      });
    }

    return _objectSpread(_objectSpread({}, options), {}, {
      value: warn,
      configurable: false
    });
  };
}

var DEFAULT_TAG_NAME = 'default';
exports.DEFAULT_TAG_NAME = DEFAULT_TAG_NAME;
var tracking = track(DEFAULT_TAG_NAME); // TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`

/**
 * @class
 * @description Analytics module.
 */

exports.tracking = tracking;
var Analytics = (_dec = (0, _di.Module)({
  name: 'Analytics',
  deps: [{
    dep: 'AnalyticsOptions',
    optional: true
  }, {
    dep: 'Adapter',
    optional: true
  }, {
    dep: 'Auth',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'CallingSettings',
    optional: true
  }, {
    dep: 'AccountInfo',
    optional: true
  }, {
    dep: 'ExtensionInfo',
    optional: true
  }, {
    dep: 'RolesAndPermissions',
    optional: true
  }, {
    dep: 'CallHistory',
    optional: true
  }, {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'Conference',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'MessageSender',
    optional: true
  }, {
    dep: 'MessageStore',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }, {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'Locale',
    optional: true
  }, {
    dep: 'Meeting',
    optional: true
  }, {
    dep: 'RcVideo',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Analytics, _RcModule);

  var _super = _createSuper(Analytics);

  function Analytics(_ref) {
    var _this;

    var analyticsKey = _ref.analyticsKey,
        appName = _ref.appName,
        appVersion = _ref.appVersion,
        brandCode = _ref.brandCode,
        adapter = _ref.adapter,
        auth = _ref.auth,
        call = _ref.call,
        callingSettings = _ref.callingSettings,
        accountInfo = _ref.accountInfo,
        extensionInfo = _ref.extensionInfo,
        rolesAndPermissions = _ref.rolesAndPermissions,
        callHistory = _ref.callHistory,
        callMonitor = _ref.callMonitor,
        conference = _ref.conference,
        conferenceCall = _ref.conferenceCall,
        contactDetailsUI = _ref.contactDetailsUI,
        messageSender = _ref.messageSender,
        messageStore = _ref.messageStore,
        routerInteraction = _ref.routerInteraction,
        userGuide = _ref.userGuide,
        webphone = _ref.webphone,
        locale = _ref.locale,
        meeting = _ref.meeting,
        rcVideo = _ref.rcVideo,
        _ref$useLog = _ref.useLog,
        useLog = _ref$useLog === void 0 ? false : _ref$useLog,
        _ref$lingerThreshold = _ref.lingerThreshold,
        lingerThreshold = _ref$lingerThreshold === void 0 ? 1000 : _ref$lingerThreshold,
        options = _objectWithoutProperties(_ref, ["analyticsKey", "appName", "appVersion", "brandCode", "adapter", "auth", "call", "callingSettings", "accountInfo", "extensionInfo", "rolesAndPermissions", "callHistory", "callMonitor", "conference", "conferenceCall", "contactDetailsUI", "messageSender", "messageStore", "routerInteraction", "userGuide", "webphone", "locale", "meeting", "rcVideo", "useLog", "lingerThreshold"]);

    _classCallCheck(this, Analytics);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.analyticsAcionTypes
    })); // config

    _this._analyticsKey = void 0;
    _this._appName = void 0;
    _this._appVersion = void 0;
    _this._brandCode = void 0;
    _this._adapter = void 0;
    _this._auth = void 0;
    _this._call = void 0;
    _this._callingSettings = void 0;
    _this._accountInfo = void 0;
    _this._extensionInfo = void 0;
    _this._rolesAndPermissions = void 0;
    _this._callHistory = void 0;
    _this._callMonitor = void 0;
    _this._conference = void 0;
    _this._conferenceCall = void 0;
    _this._contactDetailsUI = void 0;
    _this._messageSender = void 0;
    _this._messageStore = void 0;
    _this._routerInteraction = void 0;
    _this._userGuide = void 0;
    _this._webphone = void 0;
    _this._locale = void 0;
    _this._meeting = void 0;
    _this._rcVideo = void 0;
    _this._segment = void 0;
    _this._trackList = void 0;
    _this._useLog = void 0;
    _this._logs = [];
    _this._lingerThreshold = void 0;
    _this._lingerTimeout = null;
    _this._promise = void 0;
    _this._analyticsKey = analyticsKey;
    _this._appName = appName;
    _this._appVersion = appVersion;
    _this._brandCode = brandCode; // modules

    _this._adapter = adapter;
    _this._auth = auth;
    _this._call = call;
    _this._callingSettings = callingSettings;
    _this._accountInfo = accountInfo;
    _this._extensionInfo = extensionInfo;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._callHistory = callHistory;
    _this._callMonitor = callMonitor;
    _this._conference = conference;
    _this._conferenceCall = conferenceCall;
    _this._contactDetailsUI = contactDetailsUI;
    _this._messageSender = messageSender;
    _this._messageStore = messageStore;
    _this._routerInteraction = routerInteraction;
    _this._userGuide = userGuide;
    _this._webphone = webphone;
    _this._locale = locale;
    _this._meeting = meeting;
    _this._rcVideo = rcVideo; // init

    _this._reducer = (0, _getAnalyticsReducer["default"])(_this.actionTypes);
    _this._segment = (0, _Analytics.Segment)();
    _this._trackList = [].concat(TRACK_LIST);
    _this._useLog = useLog;
    _this._lingerThreshold = lingerThreshold;
    return _this;
  }

  _createClass(Analytics, [{
    key: "_identify",
    value: function _identify(_ref2) {
      var userId = _ref2.userId,
          props = _objectWithoutProperties(_ref2, ["userId"]);

      if (this.analytics) {
        this.analytics.identify(userId, props);
      }
    }
  }, {
    key: "track",
    value: function track(event) {
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.analytics) {
        return;
      }

      var trackProps = _objectSpread(_objectSpread({}, this.trackProps), properties);

      this.analytics.track(event, trackProps);

      if (this._useLog) {
        this._logs.push({
          timeStamp: new Date().toISOString(),
          event: event,
          trackProps: trackProps
        });
      }
    }
  }, {
    key: "downloadLogs",
    value: function downloadLogs() {
      if (!this._useLog) {
        return;
      }

      var blob = new Blob([JSON.stringify(this._logs, null, 2)], {
        type: 'application/json'
      });
      (0, _saveBlob["default"])('logs.json', blob);
    }
  }, {
    key: "trackNavigation",
    value: function trackNavigation(_ref3) {
      var router = _ref3.router,
          eventPostfix = _ref3.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track("Navigation: Click/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "trackLinger",
    value: function trackLinger(_ref4) {
      var router = _ref4.router,
          eventPostfix = _ref4.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track("Navigation: View/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "trackSchedule",
    value: function trackSchedule(_ref5) {
      var router = _ref5.router;
      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track('Meeting: Click Schedule/Meeting schedule page', trackProps);
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pending) {
                  this.store.dispatch({
                    type: this.actionTypes.init
                  });

                  if (this._analyticsKey) {
                    this._segment.load(this._analyticsKey);
                  }

                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                }

                if (this.ready && this.lastActions.length && !this._promise) {
                  this._promise = this._processActions();
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_processActions",
    value: function () {
      var _processActions2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.lastActions.length) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return (0, _sleep["default"])(300);

              case 3:
                this.lastActions.forEach(function (action) {
                  _this2.processAction(action);
                });
                this.store.dispatch({
                  type: this.actionTypes.clear
                });
                this._promise = null;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processActions() {
        return _processActions2.apply(this, arguments);
      }

      return _processActions;
    }()
  }, {
    key: "processAction",
    value: function processAction(action) {
      var _this3 = this;

      (this.trackList || []).forEach(function (_ref6) {
        var funcImpl = _ref6.funcImpl;

        if (typeof funcImpl === 'function') {
          funcImpl.call(_this3, action);
        }
      });
    }
  }, {
    key: "_authentication",
    value: function _authentication(action) {
      var _this$_auth;

      if (((_this$_auth = this._auth) === null || _this$_auth === void 0 ? void 0 : _this$_auth.actionTypes.loginSuccess) === action.type) {
        this._identify({
          userId: this._auth.ownerId
        });

        this.track('Authentication');
      }
    }
  }, {
    key: "_logout",
    value: function _logout(action) {
      var _this$_auth2;

      if (((_this$_auth2 = this._auth) === null || _this$_auth2 === void 0 ? void 0 : _this$_auth2.actionTypes.logout) === action.type) {
        this.track('Logout');
      }
    }
  }, {
    key: "_accountInfoReady",
    value: function _accountInfoReady(action) {
      var _this$_accountInfo;

      if (((_this$_accountInfo = this._accountInfo) === null || _this$_accountInfo === void 0 ? void 0 : _this$_accountInfo.actionTypes.initSuccess) === action.type) {
        var _this$_auth3, _this$_rolesAndPermis;

        this._identify({
          userId: (_this$_auth3 = this._auth) === null || _this$_auth3 === void 0 ? void 0 : _this$_auth3.ownerId,
          accountId: this._accountInfo.id,
          servicePlanId: this._accountInfo.servicePlan.id,
          edition: this._accountInfo.servicePlan.edition,
          CRMEnabled: (_this$_rolesAndPermis = this._rolesAndPermissions) === null || _this$_rolesAndPermis === void 0 ? void 0 : _this$_rolesAndPermis.tierEnabled
        });
      }
    }
  }, {
    key: "_callAttempt",
    value: function _callAttempt(action) {
      var _this$_call;

      if (((_this$_call = this._call) === null || _this$_call === void 0 ? void 0 : _this$_call.actionTypes.connect) === action.type) {
        if (action.callSettingMode === _callingModes["default"].webphone) {
          this.track('Call Attempt WebRTC');
        } else {
          this.track('Call Attempt', {
            callSettingMode: action.callSettingMode
          });
        }
      }
    }
  }, {
    key: "_callConnected",
    value: function _callConnected(action) {
      var _this$_call2;

      if (((_this$_call2 = this._call) === null || _this$_call2 === void 0 ? void 0 : _this$_call2.actionTypes.connectSuccess) === action.type) {
        if (action.callSettingMode === _callingModes["default"].webphone) {
          this.track('Outbound WebRTC Call Connected');
        } else {
          this.track('Outbound Call Connected', {
            callSettingMode: action.callSettingMode
          });
        }
      }
    }
  }, {
    key: "_webRTCRegistration",
    value: function _webRTCRegistration(action) {
      var _this$_webphone;

      if (((_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.actionTypes.registered) === action.type) {
        this.track('WebRTC registration');
      }
    }
  }, {
    key: "_smsAttempt",
    value: function _smsAttempt(action) {
      var _this$_messageSender;

      if (((_this$_messageSender = this._messageSender) === null || _this$_messageSender === void 0 ? void 0 : _this$_messageSender.actionTypes.send) === action.type) {
        this.track('SMS Attempt');
      }
    }
  }, {
    key: "_smsSentOver",
    value: function _smsSentOver(action) {
      var _this$_messageSender2;

      if (((_this$_messageSender2 = this._messageSender) === null || _this$_messageSender2 === void 0 ? void 0 : _this$_messageSender2.actionTypes.sendOver) === action.type) {
        this.track('SMS: SMS sent succesfully');
      }
    }
  }, {
    key: "_smsSentError",
    value: function _smsSentError(action) {
      var _this$_messageSender3;

      if (((_this$_messageSender3 = this._messageSender) === null || _this$_messageSender3 === void 0 ? void 0 : _this$_messageSender3.actionTypes.sendError) === action.type) {
        this.track('SMS: SMS sent failed');
      }
    }
  }, {
    key: "_logCall",
    value: function _logCall(action) {
      var _this$_adapter;

      if (((_this$_adapter = this._adapter) === null || _this$_adapter === void 0 ? void 0 : _this$_adapter.actionTypes.createCallLog) === action.type) {
        this.track('Log Call');
      }
    }
  }, {
    key: "_logSMS",
    value: function _logSMS(action) {
      var _this$_adapter2;

      if (((_this$_adapter2 = this._adapter) === null || _this$_adapter2 === void 0 ? void 0 : _this$_adapter2.actionTypes.createSMSLog) === action.type) {
        this.track('Log SMS');
      }
    }
  }, {
    key: "_clickToDial",
    value: function _clickToDial(action) {
      var _this$_adapter3;

      if (((_this$_adapter3 = this._adapter) === null || _this$_adapter3 === void 0 ? void 0 : _this$_adapter3.actionTypes.clickToDial) === action.type) {
        this.track('Click To Dial');
      }
    }
  }, {
    key: "_clickToDialPlaceRingOutCall",
    value: function _clickToDialPlaceRingOutCall(action) {
      var _this$_adapter4;

      if (((_this$_adapter4 = this._adapter) === null || _this$_adapter4 === void 0 ? void 0 : _this$_adapter4.actionTypes.clickToDial) === action.type && action.callSettingMode !== _callingModes["default"].webphone) {
        var _this$_callingSetting;

        this.track('Call: Place RingOut call/Click to Dial ', {
          'RingOut type': (_this$_callingSetting = this._callingSettings) === null || _this$_callingSetting === void 0 ? void 0 : _this$_callingSetting.callWith
        });
      }
    }
  }, {
    key: "_clickToSMS",
    value: function _clickToSMS(action) {
      var _this$_adapter5;

      if (((_this$_adapter5 = this._adapter) === null || _this$_adapter5 === void 0 ? void 0 : _this$_adapter5.actionTypes.clickToSMS) === action.type) {
        this.track('Click To SMS');
      }
    }
  }, {
    key: "_viewEntity",
    value: function _viewEntity(action) {
      var _this$_adapter6;

      if (((_this$_adapter6 = this._adapter) === null || _this$_adapter6 === void 0 ? void 0 : _this$_adapter6.actionTypes.viewEntity) === action.type) {
        this.track('View Entity Details');
      }
    }
  }, {
    key: "_createEntity",
    value: function _createEntity(action) {
      var _this$_adapter7;

      if (((_this$_adapter7 = this._adapter) === null || _this$_adapter7 === void 0 ? void 0 : _this$_adapter7.actionTypes.createEntity) === action.type) {
        this.track('Add Entity');
      }
    }
  }, {
    key: "_editCallLog",
    value: function _editCallLog(action) {
      var _this$_adapter8;

      if (((_this$_adapter8 = this._adapter) === null || _this$_adapter8 === void 0 ? void 0 : _this$_adapter8.actionTypes.editCallLog) === action.type) {
        this.track('Edit Call Log');
      }
    }
  }, {
    key: "_editSMSLog",
    value: function _editSMSLog(action) {
      var _this$_adapter9;

      if (((_this$_adapter9 = this._adapter) === null || _this$_adapter9 === void 0 ? void 0 : _this$_adapter9.actionTypes.editSMSLog) === action.type) {
        this.track('Edit SMS Log');
      }
    }
  }, {
    key: "_navigate",
    value: function _navigate(action) {
      var _this$_routerInteract,
          _this4 = this;

      if (((_this$_routerInteract = this._routerInteraction) === null || _this$_routerInteract === void 0 ? void 0 : _this$_routerInteract.actionTypes.locationChange) === action.type) {
        var path = action.payload && action.payload.pathname;

        var target = this._getTrackTarget(path);

        if (target) {
          this.trackNavigation(target);
        }

        if (this._lingerTimeout) {
          clearTimeout(this._lingerTimeout);
        }

        this._lingerTimeout = setTimeout(function () {
          _this4._lingerTimeout = null;

          if (target && _this4._routerInteraction.currentPath === path) {
            _this4.trackLinger(target);
          }
        }, this._lingerThreshold);
      }
    }
  }, {
    key: "_inboundCall",
    value: function _inboundCall(action) {
      var _this$_webphone2;

      if (((_this$_webphone2 = this._webphone) === null || _this$_webphone2 === void 0 ? void 0 : _this$_webphone2.actionTypes.callAnswer) === action.type) {
        this.track('Inbound WebRTC Call Connected');
      }
    }
  }, {
    key: "_coldTransfer",
    value: function _coldTransfer(action) {
      var _this$_webphone3, _this$_webphone4;

      if (((_this$_webphone3 = this._webphone) === null || _this$_webphone3 === void 0 ? void 0 : _this$_webphone3.isOnTransfer) === true && ((_this$_webphone4 = this._webphone) === null || _this$_webphone4 === void 0 ? void 0 : _this$_webphone4.actionTypes.updateSessions) === action.type) {
        this.track('Cold Transfer Call');
      }
    }
  }, {
    key: "_textClickToDial",
    value: function _textClickToDial(action) {
      var _this$_messageStore;

      if (((_this$_messageStore = this._messageStore) === null || _this$_messageStore === void 0 ? void 0 : _this$_messageStore.actionTypes.clickToCall) === action.type && (action.fromType === 'Pager' || action.fromType === 'SMS')) {
        this.track('Click To Dial (Text List)');
      }
    }
  }, {
    key: "_voicemailClickToDial",
    value: function _voicemailClickToDial(action) {
      var _this$_messageStore2;

      if (((_this$_messageStore2 = this._messageStore) === null || _this$_messageStore2 === void 0 ? void 0 : _this$_messageStore2.actionTypes.clickToCall) === action.type && action.fromType === 'VoiceMail') {
        this.track('Click To Dial (Voicemail List)');
      }
    }
  }, {
    key: "_voicemailClickToSMS",
    value: function _voicemailClickToSMS(action) {
      var _this$_messageStore3;

      if (((_this$_messageStore3 = this._messageStore) === null || _this$_messageStore3 === void 0 ? void 0 : _this$_messageStore3.actionTypes.clickToSMS) === action.type) {
        this.track('Click to SMS (Voicemail List)');
      }
    }
  }, {
    key: "_voicemailDelete",
    value: function _voicemailDelete(action) {
      var _this$_messageStore4;

      if (((_this$_messageStore4 = this._messageStore) === null || _this$_messageStore4 === void 0 ? void 0 : _this$_messageStore4.actionTypes.removeMessage) === action.type) {
        this.track('Delete Voicemail');
      }
    }
  }, {
    key: "_voicemailFlag",
    value: function _voicemailFlag(action) {
      var _this$_messageStore5;

      if (((_this$_messageStore5 = this._messageStore) === null || _this$_messageStore5 === void 0 ? void 0 : _this$_messageStore5.actionTypes.markMessages) === action.type) {
        this.track('Flag Voicemail');
      }
    }
  }, {
    key: "_contactDetailClickToDial",
    value: function _contactDetailClickToDial(action) {
      var _this$_contactDetails;

      if (((_this$_contactDetails = this._contactDetailsUI) === null || _this$_contactDetails === void 0 ? void 0 : _this$_contactDetails.actionTypes.clickToCall) === action.type) {
        this.track('Click To Dial (Contact Details)');
      }
    }
  }, {
    key: "_contactDetailClickToSMS",
    value: function _contactDetailClickToSMS(action) {
      var _this$_contactDetails2;

      if (((_this$_contactDetails2 = this._contactDetailsUI) === null || _this$_contactDetails2 === void 0 ? void 0 : _this$_contactDetails2.actionTypes.clickToSMS) === action.type) {
        this.track('Click To SMS (Contact Details)');
      }
    }
  }, {
    key: "_callHistoryClickToDial",
    value: function _callHistoryClickToDial(action) {
      var _this$_callHistory;

      if (((_this$_callHistory = this._callHistory) === null || _this$_callHistory === void 0 ? void 0 : _this$_callHistory.actionTypes.clickToCall) === action.type) {
        this.track('Click To dial (Call History)');
      }
    }
  }, {
    key: "_callHistoryClickToSMS",
    value: function _callHistoryClickToSMS(action) {
      var _this$_callHistory2;

      if (((_this$_callHistory2 = this._callHistory) === null || _this$_callHistory2 === void 0 ? void 0 : _this$_callHistory2.actionTypes.clickToSMS) === action.type) {
        this.track('Click To SMS (Call History)');
      }
    }
  }, {
    key: "_conferenceInviteWithText",
    value: function _conferenceInviteWithText(action) {
      var _this$_conference;

      if (((_this$_conference = this._conference) === null || _this$_conference === void 0 ? void 0 : _this$_conference.actionTypes.inviteWithText) === action.type) {
        this.track('Invite With Text (Conference)');
      }
    }
  }, {
    key: "_conferenceAddDialInNumber",
    value: function _conferenceAddDialInNumber(action) {
      var _this$_conference2;

      if (((_this$_conference2 = this._conference) === null || _this$_conference2 === void 0 ? void 0 : _this$_conference2.actionTypes.updateAdditionalNumbers) === action.type) {
        this.track('Select Additional Dial-in Number (Conference)');
      }
    }
  }, {
    key: "_conferenceJoinAsHost",
    value: function _conferenceJoinAsHost(action) {
      var _this$_conference3;

      if (((_this$_conference3 = this._conference) === null || _this$_conference3 === void 0 ? void 0 : _this$_conference3.actionTypes.joinAsHost) === action.type) {
        this.track('Join As Host (Conference)');
      }
    }
  }, {
    key: "_showWhatsNew",
    value: function _showWhatsNew(action) {
      var _this$_userGuide;

      if (((_this$_userGuide = this._userGuide) === null || _this$_userGuide === void 0 ? void 0 : _this$_userGuide.actionTypes.updateCarousel) === action.type && action.curIdx === 0 && action.playing) {
        this.track("What's New");
      }
    }
  }, {
    key: "_allCallsClickHold",
    value: function _allCallsClickHold(action) {
      var _this$_callMonitor;

      if (((_this$_callMonitor = this._callMonitor) === null || _this$_callMonitor === void 0 ? void 0 : _this$_callMonitor.actionTypes.allCallsClickHoldTrack) === action.type) {
        this.track('Click Hold (All Calls)');
      }
    }
  }, {
    key: "_allCallsClickHangup",
    value: function _allCallsClickHangup(action) {
      var _this$_callMonitor2;

      if (((_this$_callMonitor2 = this._callMonitor) === null || _this$_callMonitor2 === void 0 ? void 0 : _this$_callMonitor2.actionTypes.allCallsClickHangupTrack) === action.type) {
        this.track('Click Hangup (All Calls)');
      }
    }
  }, {
    key: "_allCallsCallItemClick",
    value: function _allCallsCallItemClick(action) {
      var _this$_callMonitor3;

      if (((_this$_callMonitor3 = this._callMonitor) === null || _this$_callMonitor3 === void 0 ? void 0 : _this$_callMonitor3.actionTypes.callItemClickTrack) === action.type) {
        this.track('Click Call Item (All Calls)');
      }
    }
  }, {
    key: "_callControlClickAdd",
    value: function _callControlClickAdd(action) {
      var _this$_callMonitor4;

      if (((_this$_callMonitor4 = this._callMonitor) === null || _this$_callMonitor4 === void 0 ? void 0 : _this$_callMonitor4.actionTypes.callControlClickAddTrack) === action.type) {
        this.track('Click Add (Call Control)');
      }
    }
  }, {
    key: "_callControlClickMerge",
    value: function _callControlClickMerge(action) {
      var _this$_callMonitor5;

      if (((_this$_callMonitor5 = this._callMonitor) === null || _this$_callMonitor5 === void 0 ? void 0 : _this$_callMonitor5.actionTypes.callControlClickMergeTrack) === action.type && !Object.values(this._conferenceCall.state.mergingPair).length) {
        this.track('Click Merge (Call Control)');
      }
    }
  }, {
    key: "_mergeCallControlClickMerge",
    value: function _mergeCallControlClickMerge(action) {
      var _this$_callMonitor6;

      if (((_this$_callMonitor6 = this._callMonitor) === null || _this$_callMonitor6 === void 0 ? void 0 : _this$_callMonitor6.actionTypes.callControlClickMergeTrack) === action.type && Object.values(this._conferenceCall.state.mergingPair).length) {
        this.track('Click Merge (Merge Call Control)');
      }
    }
  }, {
    key: "_mergeCallControlClickHangup",
    value: function _mergeCallControlClickHangup(action) {
      var _this$_callMonitor7;

      if (((_this$_callMonitor7 = this._callMonitor) === null || _this$_callMonitor7 === void 0 ? void 0 : _this$_callMonitor7.actionTypes.mergeControlClickHangupTrack) === action.type) {
        this.track('Click Hangup (Merge Call Control)');
      }
    }
  }, {
    key: "_inboundCallConnectedTrack",
    value: function _inboundCallConnectedTrack(action) {
      var _this$_callMonitor8;

      if (((_this$_callMonitor8 = this._callMonitor) === null || _this$_callMonitor8 === void 0 ? void 0 : _this$_callMonitor8.actionTypes.inboundCallConnectedTrack) === action.type) {
        this.track('Call: Inbound call connected');
      }
    }
  }, {
    key: "_outboundCallConnectedTrack",
    value: function _outboundCallConnectedTrack(action) {
      var _this$_callMonitor9;

      if (((_this$_callMonitor9 = this._callMonitor) === null || _this$_callMonitor9 === void 0 ? void 0 : _this$_callMonitor9.actionTypes.outboundCallConnectedTrack) === action.type) {
        this.track('Call: Outbound RingOut Call connected');
      }
    }
  }, {
    key: "_callsOnHoldClickAdd",
    value: function _callsOnHoldClickAdd(action) {
      var _this$_callMonitor10;

      if (((_this$_callMonitor10 = this._callMonitor) === null || _this$_callMonitor10 === void 0 ? void 0 : _this$_callMonitor10.actionTypes.callsOnHoldClickAddTrack) === action.type) {
        this.track('Click Add (Calls OnHold)');
      }
    }
  }, {
    key: "_callsOnHoldClickMerge",
    value: function _callsOnHoldClickMerge(action) {
      var _this$_callMonitor11;

      if (((_this$_callMonitor11 = this._callMonitor) === null || _this$_callMonitor11 === void 0 ? void 0 : _this$_callMonitor11.actionTypes.callsOnHoldClickMergeTrack) === action.type) {
        this.track('Click Merge (Calls OnHold)');
      }
    }
  }, {
    key: "_confirmMergeClickClose",
    value: function _confirmMergeClickClose(action) {
      var _this$_callMonitor12;

      if (((_this$_callMonitor12 = this._callMonitor) === null || _this$_callMonitor12 === void 0 ? void 0 : _this$_callMonitor12.actionTypes.confirmMergeClickCloseTrack) === action.type) {
        this.track('Click Close (ConfirmMerge Modal)');
      }
    }
  }, {
    key: "_confirmMergeClickMerge",
    value: function _confirmMergeClickMerge(action) {
      var _this$_callMonitor13;

      if (((_this$_callMonitor13 = this._callMonitor) === null || _this$_callMonitor13 === void 0 ? void 0 : _this$_callMonitor13.actionTypes.confirmMergeClickMergeTrack) === action.type) {
        this.track('Click Merge (ConfirmMerge Modal)');
      }
    }
  }, {
    key: "_removeParticipantClickRemove",
    value: function _removeParticipantClickRemove(action) {
      var _this$_conferenceCall;

      if (((_this$_conferenceCall = this._conferenceCall) === null || _this$_conferenceCall === void 0 ? void 0 : _this$_conferenceCall.actionTypes.removeParticipantClickRemoveTrack) === action.type) {
        this.track('Click Remove (RemoveParticipants Modal)');
      }
    }
  }, {
    key: "_removeParticipantClickCancel",
    value: function _removeParticipantClickCancel(action) {
      var _this$_conferenceCall2;

      if (((_this$_conferenceCall2 = this._conferenceCall) === null || _this$_conferenceCall2 === void 0 ? void 0 : _this$_conferenceCall2.actionTypes.removeParticipantClickCancelTrack) === action.type) {
        this.track('Cancel Remove (RemoveParticipants Modal)');
      }
    }
  }, {
    key: "_participantListClickHangup",
    value: function _participantListClickHangup(action) {
      var _this$_conferenceCall3;

      if (((_this$_conferenceCall3 = this._conferenceCall) === null || _this$_conferenceCall3 === void 0 ? void 0 : _this$_conferenceCall3.actionTypes.participantListClickHangupTrack) === action.type) {
        this.track('Click Hangup (Participant List)');
      }
    }
  }, {
    key: "_callControlClickParticipantArea",
    value: function _callControlClickParticipantArea(action) {
      var _this$_callMonitor14;

      if (((_this$_callMonitor14 = this._callMonitor) === null || _this$_callMonitor14 === void 0 ? void 0 : _this$_callMonitor14.actionTypes.callControlClickParticipantAreaClickTrack) === action.type) {
        this.track('Click Participant Area (Call Control)');
      }
    }
  }, {
    key: "_callsOnHoldClickHangup",
    value: function _callsOnHoldClickHangup(action) {
      var _this$_callMonitor15;

      if (((_this$_callMonitor15 = this._callMonitor) === null || _this$_callMonitor15 === void 0 ? void 0 : _this$_callMonitor15.actionTypes.callsOnHoldClickHangupTrack) === action.type) {
        this.track('Click Hangup (Calls OnHold)');
      }
    }
  }, {
    key: "_getTrackTarget",
    value: function _getTrackTarget(path) {
      if (!path) {
        return null;
      }

      var routes = path.split('/');
      var formatRoute = null;
      var needMatchSecondRoutes = ['calls'];

      if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
        formatRoute = "/".concat(routes[1], "/").concat(routes[2]);
      } else if (routes.length > 1) {
        formatRoute = "/".concat(routes[1]);
      }

      var targets = [{
        eventPostfix: 'Dialer',
        router: '/dialer'
      }, {
        eventPostfix: 'Compose SMS',
        router: '/composeText'
      }, {
        eventPostfix: 'Messages',
        router: '/messages'
      }, {
        eventPostfix: 'Conversation',
        router: '/conversations'
      }, {
        eventPostfix: 'Call History',
        router: '/history'
      }, {
        eventPostfix: 'All calls page',
        router: '/calls'
      }, {
        eventPostfix: 'Settings',
        router: '/settings'
      }, {
        eventPostfix: 'Conference',
        router: '/conference'
      }, {
        eventPostfix: 'Meeting',
        router: '/meeting'
      }, {
        eventPostfix: 'Contacts',
        router: '/contacts'
      }, {
        eventPostfix: 'Call Control',
        router: '/calls/active'
      }, {
        eventPostfix: 'Transfer',
        router: '/transfer'
      }, {
        eventPostfix: 'Small call control',
        router: '/simplifycallctrl'
      }, {
        eventPostfix: 'Flip',
        router: '/flip'
      }, {
        eventPostfix: 'Add',
        router: '/conferenceCall'
      }];
      var target = targets.find(function (target) {
        return formatRoute === target.router;
      });
      return target;
    }
  }, {
    key: "_schedule",
    value: function _schedule(action) {
      var _this$_meeting, _this$_rcVideo;

      if (((_this$_meeting = this._meeting) === null || _this$_meeting === void 0 ? void 0 : _this$_meeting.actionTypes.initScheduling) === action.type || ((_this$_rcVideo = this._rcVideo) === null || _this$_rcVideo === void 0 ? void 0 : _this$_rcVideo.actionTypes.initCreating) === action.type) {
        var _this$_routerInteract2;

        var target = this._getTrackTarget((_this$_routerInteract2 = this._routerInteraction) === null || _this$_routerInteract2 === void 0 ? void 0 : _this$_routerInteract2.currentPath);

        if (target) {
          this.trackSchedule(target);
        }
      }
    }
  }, {
    key: "trackList",
    get: function get() {
      return this._trackList;
    }
  }, {
    key: "analytics",
    get: function get() {
      return global.analytics;
    }
  }, {
    key: "lastActions",
    get: function get() {
      return this.state.lastActions;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "trackProps",
    get: function get() {
      var _this$_locale, _this$_locale2, _this$_extensionInfo;

      return {
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode,
        'App Language': ((_this$_locale = this._locale) === null || _this$_locale === void 0 ? void 0 : _this$_locale.currentLocale) || '',
        'Browser Language': ((_this$_locale2 = this._locale) === null || _this$_locale2 === void 0 ? void 0 : _this$_locale2.browserLocale) || '',
        'Extension Type': ((_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.info.type) || ''
      };
    }
  }]);

  return Analytics;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_authentication", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_authentication"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_logout", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_accountInfoReady", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_accountInfoReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callAttempt", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callConnected", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callConnected"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_webRTCRegistration", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_webRTCRegistration"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsAttempt", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentOver", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentOver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentError", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_logCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_logCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_logSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_logSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_clickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clickToDialPlaceRingOutCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_clickToDialPlaceRingOutCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_clickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_viewEntity", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_viewEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_createEntity", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_createEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_editCallLog", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_editCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_editSMSLog", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_editSMSLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_navigate", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_navigate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_inboundCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_inboundCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_coldTransfer", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_coldTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_textClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_textClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailClickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailDelete", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailDelete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailFlag", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailFlag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_contactDetailClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_contactDetailClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_contactDetailClickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_contactDetailClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callHistoryClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callHistoryClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callHistoryClickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callHistoryClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_conferenceInviteWithText", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_conferenceInviteWithText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_conferenceAddDialInNumber", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_conferenceAddDialInNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_conferenceJoinAsHost", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_conferenceJoinAsHost"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_showWhatsNew", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_showWhatsNew"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_allCallsClickHold", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_allCallsClickHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_allCallsClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_allCallsClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_allCallsCallItemClick", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_allCallsCallItemClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callControlClickAdd", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callControlClickAdd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callControlClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callControlClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_mergeCallControlClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_mergeCallControlClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_mergeCallControlClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_mergeCallControlClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_inboundCallConnectedTrack", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_inboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_outboundCallConnectedTrack", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_outboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callsOnHoldClickAdd", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsOnHoldClickAdd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callsOnHoldClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsOnHoldClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_confirmMergeClickClose", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_confirmMergeClickClose"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_confirmMergeClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_confirmMergeClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeParticipantClickRemove", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeParticipantClickRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeParticipantClickCancel", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeParticipantClickCancel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_participantListClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_participantListClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callControlClickParticipantArea", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callControlClickParticipantArea"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callsOnHoldClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsOnHoldClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_schedule", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_schedule"), _class2.prototype)), _class2)) || _class);
exports.Analytics = Analytics;
//# sourceMappingURL=Analytics.js.map
