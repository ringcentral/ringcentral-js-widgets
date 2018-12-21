'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

exports.createPhone = createPhone;

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _ringcentralClient = require('ringcentral-client');

var _ringcentralClient2 = _interopRequireDefault(_ringcentralClient);

var _di = require('../../../lib/di');

var _RcModule2 = require('../../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _callingOptions = require('../../../modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

var _AccountContacts = require('../../../modules/AccountContacts');

var _AccountContacts2 = _interopRequireDefault(_AccountContacts);

var _AccountExtension = require('../../../modules/AccountExtension');

var _AccountExtension2 = _interopRequireDefault(_AccountExtension);

var _AccountInfo = require('../../../modules/AccountInfo');

var _AccountInfo2 = _interopRequireDefault(_AccountInfo);

var _AccountPhoneNumber = require('../../../modules/AccountPhoneNumber');

var _AccountPhoneNumber2 = _interopRequireDefault(_AccountPhoneNumber);

var _AddressBook = require('../../../modules/AddressBook');

var _AddressBook2 = _interopRequireDefault(_AddressBook);

var _Alert = require('../../../modules/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Auth = require('../../../modules/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Brand = require('../../../modules/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _Call = require('../../../modules/Call');

var _Call2 = _interopRequireDefault(_Call);

var _CallingSettings = require('../../../modules/CallingSettings');

var _CallingSettings2 = _interopRequireDefault(_CallingSettings);

var _Contacts = require('../../../modules/Contacts');

var _Contacts2 = _interopRequireDefault(_Contacts);

var _ContactDetails = require('../../../modules/ContactDetails');

var _ContactDetails2 = _interopRequireDefault(_ContactDetails);

var _ConnectivityMonitor = require('../../../modules/ConnectivityMonitor');

var _ConnectivityMonitor2 = _interopRequireDefault(_ConnectivityMonitor);

var _DialingPlan = require('../../../modules/DialingPlan');

var _DialingPlan2 = _interopRequireDefault(_DialingPlan);

var _ExtensionDevice = require('../../../modules/ExtensionDevice');

var _ExtensionDevice2 = _interopRequireDefault(_ExtensionDevice);

var _Environment = require('../../../modules/Environment');

var _Environment2 = _interopRequireDefault(_Environment);

var _ExtensionInfo = require('../../../modules/ExtensionInfo');

var _ExtensionInfo2 = _interopRequireDefault(_ExtensionInfo);

var _ExtensionPhoneNumber = require('../../../modules/ExtensionPhoneNumber');

var _ExtensionPhoneNumber2 = _interopRequireDefault(_ExtensionPhoneNumber);

var _ForwardingNumber = require('../../../modules/ForwardingNumber');

var _ForwardingNumber2 = _interopRequireDefault(_ForwardingNumber);

var _GlobalStorage = require('../../../modules/GlobalStorage');

var _GlobalStorage2 = _interopRequireDefault(_GlobalStorage);

var _Locale = require('../../../modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RateLimiter = require('../../../modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _RegionSettings = require('../../../modules/RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _Ringout = require('../../../modules/Ringout');

var _Ringout2 = _interopRequireDefault(_Ringout);

var _Webphone = require('../../../modules/Webphone');

var _Webphone2 = _interopRequireDefault(_Webphone);

var _RolesAndPermissions = require('../../../modules/RolesAndPermissions');

var _RolesAndPermissions2 = _interopRequireDefault(_RolesAndPermissions);

var _Softphone = require('../../../modules/Softphone');

var _Softphone2 = _interopRequireDefault(_Softphone);

var _Storage = require('../../../modules/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _Subscription = require('../../../modules/Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _TabManager = require('../../../modules/TabManager');

var _TabManager2 = _interopRequireDefault(_TabManager);

var _NumberValidate = require('../../../modules/NumberValidate');

var _NumberValidate2 = _interopRequireDefault(_NumberValidate);

var _MessageSender = require('../../../modules/MessageSender');

var _MessageSender2 = _interopRequireDefault(_MessageSender);

var _ComposeText = require('../../../modules/ComposeText');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _MessageStore = require('../../../modules/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _Conversations = require('../../../modules/Conversations');

var _Conversations2 = _interopRequireDefault(_Conversations);

var _ContactSearch = require('../../../modules/ContactSearch');

var _ContactSearch2 = _interopRequireDefault(_ContactSearch);

var _DateTimeFormat = require('../../../modules/DateTimeFormat');

var _DateTimeFormat2 = _interopRequireDefault(_DateTimeFormat);

var _Conference = require('../../../modules/Conference');

var _Conference2 = _interopRequireDefault(_Conference);

var _ConferenceCall = require('../../../modules/ConferenceCall');

var _ConferenceCall2 = _interopRequireDefault(_ConferenceCall);

var _QuickAccess = require('../../../modules/QuickAccess');

var _QuickAccess2 = _interopRequireDefault(_QuickAccess);

var _ActiveCallControl = require('../../../modules/ActiveCallControl');

var _ActiveCallControl2 = _interopRequireDefault(_ActiveCallControl);

var _ActiveCalls = require('../../../modules/ActiveCalls');

var _ActiveCalls2 = _interopRequireDefault(_ActiveCalls);

var _DetailedPresence = require('../../../modules/DetailedPresence');

var _DetailedPresence2 = _interopRequireDefault(_DetailedPresence);

var _CallLog = require('../../../modules/CallLog');

var _CallLog2 = _interopRequireDefault(_CallLog);

var _CallMonitor = require('../../../modules/CallMonitor');

var _CallMonitor2 = _interopRequireDefault(_CallMonitor);

var _CallHistory = require('../../../modules/CallHistory');

var _CallHistory2 = _interopRequireDefault(_CallHistory);

var _RecentMessages = require('../../../modules/RecentMessages');

var _RecentMessages2 = _interopRequireDefault(_RecentMessages);

var _RecentCalls = require('../../../modules/RecentCalls');

var _RecentCalls2 = _interopRequireDefault(_RecentCalls);

var _AudioSettings = require('../../../modules/AudioSettings');

var _AudioSettings2 = _interopRequireDefault(_AudioSettings);

var _Meeting = require('../../../modules/Meeting');

var _Meeting2 = _interopRequireDefault(_Meeting);

var _LocaleSettings = require('../../../modules/LocaleSettings');

var _LocaleSettings2 = _interopRequireDefault(_LocaleSettings);

var _ContactMatcher = require('../../../modules/ContactMatcher');

var _ContactMatcher2 = _interopRequireDefault(_ContactMatcher);

var _UserGuide = require('../../../modules/UserGuide');

var _UserGuide2 = _interopRequireDefault(_UserGuide);

var _normalizeNumber2 = require('../../../lib/normalizeNumber');

var _normalizeNumber3 = _interopRequireDefault(_normalizeNumber2);

var _ringoutStatus = require('../../../modules/Ringout/ringoutStatus');

var _ringoutStatus2 = _interopRequireDefault(_ringoutStatus);

var _softphoneStatus = require('../../../modules/Softphone/softphoneStatus');

var _softphoneStatus2 = _interopRequireDefault(_softphoneStatus);

var _callingModes = require('../../../modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _BlockedNumber = require('../../../modules/BlockedNumber');

var _BlockedNumber2 = _interopRequireDefault(_BlockedNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasePhone = (_dec = (0, _di.ModuleFactory)({
  providers: [{
    provide: 'Client',
    useFactory: function useFactory(_ref) {
      var sdkConfig = _ref.sdkConfig;
      return new _ringcentralClient2.default(new _ringcentral2.default(sdkConfig));
    },
    deps: [{ dep: 'SdkConfig', useParam: true }]
  }, { provide: 'Alert', useClass: _Alert2.default }, { provide: 'Brand', useClass: _Brand2.default }, { provide: 'Softphone', useClass: _Softphone2.default }, { provide: 'Locale', useClass: _Locale2.default }, { provide: 'DateTimeFormat', useClass: _DateTimeFormat2.default }, { provide: 'TabManager', useClass: _TabManager2.default }, { provide: 'GlobalStorage', useClass: _GlobalStorage2.default }, { provide: 'LocaleSettings', useClass: _LocaleSettings2.default }, { provide: 'Environment', useClass: _Environment2.default }, { provide: 'Auth', useClass: _Auth2.default }, { provide: 'Ringout', useClass: _Ringout2.default }, { provide: 'ConnectivityMonitor', useClass: _ConnectivityMonitor2.default }, { provide: 'RateLimiter', useClass: _RateLimiter2.default }, { provide: 'Storage', useClass: _Storage2.default }, { provide: 'AudioSettings', useClass: _AudioSettings2.default }, { provide: 'AccountExtension', useClass: _AccountExtension2.default }, { provide: 'AccountInfo', useClass: _AccountInfo2.default }, { provide: 'ExtensionDevice', useClass: _ExtensionDevice2.default }, { provide: 'ExtensionInfo', useClass: _ExtensionInfo2.default }, { provide: 'RolesAndPermissions', useClass: _RolesAndPermissions2.default }, { provide: 'DialingPlan', useClass: _DialingPlan2.default }, { provide: 'ExtensionPhoneNumber', useClass: _ExtensionPhoneNumber2.default }, { provide: 'ForwardingNumber', useClass: _ForwardingNumber2.default }, { provide: 'RegionSettings', useClass: _RegionSettings2.default }, { provide: 'NumberValidate', useClass: _NumberValidate2.default }, { provide: 'CallingSettings', useClass: _CallingSettings2.default }, { provide: 'Call', useClass: _Call2.default }, { provide: 'Subscription', useClass: _Subscription2.default }, { provide: 'ActiveCalls', useClass: _ActiveCalls2.default }, { provide: 'DetailedPresence', useClass: _DetailedPresence2.default }, { provide: 'MessageSender', useClass: _MessageSender2.default }, { provide: 'ComposeText', useClass: _ComposeText2.default }, { provide: 'MessageStore', useClass: _MessageStore2.default }, { provide: 'Conversations', useClass: _Conversations2.default }, { provide: 'Conference', useClass: _Conference2.default }, { provide: 'CallLog', useClass: _CallLog2.default }, { provide: 'CallHistory', useClass: _CallHistory2.default }, { provide: 'AccountPhoneNumber', useClass: _AccountPhoneNumber2.default }, { provide: 'AccountContacts', useClass: _AccountContacts2.default }, { provide: 'AddressBook', useClass: _AddressBook2.default }, { provide: 'Contacts', useClass: _Contacts2.default }, { provide: 'QuickAccess', useClass: _QuickAccess2.default }, {
    provide: 'ContactSources',
    deps: ['AddressBook', 'AccountContacts'],
    useFactory: function useFactory(_ref2) {
      var addressBook = _ref2.addressBook,
          accountContacts = _ref2.accountContacts;
      return [addressBook, accountContacts];
    }
  }, { provide: 'ContactDetails', useClass: _ContactDetails2.default }, { provide: 'ContactMatcher', useClass: _ContactMatcher2.default }, { provide: 'RecentMessages', useClass: _RecentMessages2.default }, { provide: 'RecentCalls', useClass: _RecentCalls2.default }, { provide: 'Meeting', useClass: _Meeting2.default }, { provide: 'Webphone', useClass: _Webphone2.default }, { provide: 'ContactSearch', useClass: _ContactSearch2.default }, { provide: 'CallMonitor', useClass: _CallMonitor2.default }, { provide: 'UserGuide', useClass: _UserGuide2.default }, { provide: 'ActiveCallControl', useClass: _ActiveCallControl2.default }, {
    provide: 'StorageOptions',
    useValue: {
      // StorageProvider: LocalForageStorage, // IndexedDB
      disableAllowInactiveTabsWrite: true
    },
    spread: true
  }, {
    provide: 'MessageStoreOptions',
    useValue: {
      daySpan: 90,
      conversationsLoadLength: 10,
      conversationLoadLength: 15
    },
    spread: true
  }, {
    provide: 'ConversationsOptions',
    useValue: {
      enableLoadOldMessages: true,
      showMMSAttachment: true
    },
    spread: true
  }, { provide: 'ConferenceCall', useClass: _ConferenceCall2.default },
  // {
  // provide: 'ConferenceCallOptions',
  // useValue: {
  // pulling: false,
  // },
  // spread: true,
  // },
  { provide: 'BlockedNumber', useClass: _BlockedNumber2.default }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(BasePhone, _RcModule);

  function BasePhone(options) {
    (0, _classCallCheck3.default)(this, BasePhone);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BasePhone.__proto__ || (0, _getPrototypeOf2.default)(BasePhone)).call(this, options));

    var ringout = options.ringout,
        webphone = options.webphone,
        callingSettings = options.callingSettings,
        routerInteraction = options.routerInteraction,
        callMonitor = options.callMonitor,
        contactSearch = options.contactSearch,
        contacts = options.contacts,
        contactMatcher = options.contactMatcher,
        conferenceCall = options.conferenceCall;

    //     contactSearch.addSearchSource({
    //       sourceName: 'contacts',
    //       searchFn({ searchString }) {
    //         const items = contacts.allContacts;
    //         if (!searchString) {
    //           return items;
    //         }
    //         const searchText = searchString.toLowerCase();
    //         const result = [];
    //         items.forEach((item) => {
    //           const name = item.name || `${item.firstName} ${item.lastName}`;
    //           item.phoneNumbers.forEach((p) => {
    //             if (
    //               name.toLowerCase().indexOf(searchText) >= 0 ||
    // p.phoneNumber.indexOf(searchText) >= 0
    //             ) {
    //               result.push({
    //                 id: `${item.id}${p.phoneNumber}`,
    //                 name,
    //                 type: item.type,
    //                 phoneNumber: p.phoneNumber,
    //                 phoneType: p.phoneType.replace('Phone', ''),
    //                 entityType: 'contact',
    //               });
    //             }
    //           });
    //         });
    //         return result;
    //       },
    //       formatFn: entities => entities,
    //       readyCheckFn: () => contacts.ready,
    //     });
    //     contactMatcher.addSearchProvider({
    //       name: 'contacts',
    //       searchFn: async ({ queries }) => contacts.matchContacts({ phoneNumbers: queries }),
    //       readyCheckFn: () => contacts.ready,
    //     });

    //     // Webphone configuration
    //     webphone.onCallEnd((session, currentSession, ringSession) => {
    //       const callsOnholdReg = /^\/conferenceCall\/callsOnhold\/(.+)\/(.+)$/;
    //       const execCallsOnhold = callsOnholdReg.exec(routerInteraction.currentPath);

    //       if (execCallsOnhold) {
    //         const fromSessionIdOfCallsOnhold = execCallsOnhold[2];
    //         if (!currentSession || session.id === currentSession.id) {
    //           routerInteraction.go(-2);
    //           return;
    //         }
    //         if (session.id === fromSessionIdOfCallsOnhold) {
    //           routerInteraction.replace('/calls/active');
    //           return;
    //         }
    //       }

    //       const withinCallCtrl = !![
    //         '/calls/active',
    //         '/conferenceCall/dialer/',
    //         '/conferenceCall/callsOnhold',
    //         '/conferenceCall/participants',
    //       ].find(path => routerInteraction.currentPath.indexOf(path) === 0);

    //       if (
    //         withinCallCtrl
    // && (!currentSession || session.id === currentSession.id)
    // && !ringSession
    //       ) {
    //         if (!currentSession) {
    //           routerInteraction.replace('/dialer');
    //           return;
    //         }
    //         if (routerInteraction.currentPath.indexOf('/calls/active') === -1) {
    //           routerInteraction.replace('/calls/active');
    //           return;
    //         }
    //         if (conferenceCall.isMerging) {
    //           // Do nothing, let the merge() to do the jump
    //           return;
    //         }
    //         routerInteraction.goBack();
    //         return;
    //       }

    //       if (
    //         currentSession
    // && currentSession.id !== session.id
    // && routerInteraction.currentPath === `/calls/active/${session.id}`
    //       ) {
    //         routerInteraction.replace(`/calls/active/${currentSession.id}`);
    //         return;
    //       }

    //       if (!currentSession && ringSession) {
    //         routerInteraction.push('/calls');
    //       }
    //     });

    //     webphone.onCallStart((session) => {
    //       const path = `/calls/active/${session.id}`;
    //       if (routerInteraction.currentPath !== path) {
    //         if (routerInteraction.currentPath.indexOf('/calls/active') === 0) {
    //           routerInteraction.replace(path);
    //         } else {
    //           routerInteraction.push(path);
    //         }
    //       }
    //     });

    //     webphone.onCallRing(() => {
    //       if (webphone.ringSessions.length > 1) {
    //         if (routerInteraction.currentPath !== '/calls') {
    //           routerInteraction.push('/calls');
    //         }
    //         webphone.ringSessions.forEach((session) => {
    //           if (!session.minimized) {
    //             webphone.toggleMinimized(session.id);
    //           }
    //         });
    //       }
    //     });

    //     webphone.onBeforeCallResume((session) => {
    //       const sessionId = session && session.id;
    //       const mergingPair = conferenceCall && conferenceCall.mergingPair;
    //       if (mergingPair && sessionId !== mergingPair.toSessionId) {
    //         // close merging pair to close the merge call.
    //         conferenceCall.closeMergingPair();
    //       }
    //     });

    //     webphone.onBeforeCallEnd((session) => {
    //       const mergingPair = conferenceCall && conferenceCall.mergingPair;
    //       if (
    //         session
    // && mergingPair
    // && (Object.values(mergingPair).indexOf(session.id) !== -1)
    //       ) {
    //         // close merging pair to close the merge call.
    //         conferenceCall.closeMergingPair();
    //       }
    //     });

    //     conferenceCall.onMergeSuccess((conferenceData) => {
    //       routerInteraction.push(`/calls/active/${conferenceData.sessionId}`);
    //     });

    //     // CallMonitor configuration
    //     this._softphoneConnectTime = null;
    //     this._softphoneConnectNumber = null;

    //     callMonitor._onRinging = (call) => {
    //       // auto nav rules
    //       if (
    //         callingSettings.callingMode !== callingModes.webphone // not webRTC mode
    // && routerInteraction.currentPath === '/dialer'
    // && (
    // // for ringout
    //   ringout.ringoutStatus === ringoutStatus.connecting
    // // for softphone
    // || (
    //   this._softphoneConnectTime && call && call.to
    // && (new Date() - this._softphoneConnectTime) < 1 * 60 * 1000 // in 1 minute
    // && this._normalizeNumber(call.to.phoneNumber)
    // === this._normalizeNumber(this._softphoneConnectNumber)
    // )
    // )
    //       ) {
    //         routerInteraction.push('/calls');
    //         this._softphoneConnectTime = null;
    //         this._softphoneConnectNumber = null;
    //       }
    //     };

    //     const phone = this;
    //     callMonitor._onCallEnded = () => {
    //       if (
    //         routerInteraction.currentPath === '/calls'
    // && !hasActiveCalls(phone)
    //       ) {
    //         routerInteraction.replace('/dialer');
    //       }
    //     };

    return _this;
  }

  (0, _createClass3.default)(BasePhone, [{
    key: '_normalizeNumber',
    value: function _normalizeNumber(phoneNumber) {
      return (0, _normalizeNumber3.default)({
        phoneNumber: phoneNumber,
        countryCode: this.regionSettings.countryCode,
        areaCode: this.regionSettings.areaCode
      });
    }

    //   initialize() {
    //     const { rolesAndPermissions } = this;
    //     this.store.subscribe(() => {
    //       if (this.auth.ready) {
    //         if (
    //           this.routerInteraction.currentPath !== '/'
    // && !this.auth.loggedIn
    //         ) {
    //           this.routerInteraction.push('/');
    //         } else if (
    //           this.routerInteraction.currentPath === '/'
    // && this.auth.loggedIn
    // && rolesAndPermissions.ready
    //         ) {
    //           // Determine default tab
    //           const showDialPad = rolesAndPermissions.callingEnabled;
    //           const showCalls = (
    //             rolesAndPermissions.callingEnabled
    // && this.callingSettings.ready
    // && this.callingSettings.callWith !== callingOptions.browser
    //           );
    //           const showHistory = rolesAndPermissions.permissions.ReadCallLog;
    //           const showContact = rolesAndPermissions.callingEnabled;
    //           const showComposeText = rolesAndPermissions.hasComposeTextPermission;
    //           const showMessages = rolesAndPermissions.hasReadMessagesPermission;
    //           const showConference = rolesAndPermissions.permissions.OrganizeConference;
    //           const showMeeting = rolesAndPermissions.permissions.Meetings;
    //           if (showDialPad) {
    //             this.routerInteraction.push('/dialer');
    //           } else if (showCalls) {
    //             this.routerInteraction.push('/calls');
    //           } else if (showHistory) {
    //             this.routerInteraction.push('/history');
    //           } else if (showMessages) {
    //             this.routerInteraction.push('/messages');
    //           } else if (showComposeText) {
    //             this.routerInteraction.push('/composeText');
    //           } else if (showContact) {
    //             this.routerInteraction.push('/contacts');
    //           } else if (showMeeting) {
    //             this.routerInteraction.push('/meeting');
    //           } else if (showConference) {
    //             this.routerInteraction.push('/conference');
    //           } else {
    //             this.routerInteraction.push('/settings');
    //           }
    //         } else if (
    //           this.routerInteraction.currentPath === '/dialer'
    // && this.softphone.softphoneStatus === softphoneStatus.connecting
    //         ) {
    //           this._softphoneConnectTime = new Date();
    //           this._softphoneConnectNumber = this.softphone.connectingPhoneNumber;
    //         }
    //       }
    //     });
    //   }

  }, {
    key: '_actionTypes',
    get: function get() {
      /* no action types */
      return null;
    }
  }]);
  return BasePhone;
}(_RcModule3.default)) || _class);
exports.default = BasePhone;
function createPhone(_ref3) {
  var _dec2, _class2;

  var _ref3$prefix = _ref3.prefix,
      prefix = _ref3$prefix === undefined ? 'rc' : _ref3$prefix,
      _ref3$version = _ref3.version,
      version = _ref3$version === undefined ? '0.1.0' : _ref3$version,
      apiConfig = _ref3.apiConfig,
      brandConfig = _ref3.brandConfig;
  var Phone = (_dec2 = (0, _di.ModuleFactory)({
    providers: [{
      provide: 'ModuleOptions',
      useValue: {
        prefix: prefix
      },
      spread: true
    }, {
      provide: 'SdkConfig',
      useValue: (0, _extends3.default)({}, apiConfig, {
        cachePrefix: 'sdk-rc',
        clearCacheOnRefreshError: false
      })
    }, {
      provide: 'EnvironmentOptions',
      useValue: {
        sdkConfig: (0, _extends3.default)({}, apiConfig, {
          cachePrefix: 'sdk-rc',
          clearCacheOnRefreshError: false
        })
      },
      spread: true
    }, {
      provide: 'BrandOptions',
      spread: true,
      useValue: brandConfig
    }, {
      provide: 'WebphoneOptions',
      spread: true,
      useValue: {
        // appKey: apiConfig.appKey,
        appKey: 'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
        appName: brandConfig.appName,
        appVersion: version,
        webphoneLogLevel: 1
      }
    }, {
      provide: 'Version',
      useFactory: function useFactory() {
        return version;
      }
    }]
  }), _dec2(_class2 = function (_BasePhone) {
    (0, _inherits3.default)(Phone, _BasePhone);

    function Phone() {
      (0, _classCallCheck3.default)(this, Phone);
      return (0, _possibleConstructorReturn3.default)(this, (Phone.__proto__ || (0, _getPrototypeOf2.default)(Phone)).apply(this, arguments));
    }

    return Phone;
  }(BasePhone)) || _class2);

  return Phone.create();
}
//# sourceMappingURL=index.js.map
