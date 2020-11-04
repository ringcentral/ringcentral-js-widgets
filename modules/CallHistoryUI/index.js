"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class;

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

var CallHistoryUI = (_dec = (0, _di.Module)({
  name: 'CallHistoryUI',
  deps: ['Locale', 'Brand', 'CallHistory', 'RegionSettings', 'ConnectivityMonitor', 'RateLimiter', 'DateTimeFormat', 'RolesAndPermissions', {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'ComposeText',
    optional: true
  }, {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'ExtensionInfo',
    optional: true
  }, 'ContactMatcher', 'RouterInteraction', 'ContactSearch', 'ConnectivityManager']
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(CallHistoryUI, _RcUIModule);

  var _super = _createSuper(CallHistoryUI);

  function CallHistoryUI() {
    _classCallCheck(this, CallHistoryUI);

    return _super.apply(this, arguments);
  }

  _createClass(CallHistoryUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _extensionInfo$site$c, _extensionInfo$site, _extensionInfo$isMult;

      var _ref$phone = _ref.phone,
          brand = _ref$phone.brand,
          call = _ref$phone.call,
          callHistory = _ref$phone.callHistory,
          callLogger = _ref$phone.callLogger,
          composeText = _ref$phone.composeText,
          connectivityManager = _ref$phone.connectivityManager,
          connectivityMonitor = _ref$phone.connectivityMonitor,
          dateTimeFormat = _ref$phone.dateTimeFormat,
          locale = _ref$phone.locale,
          rateLimiter = _ref$phone.rateLimiter,
          regionSettings = _ref$phone.regionSettings,
          rolesAndPermissions = _ref$phone.rolesAndPermissions,
          extensionInfo = _ref$phone.extensionInfo,
          _ref$enableContactFal = _ref.enableContactFallback,
          enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
          _ref$useNewList = _ref.useNewList,
          useNewList = _ref$useNewList === void 0 ? false : _ref$useNewList;
      return {
        enableContactFallback: enableContactFallback,
        brand: brand.fullName,
        title: _i18n["default"].getString('title', locale.currentLocale),
        currentLocale: locale.currentLocale,
        calls: callHistory.latestCalls,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        currentSiteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
        isMultipleSiteEnabled: (_extensionInfo$isMult = extensionInfo === null || extensionInfo === void 0 ? void 0 : extensionInfo.isMultipleSiteEnabled) !== null && _extensionInfo$isMult !== void 0 ? _extensionInfo$isMult : false,
        disableLinks: connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode || rateLimiter.throttling,
        disableCallButton: connectivityManager.isOfflineMode || connectivityManager.isWebphoneUnavailableMode || connectivityManager.isWebphoneInitializing || rateLimiter.throttling,
        disableClickToDial: !(call && call.isIdle),
        outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
        internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
        loggingMap: callLogger && callLogger.loggingMap,
        showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && rolesAndPermissions.ready && (!call || call.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready)),
        autoLog: !!(callLogger && callLogger.autoLog),
        useNewList: useNewList
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$phone = _ref2.phone,
          dateTimeFormat = _ref2$phone.dateTimeFormat,
          callLogger = _ref2$phone.callLogger,
          contactMatcher = _ref2$phone.contactMatcher,
          call = _ref2$phone.call,
          dialerUI = _ref2$phone.dialerUI,
          contactDetailsUI = _ref2$phone.contactDetailsUI,
          composeText = _ref2$phone.composeText,
          routerInteraction = _ref2$phone.routerInteraction,
          contactSearch = _ref2$phone.contactSearch,
          callHistory = _ref2$phone.callHistory,
          rolesAndPermissions = _ref2$phone.rolesAndPermissions,
          onCreateContact = _ref2.onCreateContact,
          _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
          dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? dateTimeFormat.formatDateTime.bind(dateTimeFormat) : _ref2$dateTimeFormatt,
          onLogCall = _ref2.onLogCall,
          isLoggedContact = _ref2.isLoggedContact,
          _ref2$dialerRoute = _ref2.dialerRoute,
          dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
          _ref2$composeTextRout = _ref2.composeTextRoute,
          composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
          onViewContact = _ref2.onViewContact;
      return {
        dateTimeFormatter: dateTimeFormatter,
        onViewContact: onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
              type = _ref3$contact.type,
              id = _ref3$contact.id;

          if (contactDetailsUI) {
            contactDetailsUI.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        },
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                    _context.next = 3;
                    return contactMatcher.hasMatchNumber({
                      phoneNumber: phoneNumber,
                      ignoreCache: true
                    });

                  case 3:
                    hasMatchNumber = _context.sent;

                    if (hasMatchNumber) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 7;
                    return onCreateContact({
                      phoneNumber: phoneNumber,
                      name: name,
                      entityType: entityType
                    });

                  case 7:
                    _context.next = 9;
                    return contactMatcher.forceMatchNumber({
                      phoneNumber: phoneNumber
                    });

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }() : undefined,
        onClickToDial: dialerUI && rolesAndPermissions.callingEnabled ? function (recipient) {
          if (call.isIdle) {
            routerInteraction.push(dialerRoute);
            dialerUI.call({
              recipient: recipient
            });
            callHistory.onClickToCall();
          }
        } : undefined,
        onClickToSms: composeText ? /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contact) {
            var isDummyContact,
                _args2 = arguments;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    isDummyContact = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

                    if (routerInteraction) {
                      routerInteraction.push(composeTextRoute);
                    } // if contact autocomplete, if no match fill the number only


                    if (contact.name && contact.phoneNumber && isDummyContact) {
                      composeText.updateTypingToNumber(contact.name);
                      contactSearch.search({
                        searchString: contact.name
                      });
                    } else {
                      composeText.addToNumber(contact);

                      if (composeText.typingToNumber === contact.phoneNumber) {
                        composeText.cleanTypingToNumber();
                      }
                    }

                    callHistory.onClickToSMS();

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x2) {
            return _ref6.apply(this, arguments);
          };
        }() : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || callLogger && /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
            var call, contact, _ref7$redirect, redirect;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    call = _ref7.call, contact = _ref7.contact, _ref7$redirect = _ref7.redirect, redirect = _ref7$redirect === void 0 ? true : _ref7$redirect;
                    _context3.next = 3;
                    return callLogger.logCall({
                      call: call,
                      contact: contact,
                      redirect: redirect
                    });

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x3) {
            return _ref8.apply(this, arguments);
          };
        }()
      };
    }
  }]);

  return CallHistoryUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = CallHistoryUI;
//# sourceMappingURL=index.js.map
