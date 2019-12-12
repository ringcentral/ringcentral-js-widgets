"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.INIT_TRACK_LIST = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

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

require("core-js/modules/es6.object.assign");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _saveBlob = _interopRequireDefault(require("../../lib/saveBlob"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getAnalyticsReducer = _interopRequireDefault(require("./getAnalyticsReducer"));

var _Analytics = require("../../lib/Analytics");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var INIT_TRACK_LIST = ['_authentication', '_logout', '_callAttempt', '_callConnected', '_webRTCRegistration', '_smsAttempt', '_smsSentOver', '_smsSentError', '_logCall', '_logSMS', '_clickToDial', '_clickToSMS', '_viewEntity', '_createEntity', '_editCallLog', '_editSMSLog', '_navigate', '_inboundCall', '_coldTransfer', '_textClickToDial', '_voicemailClickToDial', '_voicemailClickToSMS', '_voicemailDelete', '_voicemailFlag', '_contactDetailClickToDial', '_contactDetailClickToSMS', '_callHistoryClickToDial', '_callHistoryClickToSMS', '_conferenceInviteWithText', '_conferenceAddDialInNumber', '_conferenceJoinAsHost', '_showWhatsNew', '_allCallsClickHangup', '_allCallsClickHold', '_allCallsCallItemClick', '_callControlClickAdd', '_mergeCallControlClickMerge', '_mergeCallControlClickHangup', '_callsOnHoldClickHangup', '_callsOnHoldClickAdd', '_callsOnHoldClickMerge', '_confirmMergeClickClose', '_confirmMergeClickMerge', '_removeParticipantClickRemove', '_removeParticipantClickCancel', '_participantListClickHangup', '_callControlClickMerge', '_callControlClickParticipantArea', '_accountInfoReady', '_schedule', '_clickToDialPlaceRingOutCall', '_inboundCallConnectedTrack', '_outboundCallConnectedTrack']; // TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`

/**
 * @class
 * @description Analytics module.
 */

exports.INIT_TRACK_LIST = INIT_TRACK_LIST;
var Analytics = (_dec = (0, _di.Module)({
  deps: [{
    dep: 'Auth',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'Contacts',
    optional: true
  }, {
    dep: 'MessageSender',
    optional: true
  }, {
    dep: 'MessageStore',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'CallHistory',
    optional: true
  }, {
    dep: 'Conference',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }, {
    dep: 'AnalyticsAdapter',
    optional: true
  }, {
    dep: 'AnalyticsOptions',
    optional: true
  }, {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'AccountInfo',
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
  }, {
    dep: 'extensionInfo',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Analytics, _RcModule);

  function Analytics(_ref) {
    var _this;

    var analyticsKey = _ref.analyticsKey,
        appName = _ref.appName,
        appVersion = _ref.appVersion,
        brandCode = _ref.brandCode,
        accountInfo = _ref.accountInfo,
        adapter = _ref.adapter,
        auth = _ref.auth,
        call = _ref.call,
        callHistory = _ref.callHistory,
        callMonitor = _ref.callMonitor,
        conference = _ref.conference,
        conferenceCall = _ref.conferenceCall,
        contactDetailsUI = _ref.contactDetailsUI,
        contacts = _ref.contacts,
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
        extensionInfo = _ref.extensionInfo,
        options = _objectWithoutProperties(_ref, ["analyticsKey", "appName", "appVersion", "brandCode", "accountInfo", "adapter", "auth", "call", "callHistory", "callMonitor", "conference", "conferenceCall", "contactDetailsUI", "contacts", "messageSender", "messageStore", "routerInteraction", "userGuide", "webphone", "locale", "meeting", "rcVideo", "useLog", "lingerThreshold", "extensionInfo"]);

    _classCallCheck(this, Analytics);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Analytics).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    }))); // config

    _this._analyticsKey = analyticsKey;
    _this._appName = appName;
    _this._appVersion = appVersion;
    _this._brandCode = brandCode; // modules

    _this._accountInfo = accountInfo;
    _this._adapter = adapter;
    _this._auth = auth;
    _this._call = call;
    _this._callHistory = callHistory;
    _this._callMonitor = callMonitor;
    _this._conference = conference;
    _this._conferenceCall = conferenceCall;
    _this._contactDetailsUI = contactDetailsUI;
    _this._contacts = contacts;
    _this._messageSender = messageSender;
    _this._messageStore = messageStore;
    _this._router = routerInteraction;
    _this._userGuide = userGuide;
    _this._webphone = webphone;
    _this._locale = locale;
    _this._meeting = meeting;
    _this._rcVideo = rcVideo;
    _this._extensionInfo = extensionInfo; // init

    _this._reducer = (0, _getAnalyticsReducer["default"])(_this.actionTypes);
    _this._segment = (0, _Analytics.Segment)();
    _this._trackList = INIT_TRACK_LIST;
    _this._useLog = useLog;
    _this._lingerThreshold = lingerThreshold;
    _this._logs = [];
    _this._lingerTimeout = null;
    return _this;
  }

  _createClass(Analytics, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "identify",
    value: function identify(_ref2) {
      var userId = _ref2.userId,
          props = _objectWithoutProperties(_ref2, ["userId"]);

      if (this.analytics) {
        this.analytics.identify(userId, props);
      }
    }
  }, {
    key: "track",
    value: function track(event, _ref3) {
      var properties = Object.assign({}, _ref3);

      if (!this.analytics) {
        return;
      }

      var trackProps = _objectSpread({}, this.trackProps, {}, properties);

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
    value: function trackNavigation(_ref4) {
      var router = _ref4.router,
          eventPostfix = _ref4.eventPostfix;
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
    value: function trackLinger(_ref5) {
      var router = _ref5.router,
          eventPostfix = _ref5.eventPostfix;
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
    value: function trackSchedule(_ref6) {
      var router = _ref6.router;
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
    value: function _onStateChange() {
      return regeneratorRuntime.async(function _onStateChange$(_context) {
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
      }, null, this);
    }
  }, {
    key: "_processActions",
    value: function _processActions() {
      var _this3 = this;

      return regeneratorRuntime.async(function _processActions$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.lastActions.length) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return regeneratorRuntime.awrap((0, _sleep["default"])(300));

            case 3:
              this.lastActions.forEach(function (action) {
                _this3._trackList.forEach(function (key) {
                  _this3[key](action);
                });
              });
              this._promise = null;
              this.store.dispatch({
                type: this.actionTypes.clear
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Append more action to track
     * First, Inherit this class and declare channel specific method on it
     * Then append more method name to track using this method
     * @param {string[]} methodNames
     */

  }, {
    key: "appendTrackList",
    value: function appendTrackList(methodNames) {
      var _this$_trackList;

      (_this$_trackList = this._trackList).push.apply(_this$_trackList, _toConsumableArray(methodNames));
    }
  }, {
    key: "_authentication",
    value: function _authentication(action) {
      if (this._auth && this._auth.actionTypes.loginSuccess === action.type) {
        this.identify({
          userId: this._auth.ownerId
        });
        this.track('Authentication');
      }
    }
  }, {
    key: "_logout",
    value: function _logout(action) {
      if (this._auth && this._auth.actionTypes.logout === action.type) {
        this.track('Logout');
      }
    }
  }, {
    key: "_accountInfoReady",
    value: function _accountInfoReady(action) {
      if (this._accountInfo && this._accountInfo.actionTypes.initSuccess === action.type) {
        this.identify({
          userId: this._accountInfo._auth.ownerId,
          accountId: this._accountInfo.id,
          servicePlanId: this._accountInfo.servicePlan.id,
          edition: this._accountInfo.servicePlan.edition,
          CRMEnabled: this._accountInfo._rolesAndPermissions.tierEnabled
        });
      }
    }
  }, {
    key: "_callAttempt",
    value: function _callAttempt(action) {
      if (this._call && this._call.actionTypes.connect === action.type) {
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
      if (this._call && this._call.actionTypes.connectSuccess === action.type) {
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
      if (this._webphone && this._webphone.actionTypes.registered === action.type) {
        this.track('WebRTC registration');
      }
    }
  }, {
    key: "_smsAttempt",
    value: function _smsAttempt(action) {
      if (this._messageSender && this._messageSender.actionTypes.send === action.type) {
        this.track('SMS Attempt');
      }
    }
  }, {
    key: "_smsSentOver",
    value: function _smsSentOver(action) {
      if (this._messageSender && this._messageSender.actionTypes.sendOver === action.type) {
        this.track('SMS: SMS sent succesfully');
      }
    }
  }, {
    key: "_smsSentError",
    value: function _smsSentError(action) {
      if (this._messageSender && this._messageSender.actionTypes.sendError === action.type) {
        this.track('SMS: SMS sent failed');
      }
    }
  }, {
    key: "_logCall",
    value: function _logCall(action) {
      if (this._adapter && this._adapter.actionTypes.createCallLog === action.type) {
        this.track('Log Call');
      }
    }
  }, {
    key: "_logSMS",
    value: function _logSMS(action) {
      if (this._adapter && this._adapter.actionTypes.createSMSLog === action.type) {
        this.track('Log SMS');
      }
    }
  }, {
    key: "_clickToDial",
    value: function _clickToDial(action) {
      if (this._adapter && this._adapter.actionTypes.clickToDial === action.type) {
        this.track('Click To Dial');
      }
    }
  }, {
    key: "_clickToDialPlaceRingOutCall",
    value: function _clickToDialPlaceRingOutCall(action) {
      if (this._adapter && this._adapter.actionTypes.clickToDial === action.type && action.callSettingMode !== _callingModes["default"].webphone) {
        this.track('Call: Place RingOut call/Click to Dial ');
      }
    }
  }, {
    key: "_clickToSMS",
    value: function _clickToSMS(action) {
      if (this._adapter && this._adapter.actionTypes.clickToSMS === action.type) {
        this.track('Click To SMS');
      }
    }
  }, {
    key: "_viewEntity",
    value: function _viewEntity(action) {
      if (this._adapter && this._adapter.actionTypes.viewEntity === action.type) {
        this.track('View Entity Details');
      }
    }
  }, {
    key: "_createEntity",
    value: function _createEntity(action) {
      if (this._adapter && this._adapter.actionTypes.createEntity === action.type) {
        this.track('Add Entity');
      }
    }
  }, {
    key: "_editCallLog",
    value: function _editCallLog(action) {
      if (this._adapter && this._adapter.actionTypes.editCallLog === action.type) {
        this.track('Edit Call Log');
      }
    }
  }, {
    key: "_editSMSLog",
    value: function _editSMSLog(action) {
      if (this._adapter && this._adapter.actionTypes.editSMSLog === action.type) {
        this.track('Edit SMS Log');
      }
    }
  }, {
    key: "_navigate",
    value: function _navigate(action) {
      var _this4 = this;

      if (this._router && this._router.actionTypes.locationChange === action.type) {
        if (this._lingerTimeout) {
          clearTimeout(this._lingerTimeout);
        }

        var path = action.payload && action.payload.pathname;

        var target = this._getTrackTarget(path);

        if (target) {
          this.trackNavigation(_objectSpread({}, target));
        }

        this._lingerTimeout = setTimeout(function () {
          if (_this4._router.currentPath !== path) {
            return;
          }

          _this4._lingerTimeout = null;

          _this4.trackLinger(_objectSpread({}, target));
        }, this._lingerThreshold);
      }
    }
  }, {
    key: "_inboundCall",
    value: function _inboundCall(action) {
      if (this._webphone && this._webphone.actionTypes.callAnswer === action.type) {
        this.track('Inbound WebRTC Call Connected');
      }
    }
  }, {
    key: "_coldTransfer",
    value: function _coldTransfer(action) {
      if (this._webphone && this._webphone.isOnTransfer === true && this._webphone.actionTypes.updateSessions === action.type) {
        this.track('Cold Transfer Call');
      }
    }
  }, {
    key: "_textClickToDial",
    value: function _textClickToDial(action) {
      if (this._messageStore && this._messageStore.actionTypes.clickToCall === action.type && (action.fromType === 'Pager' || action.fromType === 'SMS')) {
        this.track('Click To Dial (Text List)');
      }
    }
  }, {
    key: "_voicemailClickToDial",
    value: function _voicemailClickToDial(action) {
      if (this._messageStore && this._messageStore.actionTypes.clickToCall === action.type && action.fromType === 'VoiceMail') {
        this.track('Click To Dial (Voicemail List)');
      }
    }
  }, {
    key: "_voicemailClickToSMS",
    value: function _voicemailClickToSMS(action) {
      if (this._messageStore && this._messageStore.actionTypes.clickToSMS === action.type) {
        this.track('Click to SMS (Voicemail List)');
      }
    }
  }, {
    key: "_voicemailDelete",
    value: function _voicemailDelete(action) {
      if (this._messageStore && this._messageStore.actionTypes.removeMessage === action.type) {
        this.track('Delete Voicemail');
      }
    }
  }, {
    key: "_voicemailFlag",
    value: function _voicemailFlag(action) {
      if (this._messageStore && this._messageStore.actionTypes.markMessages === action.type) {
        this.track('Flag Voicemail');
      }
    }
  }, {
    key: "_contactDetailClickToDial",
    value: function _contactDetailClickToDial(action) {
      if (this._contactDetailsUI && this._contactDetailsUI.actionTypes.clickToCall === action.type) {
        this.track('Click To Dial (Contact Details)');
      }
    }
  }, {
    key: "_contactDetailClickToSMS",
    value: function _contactDetailClickToSMS(action) {
      if (this._contactDetailsUI && this._contactDetailsUI.actionTypes.clickToSMS === action.type) {
        this.track('Click To SMS (Contact Details)');
      }
    }
  }, {
    key: "_callHistoryClickToDial",
    value: function _callHistoryClickToDial(action) {
      if (this._callHistory && this._callHistory.actionTypes.clickToCall === action.type) {
        this.track('Click To dial (Call History)');
      }
    }
  }, {
    key: "_callHistoryClickToSMS",
    value: function _callHistoryClickToSMS(action) {
      if (this._callHistory && this._callHistory.actionTypes.clickToSMS === action.type) {
        this.track('Click To SMS (Call History)');
      }
    }
  }, {
    key: "_conferenceInviteWithText",
    value: function _conferenceInviteWithText(action) {
      if (this._conference && this._conference.actionTypes.inviteWithText === action.type) {
        this.track('Invite With Text (Conference)');
      }
    }
  }, {
    key: "_conferenceAddDialInNumber",
    value: function _conferenceAddDialInNumber(action) {
      if (this._conference && this._conference.actionTypes.updateAdditionalNumbers === action.type) {
        this.track('Select Additional Dial-in Number (Conference)');
      }
    }
  }, {
    key: "_conferenceJoinAsHost",
    value: function _conferenceJoinAsHost(action) {
      if (this._conference && this._conference.actionTypes.joinAsHost === action.type) {
        this.track('Join As Host (Conference)');
      }
    }
  }, {
    key: "_showWhatsNew",
    value: function _showWhatsNew(action) {
      if (this._userGuide && this._userGuide.actionTypes.updateCarousel === action.type && action.curIdx === 0 && action.playing) {
        this.track("What's New");
      }
    }
  }, {
    key: "_allCallsClickHold",
    value: function _allCallsClickHold(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.allCallsClickHoldTrack === action.type) {
        this.track('Click Hold (All Calls)');
      }
    }
  }, {
    key: "_allCallsClickHangup",
    value: function _allCallsClickHangup(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.allCallsClickHangupTrack === action.type) {
        this.track('Click Hangup (All Calls)');
      }
    }
  }, {
    key: "_allCallsCallItemClick",
    value: function _allCallsCallItemClick(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callItemClickTrack === action.type) {
        this.track('Click Call Item (All Calls)');
      }
    }
  }, {
    key: "_callControlClickAdd",
    value: function _callControlClickAdd(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callControlClickAddTrack === action.type) {
        this.track('Click Add (Call Control)');
      }
    }
  }, {
    key: "_callControlClickMerge",
    value: function _callControlClickMerge(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callControlClickMergeTrack === action.type && !Object.values(this._conferenceCall.state.mergingPair).length) {
        this.track('Click Merge (Call Control)');
      }
    }
  }, {
    key: "_mergeCallControlClickMerge",
    value: function _mergeCallControlClickMerge(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callControlClickMergeTrack === action.type && Object.values(this._conferenceCall.state.mergingPair).length) {
        this.track('Click Merge (Merge Call Control)');
      }
    }
  }, {
    key: "_mergeCallControlClickHangup",
    value: function _mergeCallControlClickHangup(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.mergeControlClickHangupTrack === action.type) {
        this.track('Click Hangup (Merge Call Control)');
      }
    }
  }, {
    key: "_inboundCallConnectedTrack",
    value: function _inboundCallConnectedTrack(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.inboundCallConnectedTrack === action.type) {
        this.track('Call: Inbound call connected');
      }
    }
  }, {
    key: "_outboundCallConnectedTrack",
    value: function _outboundCallConnectedTrack(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.outboundCallConnectedTrack === action.type) {
        this.track('Call: Outbound RingOut Call connected');
      }
    }
  }, {
    key: "_callsOnHoldClickAdd",
    value: function _callsOnHoldClickAdd(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callsOnHoldClickAddTrack === action.type) {
        this.track('Click Add (Calls OnHold)');
      }
    }
  }, {
    key: "_callsOnHoldClickMerge",
    value: function _callsOnHoldClickMerge(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callsOnHoldClickMergeTrack === action.type) {
        this.track('Click Merge (Calls OnHold)');
      }
    }
  }, {
    key: "_confirmMergeClickClose",
    value: function _confirmMergeClickClose(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.confirmMergeClickCloseTrack === action.type) {
        this.track('Click Close (ConfirmMerge Modal)');
      }
    }
  }, {
    key: "_confirmMergeClickMerge",
    value: function _confirmMergeClickMerge(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.confirmMergeClickMergeTrack === action.type) {
        this.track('Click Merge (ConfirmMerge Modal)');
      }
    }
  }, {
    key: "_removeParticipantClickRemove",
    value: function _removeParticipantClickRemove(action) {
      if (this._conferenceCall && this._conferenceCall.actionTypes.removeParticipantClickRemoveTrack === action.type) {
        this.track('Click Remove (RemoveParticipants Modal)');
      }
    }
  }, {
    key: "_removeParticipantClickCancel",
    value: function _removeParticipantClickCancel(action) {
      if (this._conferenceCall && this._conferenceCall.actionTypes.removeParticipantClickCancelTrack === action.type) {
        this.track('Cancel Remove (RemoveParticipants Modal)');
      }
    }
  }, {
    key: "_participantListClickHangup",
    value: function _participantListClickHangup(action) {
      if (this._conferenceCall && this._conferenceCall.actionTypes.participantListClickHangupTrack === action.type) {
        this.track('Click Hangup (Participant List)');
      }
    }
  }, {
    key: "_callControlClickParticipantArea",
    value: function _callControlClickParticipantArea(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callControlClickParticipantAreaClickTrack === action.type) {
        this.track('Click Participant Area (Call Control)');
      }
    }
  }, {
    key: "_callsOnHoldClickHangup",
    value: function _callsOnHoldClickHangup(action) {
      if (this._callMonitor && this._callMonitor.actionTypes.callsOnHoldClickHangupTrack === action.type) {
        this.track('Click Hangup (Calls OnHold)');
      }
    }
  }, {
    key: "_getTrackTarget",
    value: function _getTrackTarget(path) {
      if (path) {
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
        return targets.find(function (target) {
          return formatRoute === target.router;
        });
      }

      return undefined;
    }
  }, {
    key: "_schedule",
    value: function _schedule(action) {
      if ((this._meeting && this._meeting.actionTypes.initScheduling === action.type || this._rcVideo && this._rcVideo.actionTypes.initCreating === action.type) && this._router) {
        this.trackSchedule(this._getTrackTarget(this._router.currentPath));
      }
    }
  }, {
    key: "analytics",
    get: function get() {
      return global.analytics;
    }
  }, {
    key: "lastActions",
    get: function get() {
      return this.state.lastAction;
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
      return {
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode,
        'App Language': this._locale ? this._locale.currentLocale : '',
        'Browser Language': this._locale ? this._locale.browserLocale : '',
        'Extension Type': this._extensionInfo ? this._extensionInfo.info.type : ''
      };
    }
  }]);

  return Analytics;
}(_RcModule2["default"])) || _class);
exports["default"] = Analytics;
//# sourceMappingURL=index.js.map
