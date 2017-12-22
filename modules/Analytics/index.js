'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getAnalyticsReducer = require('./getAnalyticsReducer');

var _getAnalyticsReducer2 = _interopRequireDefault(_getAnalyticsReducer);

var _Analytics = require('../../lib/Analytics');

var _callingModes = require('../CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Analytics module.
 */
var Analytics = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Call', 'Webphone', 'Contacts', 'MessageSender', 'MessageStore', 'ContactDetails', 'CallHistory', 'Conference', { dep: 'RouterInteraction', optional: true }, { dep: 'AnalyticsAdapter', optional: true }, { dep: 'AnalyticsOptions', optional: true }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(Analytics, _RcModule);

  function Analytics(_ref) {
    var auth = _ref.auth,
        call = _ref.call,
        webphone = _ref.webphone,
        contacts = _ref.contacts,
        messageSender = _ref.messageSender,
        adapter = _ref.adapter,
        routerInteraction = _ref.routerInteraction,
        analyticsKey = _ref.analyticsKey,
        appName = _ref.appName,
        appVersion = _ref.appVersion,
        brandCode = _ref.brandCode,
        messageStore = _ref.messageStore,
        contactDetails = _ref.contactDetails,
        callHistory = _ref.callHistory,
        conference = _ref.conference,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'call', 'webphone', 'contacts', 'messageSender', 'adapter', 'routerInteraction', 'analyticsKey', 'appName', 'appVersion', 'brandCode', 'messageStore', 'contactDetails', 'callHistory', 'conference']);
    (0, _classCallCheck3.default)(this, Analytics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Analytics.__proto__ || (0, _getPrototypeOf2.default)(Analytics)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._call = call;
    _this._webphone = webphone;
    _this._contacts = contacts;
    _this._messageSender = messageSender;
    _this._adapter = adapter;
    _this._router = routerInteraction;
    _this._analyticsKey = analyticsKey;
    _this._appName = appName;
    _this._appVersion = appVersion;
    _this._brandCode = brandCode;
    _this._messageStore = messageStore;
    _this._contactDetails = contactDetails;
    _this._callHistory = callHistory;
    _this._conference = conference;
    _this._reducer = (0, _getAnalyticsReducer2.default)(_this.actionTypes);
    _this._segment = (0, _Analytics.Segment)();
    return _this;
  }

  (0, _createClass3.default)(Analytics, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
      this._segment.load(this._analyticsKey);
    }
  }, {
    key: 'identify',
    value: function identify(_ref2) {
      var userId = _ref2.userId,
          name = _ref2.name;

      global.analytics.identify(userId, {
        name: name
      });
    }
  }, {
    key: 'track',
    value: function track(event, _ref3) {
      var properties = (0, _objectWithoutProperties3.default)(_ref3, []);

      var trackProps = (0, _extends3.default)({
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      }, properties);
      global.analytics.track(event, trackProps);
    }
  }, {
    key: 'trackNavigation',
    value: function trackNavigation(_ref4) {
      var router = _ref4.router,
          eventPostfix = _ref4.eventPostfix;

      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track('Navigator Clicked (' + eventPostfix + ')', trackProps);
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.ready && this.lastActions.length && !this._promise) {
                  this._promise = this._processActions();
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref5.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_processActions',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.lastActions.length) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return (0, _sleep2.default)(300);

              case 3:
                this.lastActions.forEach(function (action) {
                  ['_authentication', '_logout', '_callAttempt', '_callConnected', '_webRTCRegistration', '_smsAttempt', '_smsSent', '_logCall', '_logSMS', '_clickToDial', '_clickToSMS', '_viewEntity', '_createEntity', '_editCallLog', '_editSMSLog', '_navigate', '_inboundCall', '_coldTransfer', '_textClickToDial', '_voicemailClickToDial', '_voicemailClickToSMS', '_voicemailDelete', '_voicemailFlag', '_contactDetailClickToDial', '_contactDetailClickToSMS', '_callHistoryClickToDial', '_callHistoryClickToSMS', '_conferenceInviteWithText', '_conferenceAddDialInNumber', '_conferenceJoinAsHost'].forEach(function (key) {
                    _this3[key](action);
                  });
                });
                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.clear
                });

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processActions() {
        return _ref6.apply(this, arguments);
      }

      return _processActions;
    }()
  }, {
    key: '_authentication',
    value: function _authentication(action) {
      if (this._auth && this._auth.actionTypes.loginSuccess === action.type) {
        this.identify({
          userId: this._auth.ownerId
        });
        this.track('Authentication');
      }
    }
  }, {
    key: '_logout',
    value: function _logout(action) {
      if (this._auth && this._auth.actionTypes.logout === action.type) {
        this.track('Logout');
      }
    }
  }, {
    key: '_callAttempt',
    value: function _callAttempt(action) {
      if (this._call && this._call.actionTypes.connect === action.type) {
        if (action.callSettingMode === _callingModes2.default.webphone) {
          this.track('Call Attempt WebRTC');
        } else {
          this.track('Call Attempt', {
            callSettingMode: action.callSettingMode
          });
        }
      }
    }
  }, {
    key: '_callConnected',
    value: function _callConnected(action) {
      if (this._call && this._call.actionTypes.connectSuccess === action.type) {
        if (action.callSettingMode === _callingModes2.default.webphone) {
          this.track('Outbound WebRTC Call Connected');
        } else {
          this.track('Outbound Call Connected', {
            callSettingMode: action.callSettingMode
          });
        }
      }
    }
  }, {
    key: '_webRTCRegistration',
    value: function _webRTCRegistration(action) {
      if (this._webphone && this._webphone.actionTypes.registered === action.type) {
        this.track('WebRTC registration');
      }
    }
  }, {
    key: '_smsAttempt',
    value: function _smsAttempt(action) {
      if (this._messageSender && this._messageSender.actionTypes.send === action.type) {
        this.track('SMS Attempt');
      }
    }
  }, {
    key: '_smsSent',
    value: function _smsSent(action) {
      if (this._messageSender && this._messageSender.actionTypes.sendOver === action.type) {
        this.track('SMS Sent');
      }
    }
  }, {
    key: '_logCall',
    value: function _logCall(action) {
      if (this._adapter && this._adapter.actionTypes.createCallLog === action.type) {
        this.track('Log Call');
      }
    }
  }, {
    key: '_logSMS',
    value: function _logSMS(action) {
      if (this._adapter && this._adapter.actionTypes.createSMSLog === action.type) {
        this.track('Log SMS');
      }
    }
  }, {
    key: '_clickToDial',
    value: function _clickToDial(action) {
      if (this._adapter && this._adapter.actionTypes.clickToDial === action.type) {
        this.track('Click To Dial');
      }
    }
  }, {
    key: '_clickToSMS',
    value: function _clickToSMS(action) {
      if (this._adapter && this._adapter.actionTypes.clickToSMS === action.type) {
        this.track('Click To SMS');
      }
    }
  }, {
    key: '_viewEntity',
    value: function _viewEntity(action) {
      if (this._adapter && this._adapter.actionTypes.viewEntity === action.type) {
        this.track('View Entity Details');
      }
    }
  }, {
    key: '_createEntity',
    value: function _createEntity(action) {
      if (this._adapter && this._adapter.actionTypes.createEntity === action.type) {
        this.track('Add Entity');
      }
    }
  }, {
    key: '_editCallLog',
    value: function _editCallLog(action) {
      if (this._adapter && this._adapter.actionTypes.editCallLog === action.type) {
        this.track('Edit Call Log');
      }
    }
  }, {
    key: '_editSMSLog',
    value: function _editSMSLog(action) {
      if (this._adapter && this._adapter.actionTypes.editSMSLog === action.type) {
        this.track('Edit SMS Log');
      }
    }
  }, {
    key: '_navigate',
    value: function _navigate(action) {
      if (this._router && this._router.actionTypes.locationChange === action.type) {
        var path = action.payload && action.payload.pathname;
        var target = this._getTrackTarget(path);
        if (target) {
          this.trackNavigation((0, _extends3.default)({}, target));
        }
      }
    }
  }, {
    key: '_inboundCall',
    value: function _inboundCall(action) {
      if (this._webphone && this._webphone.actionTypes.callAnswer === action.type) {
        this.track('Inbound WebRTC Call Connected');
      }
    }
  }, {
    key: '_coldTransfer',
    value: function _coldTransfer(action) {
      if (this._webphone && this._webphone.isOnTransfer === true && this._webphone.actionTypes.updateSessions === action.type) {
        this.track('Cold Transfer Call');
      }
    }
  }, {
    key: '_textClickToDial',
    value: function _textClickToDial(action) {
      if (this._messageStore && this._messageStore.actionTypes.clickToCall === action.type && (action.fromType === 'Pager' || action.fromType === 'SMS')) {
        this.track('Click To Dial (Text List)');
      }
    }
  }, {
    key: '_voicemailClickToDial',
    value: function _voicemailClickToDial(action) {
      if (this._messageStore && this._messageStore.actionTypes.clickToCall === action.type && action.fromType === 'VoiceMail') {
        this.track('Click To Dial (Voicemail List)');
      }
    }
  }, {
    key: '_voicemailClickToSMS',
    value: function _voicemailClickToSMS(action) {
      if (this._messageStore && this._messageStore.actionTypes.clickToSMS === action.type) {
        this.track('Click to SMS (Voicemail List)');
      }
    }
  }, {
    key: '_voicemailDelete',
    value: function _voicemailDelete(action) {
      if (this._messageStore && this._messageStore.actionTypes.removeMessage === action.type) {
        this.track('Delete Voicemail');
      }
    }
  }, {
    key: '_voicemailFlag',
    value: function _voicemailFlag(action) {
      if (this._messageStore && this._messageStore.actionTypes.markMessages === action.type) {
        this.track('Flag Voicemail');
      }
    }
  }, {
    key: '_contactDetailClickToDial',
    value: function _contactDetailClickToDial(action) {
      if (this._contactDetails && this._contactDetails.actionTypes.clickToCall === action.type) {
        this.track('Click To Dial (Contact Details)');
      }
    }
  }, {
    key: '_contactDetailClickToSMS',
    value: function _contactDetailClickToSMS(action) {
      if (this._contactDetails && this._contactDetails.actionTypes.clickToSMS === action.type) {
        this.track('Click To SMS (Contact Details)');
      }
    }
  }, {
    key: '_callHistoryClickToDial',
    value: function _callHistoryClickToDial(action) {
      if (this._callHistory && this._callHistory.actionTypes.clickToCall === action.type) {
        this.track('Click To dial (Call History)');
      }
    }
  }, {
    key: '_callHistoryClickToSMS',
    value: function _callHistoryClickToSMS(action) {
      if (this._callHistory && this._callHistory.actionTypes.clickToSMS === action.type) {
        this.track('Click To SMS (Call History)');
      }
    }
  }, {
    key: '_conferenceInviteWithText',
    value: function _conferenceInviteWithText(action) {
      if (this._conference && this._conference.actionTypes.inviteWithText === action.type) {
        this.track('Invite With Text (Conference)');
      }
    }
  }, {
    key: '_conferenceAddDialInNumber',
    value: function _conferenceAddDialInNumber(action) {
      if (this._conference && this._conference.actionTypes.updateAdditionalNumbers === action.type) {
        this.track('Select Additional Dial-in Number (Conference)');
      }
    }
  }, {
    key: '_conferenceJoinAsHost',
    value: function _conferenceJoinAsHost(action) {
      if (this._conference && this._conference.actionTypes.joinAsHost === action.type) {
        this.track('Join As Host (Conference)');
      }
    }
  }, {
    key: '_getTrackTarget',
    value: function _getTrackTarget(path) {
      if (path) {
        var routes = path.split('/');
        var firstRoute = routes.length > 1 ? '/' + routes[1] : '';

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
        }];
        return targets.find(function (target) {
          return firstRoute === target.router;
        });
      }
      return undefined;
    }
  }, {
    key: 'analytics',
    get: function get() {
      return global.analytics;
    }
  }, {
    key: 'lastActions',
    get: function get() {
      return this.state.lastAction;
    }
  }, {
    key: 'status',
    get: function get() {
      return _moduleStatuses2.default.ready;
    }
  }, {
    key: 'ready',
    get: function get() {
      return true;
    }
  }, {
    key: 'pending',
    get: function get() {
      return false;
    }
  }]);
  return Analytics;
}(_RcModule3.default)) || _class);
exports.default = Analytics;
//# sourceMappingURL=index.js.map
