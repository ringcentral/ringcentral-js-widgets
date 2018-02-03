'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _dec, _class;

require('whatwg-fetch');

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _ringcentralClient = require('ringcentral-client');

var _ringcentralClient2 = _interopRequireDefault(_ringcentralClient);

var _di = require('../../lib/di');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _AccountContacts = require('../AccountContacts');

var _AccountContacts2 = _interopRequireDefault(_AccountContacts);

var _AccountExtension = require('../AccountExtension');

var _AccountExtension2 = _interopRequireDefault(_AccountExtension);

var _AccountInfo = require('../AccountInfo');

var _AccountInfo2 = _interopRequireDefault(_AccountInfo);

var _AccountPhoneNumber = require('../AccountPhoneNumber');

var _AccountPhoneNumber2 = _interopRequireDefault(_AccountPhoneNumber);

var _ActivityMatcher = require('../ActivityMatcher');

var _ActivityMatcher2 = _interopRequireDefault(_ActivityMatcher);

var _AddressBook = require('../AddressBook');

var _AddressBook2 = _interopRequireDefault(_AddressBook);

var _Alert = require('../Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Auth = require('../Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _BlockedNumber = require('../BlockedNumber');

var _BlockedNumber2 = _interopRequireDefault(_BlockedNumber);

var _Brand = require('../Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _Call = require('../Call');

var _Call2 = _interopRequireDefault(_Call);

var _CallHistory = require('../CallHistory');

var _CallHistory2 = _interopRequireDefault(_CallHistory);

var _CallingSettings = require('../CallingSettings');

var _CallingSettings2 = _interopRequireDefault(_CallingSettings);

var _CallLog = require('../CallLog');

var _CallLog2 = _interopRequireDefault(_CallLog);

var _CallLogger = require('../CallLogger');

var _CallLogger2 = _interopRequireDefault(_CallLogger);

var _CallMonitor = require('../CallMonitor');

var _CallMonitor2 = _interopRequireDefault(_CallMonitor);

var _ComposeText = require('../ComposeText');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _Conference = require('../Conference');

var _Conference2 = _interopRequireDefault(_Conference);

var _ConnectivityMonitor = require('../ConnectivityMonitor');

var _ConnectivityMonitor2 = _interopRequireDefault(_ConnectivityMonitor);

var _ContactMatcher = require('../ContactMatcher');

var _ContactMatcher2 = _interopRequireDefault(_ContactMatcher);

var _Contacts = require('../Contacts');

var _Contacts2 = _interopRequireDefault(_Contacts);

var _ContactDetails = require('../ContactDetails');

var _ContactDetails2 = _interopRequireDefault(_ContactDetails);

var _ContactSearch = require('../ContactSearch');

var _ContactSearch2 = _interopRequireDefault(_ContactSearch);

var _Conversation = require('../Conversation');

var _Conversation2 = _interopRequireDefault(_Conversation);

var _ConversationLogger = require('../ConversationLogger');

var _ConversationLogger2 = _interopRequireDefault(_ConversationLogger);

var _ConversationMatcher = require('../ConversationMatcher');

var _ConversationMatcher2 = _interopRequireDefault(_ConversationMatcher);

var _DateTimeFormat = require('../DateTimeFormat');

var _DateTimeFormat2 = _interopRequireDefault(_DateTimeFormat);

var _Presence = require('../Presence');

var _Presence2 = _interopRequireDefault(_Presence);

var _DetailedPresence = require('../DetailedPresence');

var _DetailedPresence2 = _interopRequireDefault(_DetailedPresence);

var _DialingPlan = require('../DialingPlan');

var _DialingPlan2 = _interopRequireDefault(_DialingPlan);

var _Environment = require('../Environment');

var _Environment2 = _interopRequireDefault(_Environment);

var _ExtensionDevice = require('../ExtensionDevice');

var _ExtensionDevice2 = _interopRequireDefault(_ExtensionDevice);

var _ExtensionInfo = require('../ExtensionInfo');

var _ExtensionInfo2 = _interopRequireDefault(_ExtensionInfo);

var _ExtensionPhoneNumber = require('../ExtensionPhoneNumber');

var _ExtensionPhoneNumber2 = _interopRequireDefault(_ExtensionPhoneNumber);

var _ForwardingNumber = require('../ForwardingNumber');

var _ForwardingNumber2 = _interopRequireDefault(_ForwardingNumber);

var _GlobalStorage = require('../GlobalStorage');

var _GlobalStorage2 = _interopRequireDefault(_GlobalStorage);

var _Locale = require('../Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _Messages = require('../Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _MessageSender = require('../MessageSender');

var _MessageSender2 = _interopRequireDefault(_MessageSender);

var _MessageStore = require('../MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _NumberValidate = require('../NumberValidate');

var _NumberValidate2 = _interopRequireDefault(_NumberValidate);

var _RateLimiter = require('../RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _RegionSettings = require('../RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _Ringout = require('../Ringout');

var _Ringout2 = _interopRequireDefault(_Ringout);

var _RolesAndPermissions = require('../RolesAndPermissions');

var _RolesAndPermissions2 = _interopRequireDefault(_RolesAndPermissions);

var _Softphone = require('../Softphone');

var _Softphone2 = _interopRequireDefault(_Softphone);

var _Storage = require('../Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _TabManager = require('../TabManager');

var _TabManager2 = _interopRequireDefault(_TabManager);

var _Webphone = require('../Webphone');

var _Webphone2 = _interopRequireDefault(_Webphone);

var _RecentMessages = require('../RecentMessages');

var _RecentMessages2 = _interopRequireDefault(_RecentMessages);

var _RecentCalls = require('../RecentCalls');

var _RecentCalls2 = _interopRequireDefault(_RecentCalls);

var _Analytics = require('../Analytics');

var _Analytics2 = _interopRequireDefault(_Analytics);

var _AudioSettings = require('../AudioSettings');

var _AudioSettings2 = _interopRequireDefault(_AudioSettings);

var _Meeting = require('../Meeting');

var _Meeting2 = _interopRequireDefault(_Meeting);

var _GlipCompany = require('../GlipCompany');

var _GlipCompany2 = _interopRequireDefault(_GlipCompany);

var _GlipPersons = require('../GlipPersons');

var _GlipPersons2 = _interopRequireDefault(_GlipPersons);

var _GlipPosts = require('../GlipPosts');

var _GlipPosts2 = _interopRequireDefault(_GlipPosts);

var _GlipGroups = require('../GlipGroups');

var _GlipGroups2 = _interopRequireDefault(_GlipGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RcPhone = (_dec = (0, _di.ModuleFactory)({
  providers: [_AudioSettings2.default, _Alert2.default, _Brand2.default, _Locale2.default, _TabManager2.default, _GlobalStorage2.default, _Environment2.default, _ConnectivityMonitor2.default, _Auth2.default, _Storage2.default, _RateLimiter2.default, _ExtensionDevice2.default, _Softphone2.default, _Ringout2.default, _AccountInfo2.default, _ExtensionInfo2.default, _RolesAndPermissions2.default, _DialingPlan2.default, _ExtensionPhoneNumber2.default, _ForwardingNumber2.default, _BlockedNumber2.default, _ContactMatcher2.default, _Subscription2.default, _RegionSettings2.default, _AccountExtension2.default, _NumberValidate2.default, _Webphone2.default, _CallingSettings2.default, _Presence2.default, _DetailedPresence2.default, _CallLog2.default, _Call2.default, _MessageSender2.default, _ComposeText2.default, _CallMonitor2.default, _CallHistory2.default, _ActivityMatcher2.default, _ConversationMatcher2.default, _ContactSearch2.default, _MessageStore2.default, _Conversation2.default, _DateTimeFormat2.default, _Conference2.default, _CallLogger2.default, _AccountPhoneNumber2.default, _AddressBook2.default, _AccountContacts2.default, _Contacts2.default, _ContactDetails2.default, _ConversationLogger2.default, _Messages2.default, _RecentMessages2.default, _RecentCalls2.default, _Analytics2.default, _Meeting2.default, _GlipCompany2.default, _GlipPersons2.default, _GlipPosts2.default, _GlipGroups2.default, {
    provide: 'ModuleOptions',
    useValue: { prefix: 'rc-phone' },
    spread: true
  }, {
    provide: 'Client',
    useFactory: function useFactory(_ref) {
      var clientOptions = _ref.clientOptions,
          config = _ref.config;
      return new _ringcentralClient2.default(new _ringcentral2.default((0, _extends3.default)({
        clearCacheOnRefreshError: false,
        cachePrefix: 'rc-sdk'
      }, config, clientOptions)));
    },
    deps: [{ dep: 'Config' }, { dep: 'ClientOptions', optional: true }]
  }, {
    provide: 'BrandOptions',
    spread: true,
    useValue: { id: '1210', name: 'RingCentral', fullName: 'RingCentral' }
  }, {
    provide: 'ConnectivityMonitorOptions',
    useValue: { checkConnectionFunc: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch('//pubsub.pubnub.com/time/0');

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function checkConnectionFunc() {
          return _ref2.apply(this, arguments);
        };
      }() },
    spread: true
  }, {
    provide: 'CallLoggerOptions',
    useValue: {
      logFunction: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function logFunction() {
          return _ref3.apply(this, arguments);
        };
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return true;
      }
    },
    spread: true
  }, {
    provide: 'WebphoneOptions',
    spread: true,
    useValue: { appKey: null, appName: null, appVersion: null }
  }, {
    provide: 'ConversationLoggerOptions',
    useValue: {
      logFunction: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function logFunction() {
          return _ref4.apply(this, arguments);
        };
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return true;
      }
    },
    spread: true
  }, { provide: 'SoftphoneOptions', useValue: { extensionMode: null }, spread: true }, {
    provide: 'ContactSources',
    useFactory: function useFactory(_ref5) {
      var addressBook = _ref5.addressBook,
          accountContacts = _ref5.accountContacts;
      return [addressBook, accountContacts];
    },
    deps: ['AccountContacts', 'AddressBook']
  }, {
    provide: 'EnvironmentOptions',
    useFactory: function useFactory(_ref6) {
      var clientOptions = _ref6.clientOptions,
          config = _ref6.config;
      return {
        sdkConfig: (0, _extends3.default)({
          cachePrefix: 'rc-sdk',
          clearCacheOnRefreshError: false
        }, config, clientOptions)
      };
    },
    deps: [{ dep: 'Config' }, { dep: 'ClientOptions', optional: true }]
  }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(RcPhone, _RcModule);

  function RcPhone(_ref7) {
    var _this2 = this;

    var moduleOptions = _ref7.moduleOptions,
        modules = (0, _objectWithoutProperties3.default)(_ref7, ['moduleOptions']);
    (0, _classCallCheck3.default)(this, RcPhone);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RcPhone.__proto__ || (0, _getPrototypeOf2.default)(RcPhone)).call(this, (0, _extends3.default)({ prefix: moduleOptions.prefix }, modules)));

    var router = modules.router,
        webphone = modules.webphone,
        contactSearch = modules.contactSearch,
        contacts = modules.contacts,
        callMonitor = modules.callMonitor,
        contactMatcher = modules.contactMatcher;

    // Webphone configuration
    // webphone._onCallEndFunc = (session) => {
    //   if (router.currentPath !== '/calls/active') {
    //     return;
    //   }
    //   const currentSession = webphone.activeSession;
    //   if (currentSession && session.id !== currentSession.id) {
    //     return;
    //   }
    //   router.goBack();
    // };
    // webphone._onCallStartFunc = () => {
    //   if (router.currentPath === '/calls/active') {
    //     return;
    //   }
    //   router.push('/calls/active');
    // };
    // webphone._onCallRingFunc = () => {
    //   if (
    //     webphone.ringSessions.length > 1
    //   ) {
    //     if (router.currentPath !== '/calls') {
    //       router.push('/calls');
    //     }
    //     webphone.ringSessions.forEach((session) => {
    //       webphone.toggleMinimized(session.id);
    //     });
    //   }
    // };

    // ContactMatcher configuration

    contactMatcher.addSearchProvider({
      name: 'contacts',
      searchFn: function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref9) {
          var queries = _ref9.queries;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _this.contacts.matchContacts({ phoneNumbers: queries }));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function searchFn(_x) {
          return _ref8.apply(this, arguments);
        };
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this.contacts.ready;
      }
    });

    // ContactSearch configuration
    contactSearch.addSearchSource({
      sourceName: 'companyContacts',
      searchFn: function searchFn(_ref10) {
        var searchString = _ref10.searchString;

        var items = contacts.companyContacts;
        if (!searchString) {
          return items;
        }
        var searchText = searchString.toLowerCase();
        return items.filter(function (item) {
          var name = item.firstName + ' ' + item.lastName;
          if (name.toLowerCase().indexOf(searchText) >= 0 || item.extensionNumber.indexOf(searchText) >= 0 || item.phoneNumbers.find(function (x) {
            return x.phoneNumber.indexOf(searchText) >= 0;
          })) {
            return true;
          }
          return false;
        });
      },
      formatFn: function formatFn(entities) {
        return entities.map(function (entity) {
          return {
            id: entity.id.toString(),
            type: entity.type,
            name: entity.firstName + ' ' + entity.lastName,
            hasProfileImage: !!entity.hasProfileImage,
            phoneNumbers: entity.phoneNumbers,
            phoneNumber: entity.extensionNumber,
            phoneType: 'extension',
            entityType: 'companyContact'
          };
        });
      },
      readyCheckFn: function readyCheckFn() {
        return contacts.ready;
      }
    });
    contactSearch.addSearchSource({
      sourceName: 'personalContacts',
      searchFn: function searchFn(_ref11) {
        var searchString = _ref11.searchString;

        var items = contacts.personalContacts;
        if (!searchString) {
          return items;
        }
        var searchText = searchString.toLowerCase();
        return items.filter(function (item) {
          var name = item.firstName + ' ' + item.lastName;
          if (name.toLowerCase().indexOf(searchText) >= 0 || item.phoneNumbers.find(function (x) {
            return x.phoneNumber.indexOf(searchText) >= 0;
          })) {
            return true;
          }
          return false;
        });
      },
      formatFn: function formatFn(entities) {
        return entities.map(function (entity) {
          return {
            id: entity.id.toString(),
            type: entity.type,
            name: entity.firstName + ' ' + entity.lastName,
            hasProfileImage: false,
            phoneNumbers: entity.phoneNumbers,
            phoneNumber: entity.phoneNumbers[0] && entity.phoneNumbers[0].phoneNumber,
            phoneType: entity.phoneNumbers[0] && entity.phoneNumbers[0].phoneType,
            entityType: 'personalContact'
          };
        });
      },
      readyCheckFn: function readyCheckFn() {
        return contacts.ready;
      }
    });

    // CallMonitor configuration
    // callMonitor._onRinging = async () => {
    //   if (this.webphone._webphone) {
    //     return;
    //   }
    //   // TODO refactor some of these logic into appropriate modules
    //   this.router.push('/calls');
    // };
    return _this;
  }

  (0, _createClass3.default)(RcPhone, [{
    key: '_actionTypes',
    get: function get() {
      return null;
    }
  }]);
  return RcPhone;
}(_RcModule3.default)) || _class);
exports.default = RcPhone;
//# sourceMappingURL=index.js.map
