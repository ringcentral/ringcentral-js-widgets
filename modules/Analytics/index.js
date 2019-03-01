"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.values");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getAnalyticsReducer = _interopRequireDefault(require("./getAnalyticsReducer"));

var _Analytics = require("../../lib/Analytics");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var INIT_TRACK_LIST = ['_authentication', '_logout', '_callAttempt', '_callConnected', '_webRTCRegistration', '_smsAttempt', '_smsSent', '_logCall', '_logSMS', '_clickToDial', '_clickToSMS', '_viewEntity', '_createEntity', '_editCallLog', '_editSMSLog', '_navigate', '_inboundCall', '_coldTransfer', '_textClickToDial', '_voicemailClickToDial', '_voicemailClickToSMS', '_voicemailDelete', '_voicemailFlag', '_contactDetailClickToDial', '_contactDetailClickToSMS', '_callHistoryClickToDial', '_callHistoryClickToSMS', '_conferenceInviteWithText', '_conferenceAddDialInNumber', '_conferenceJoinAsHost', '_showWhatsNew', '_allCallsClickHangup', '_allCallsClickHold', '_allCallsCallItemClick', '_callControlClickAdd', '_mergeCallControlClickMerge', '_mergeCallControlClickHangup', '_callsOnHoldClickHangup', '_callsOnHoldClickAdd', '_callsOnHoldClickMerge', '_confirmMergeClickClose', '_confirmMergeClickMerge', '_removeParticipantClickRemove', '_removeParticipantClickCancel', '_participantListClickHangup', '_callControlClickMerge', '_callControlClickParticipantArea'];
/**
 * @class
 * @description Analytics module.
 */

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
    dep: 'ContactDetails',
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
        auth = _ref.auth,
        call = _ref.call,
        webphone = _ref.webphone,
        contacts = _ref.contacts,
        messageSender = _ref.messageSender,
        adapter = _ref.adapter,
        routerInteraction = _ref.routerInteraction,
        messageStore = _ref.messageStore,
        contactDetails = _ref.contactDetails,
        callHistory = _ref.callHistory,
        conference = _ref.conference,
        userGuide = _ref.userGuide,
        callMonitor = _ref.callMonitor,
        conferenceCall = _ref.conferenceCall,
        options = _objectWithoutProperties(_ref, ["analyticsKey", "appName", "appVersion", "brandCode", "auth", "call", "webphone", "contacts", "messageSender", "adapter", "routerInteraction", "messageStore", "contactDetails", "callHistory", "conference", "userGuide", "callMonitor", "conferenceCall"]);

    _classCallCheck(this, Analytics);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Analytics).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes.default
    }))); // config

    _this._analyticsKey = analyticsKey;
    _this._appName = appName;
    _this._appVersion = appVersion;
    _this._brandCode = brandCode; // modules

    _this._auth = auth;
    _this._call = call;
    _this._webphone = webphone;
    _this._contacts = contacts;
    _this._messageSender = messageSender;
    _this._adapter = adapter;
    _this._router = routerInteraction;
    _this._messageStore = messageStore;
    _this._contactDetails = contactDetails;
    _this._callHistory = callHistory;
    _this._conference = conference;
    _this._userGuide = userGuide;
    _this._callMonitor = callMonitor;
    _this._conferenceCall = conferenceCall; // init

    _this._reducer = (0, _getAnalyticsReducer.default)(_this.actionTypes);
    _this._segment = (0, _Analytics.Segment)();
    _this._trackList = INIT_TRACK_LIST;
    return _this;
  }

  _createClass(Analytics, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });

      this._segment.load(this._analyticsKey);
    }
  }, {
    key: "identify",
    value: function identify(_ref2) {
      var userId = _ref2.userId,
          name = _ref2.name;
      global.analytics.identify(userId, {
        name: name
      });
    }
  }, {
    key: "track",
    value: function track(event, _ref3) {
      var properties = Object.assign({}, _ref3);

      var trackProps = _objectSpread({
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      }, properties);

      global.analytics.track(event, trackProps);
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
      this.track("Navigator Clicked (".concat(eventPostfix, ")"), trackProps);
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.ready && this.lastActions.length && !this._promise) {
                  this._promise = this._processActions();
                }

              case 1:
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
      var _processActions2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.lastActions.length) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return (0, _sleep.default)(300);

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
        }, _callee2, this);
      }));

      function _processActions() {
        return _processActions2.apply(this, arguments);
      }

      return _processActions;
    }()
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
    key: "_callAttempt",
    value: function _callAttempt(action) {
      if (this._call && this._call.actionTypes.connect === action.type) {
        if (action.callSettingMode === _callingModes.default.webphone) {
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
        if (action.callSettingMode === _callingModes.default.webphone) {
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
    key: "_smsSent",
    value: function _smsSent(action) {
      if (this._messageSender && this._messageSender.actionTypes.sendOver === action.type) {
        this.track('SMS Sent');
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
      if (this._router && this._router.actionTypes.locationChange === action.type) {
        var path = action.payload && action.payload.pathname;

        var target = this._getTrackTarget(path);

        if (target) {
          this.trackNavigation(_objectSpread({}, target));
        }
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
      if (this._contactDetails && this._contactDetails.actionTypes.clickToCall === action.type) {
        this.track('Click To Dial (Contact Details)');
      }
    }
  }, {
    key: "_contactDetailClickToSMS",
    value: function _contactDetailClickToSMS(action) {
      if (this._contactDetails && this._contactDetails.actionTypes.clickToSMS === action.type) {
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
        this.track('What\'s New');
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
          eventPostfix: 'Call List',
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
        }];
        return targets.find(function (target) {
          return formatRoute === target.router;
        });
      }

      return undefined;
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
      return _moduleStatuses.default.ready;
    }
  }, {
    key: "ready",
    get: function get() {
      return true;
    }
  }, {
    key: "pending",
    get: function get() {
      return false;
    }
  }]);

  return Analytics;
}(_RcModule2.default)) || _class);
exports.default = Analytics;
//# sourceMappingURL=index.js.map
