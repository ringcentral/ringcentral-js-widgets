"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("whatwg-fetch");

var _ringcentral = _interopRequireDefault(require("ringcentral"));

var _ringcentralClient = _interopRequireDefault(require("ringcentral-client"));

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _AccountContacts = _interopRequireDefault(require("../AccountContacts"));

var _AccountExtension = _interopRequireDefault(require("../AccountExtension"));

var _AccountInfo = _interopRequireDefault(require("../AccountInfo"));

var _AccountPhoneNumber = _interopRequireDefault(require("../AccountPhoneNumber"));

var _ActivityMatcher = _interopRequireDefault(require("../ActivityMatcher"));

var _AddressBook = _interopRequireDefault(require("../AddressBook"));

var _Alert = _interopRequireDefault(require("../Alert"));

var _Auth = _interopRequireDefault(require("../Auth"));

var _BlockedNumber = _interopRequireDefault(require("../BlockedNumber"));

var _Brand = _interopRequireDefault(require("../Brand"));

var _Call = _interopRequireDefault(require("../Call"));

var _CallHistory = _interopRequireDefault(require("../CallHistory"));

var _CallingSettings = _interopRequireDefault(require("../CallingSettings"));

var _CallLog = _interopRequireDefault(require("../CallLog"));

var _CallLogger = _interopRequireDefault(require("../CallLogger"));

var _CallMonitor = _interopRequireDefault(require("../CallMonitor"));

var _ComposeText = _interopRequireDefault(require("../ComposeText"));

var _Conference = _interopRequireDefault(require("../Conference"));

var _ConnectivityMonitor = _interopRequireDefault(require("../ConnectivityMonitor"));

var _ContactMatcher = _interopRequireDefault(require("../ContactMatcher"));

var _Contacts = _interopRequireDefault(require("../Contacts"));

var _ContactDetails = _interopRequireDefault(require("../ContactDetails"));

var _ContactSearch = _interopRequireDefault(require("../ContactSearch"));

var _Conversation = _interopRequireDefault(require("../Conversation"));

var _ConversationLogger = _interopRequireDefault(require("../ConversationLogger"));

var _ConversationMatcher = _interopRequireDefault(require("../ConversationMatcher"));

var _DateTimeFormat = _interopRequireDefault(require("../DateTimeFormat"));

var _Presence = _interopRequireDefault(require("../Presence"));

var _DetailedPresence = _interopRequireDefault(require("../DetailedPresence"));

var _DialingPlan = _interopRequireDefault(require("../DialingPlan"));

var _Environment = _interopRequireDefault(require("../Environment"));

var _ExtensionDevice = _interopRequireDefault(require("../ExtensionDevice"));

var _ExtensionInfo = _interopRequireDefault(require("../ExtensionInfo"));

var _ExtensionPhoneNumber = _interopRequireDefault(require("../ExtensionPhoneNumber"));

var _ForwardingNumber = _interopRequireDefault(require("../ForwardingNumber"));

var _GlobalStorage = _interopRequireDefault(require("../GlobalStorage"));

var _Locale = _interopRequireDefault(require("../Locale"));

var _Messages = _interopRequireDefault(require("../Messages"));

var _MessageSender = _interopRequireDefault(require("../MessageSender"));

var _MessageStore = _interopRequireDefault(require("../MessageStore"));

var _NumberValidate = _interopRequireDefault(require("../NumberValidate"));

var _RateLimiter = _interopRequireDefault(require("../RateLimiter"));

var _RegionSettings = _interopRequireDefault(require("../RegionSettings"));

var _Ringout = _interopRequireDefault(require("../Ringout"));

var _RolesAndPermissions = _interopRequireDefault(require("../RolesAndPermissions"));

var _Softphone = _interopRequireDefault(require("../Softphone"));

var _Storage = _interopRequireDefault(require("../Storage"));

var _Subscription = _interopRequireDefault(require("../Subscription"));

var _TabManager = _interopRequireDefault(require("../TabManager"));

var _Webphone = _interopRequireDefault(require("../Webphone"));

var _RecentMessages = _interopRequireDefault(require("../RecentMessages"));

var _RecentCalls = _interopRequireDefault(require("../RecentCalls"));

var _Analytics = _interopRequireDefault(require("../Analytics"));

var _AudioSettings = _interopRequireDefault(require("../AudioSettings"));

var _Meeting = _interopRequireDefault(require("../Meeting"));

var _GlipCompany = _interopRequireDefault(require("../GlipCompany"));

var _GlipPersons = _interopRequireDefault(require("../GlipPersons"));

var _GlipPosts = _interopRequireDefault(require("../GlipPosts"));

var _GlipGroups = _interopRequireDefault(require("../GlipGroups"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RcPhone = (_dec = (0, _di.ModuleFactory)({
  providers: [_AudioSettings.default, _Alert.default, _Brand.default, _Locale.default, _TabManager.default, _GlobalStorage.default, _Environment.default, _ConnectivityMonitor.default, _Auth.default, _Storage.default, _RateLimiter.default, _ExtensionDevice.default, _Softphone.default, _Ringout.default, _AccountInfo.default, _ExtensionInfo.default, _RolesAndPermissions.default, _DialingPlan.default, _ExtensionPhoneNumber.default, _ForwardingNumber.default, _BlockedNumber.default, _ContactMatcher.default, _Subscription.default, _RegionSettings.default, _AccountExtension.default, _NumberValidate.default, _Webphone.default, _CallingSettings.default, _Presence.default, _DetailedPresence.default, _CallLog.default, _Call.default, _MessageSender.default, _ComposeText.default, _CallMonitor.default, _CallHistory.default, _ActivityMatcher.default, _ConversationMatcher.default, _ContactSearch.default, _MessageStore.default, _Conversation.default, _DateTimeFormat.default, _Conference.default, _CallLogger.default, _AccountPhoneNumber.default, _AddressBook.default, _AccountContacts.default, _Contacts.default, _ContactDetails.default, _ConversationLogger.default, _Messages.default, _RecentMessages.default, _RecentCalls.default, _Analytics.default, _Meeting.default, _GlipCompany.default, _GlipPersons.default, _GlipPosts.default, _GlipGroups.default, {
    provide: 'ModuleOptions',
    useValue: {
      prefix: 'rc-phone'
    },
    spread: true
  }, {
    provide: 'Client',
    useFactory: function useFactory(_ref) {
      var clientOptions = _ref.clientOptions,
          config = _ref.config;
      return new _ringcentralClient.default(new _ringcentral.default(_objectSpread({
        clearCacheOnRefreshError: false,
        cachePrefix: 'rc-sdk'
      }, config, clientOptions)));
    },
    deps: [{
      dep: 'Config'
    }, {
      dep: 'ClientOptions',
      optional: true
    }]
  }, {
    provide: 'BrandOptions',
    spread: true,
    useValue: {
      id: '1210',
      name: 'RingCentral',
      fullName: 'RingCentral'
    }
  }, {
    provide: 'ConnectivityMonitorOptions',
    useValue: {
      checkConnectionFunc: function () {
        var _checkConnectionFunc = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch('//pubsub.pubnub.com/time/0');

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function checkConnectionFunc() {
          return _checkConnectionFunc.apply(this, arguments);
        }

        return checkConnectionFunc;
      }()
    },
    spread: true
  }, {
    provide: 'CallLoggerOptions',
    useValue: {
      logFunction: function () {
        var _logFunction = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function logFunction() {
          return _logFunction.apply(this, arguments);
        }

        return logFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return true;
      }
    },
    spread: true
  }, {
    provide: 'WebphoneOptions',
    spread: true,
    useValue: {
      appKey: null,
      appName: null,
      appVersion: null
    }
  }, {
    provide: 'ConversationLoggerOptions',
    useValue: {
      logFunction: function () {
        var _logFunction2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function logFunction() {
          return _logFunction2.apply(this, arguments);
        }

        return logFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return true;
      }
    },
    spread: true
  }, {
    provide: 'SoftphoneOptions',
    useValue: {
      extensionMode: null
    },
    spread: true
  }, {
    provide: 'ContactSources',
    useFactory: function useFactory(_ref2) {
      var addressBook = _ref2.addressBook,
          accountContacts = _ref2.accountContacts;
      return [addressBook, accountContacts];
    },
    deps: ['AccountContacts', 'AddressBook']
  }, {
    provide: 'EnvironmentOptions',
    useFactory: function useFactory(_ref3) {
      var clientOptions = _ref3.clientOptions,
          config = _ref3.config;
      return {
        sdkConfig: _objectSpread({
          cachePrefix: 'rc-sdk',
          clearCacheOnRefreshError: false
        }, config, clientOptions)
      };
    },
    deps: [{
      dep: 'Config'
    }, {
      dep: 'ClientOptions',
      optional: true
    }]
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcModule) {
  _inherits(RcPhone, _RcModule);

  function RcPhone(_ref4) {
    var _this;

    var moduleOptions = _ref4.moduleOptions,
        modules = _objectWithoutProperties(_ref4, ["moduleOptions"]);

    _classCallCheck(this, RcPhone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RcPhone).call(this, _objectSpread({
      prefix: moduleOptions.prefix
    }, modules)));
    var router = modules.router,
        webphone = modules.webphone,
        contactSearch = modules.contactSearch,
        contacts = modules.contacts,
        callMonitor = modules.callMonitor,
        contactMatcher = modules.contactMatcher; // Webphone configuration
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
        var _searchFn = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(_ref5) {
          var queries;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  queries = _ref5.queries;
                  return _context4.abrupt("return", _this.contacts.matchContacts({
                    phoneNumbers: queries
                  }));

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function searchFn(_x) {
          return _searchFn.apply(this, arguments);
        }

        return searchFn;
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this.contacts.ready;
      }
    }); // ContactSearch configuration

    contactSearch.addSearchSource({
      sourceName: 'companyContacts',
      searchFn: function searchFn(_ref6) {
        var searchString = _ref6.searchString;
        var items = contacts.companyContacts;

        if (!searchString) {
          return items;
        }

        var searchText = searchString.toLowerCase();
        return items.filter(function (item) {
          var name = "".concat(item.firstName, " ").concat(item.lastName);

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
            name: "".concat(entity.firstName, " ").concat(entity.lastName),
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
      searchFn: function searchFn(_ref7) {
        var searchString = _ref7.searchString;
        var items = contacts.personalContacts;

        if (!searchString) {
          return items;
        }

        var searchText = searchString.toLowerCase();
        return items.filter(function (item) {
          var name = "".concat(item.firstName, " ").concat(item.lastName);

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
            name: "".concat(entity.firstName, " ").concat(entity.lastName),
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
    }); // CallMonitor configuration
    // callMonitor._onRinging = async () => {
    //   if (this.webphone._webphone) {
    //     return;
    //   }
    //   // TODO refactor some of these logic into appropriate modules
    //   this.router.push('/calls');
    // };

    return _this;
  }

  _createClass(RcPhone, [{
    key: "_actionTypes",
    get: function get() {
      return null;
    }
  }]);

  return RcPhone;
}(_RcModule2.default)) || _class);
exports.default = RcPhone;
//# sourceMappingURL=index.js.map
