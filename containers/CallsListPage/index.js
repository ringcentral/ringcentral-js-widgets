"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _phoneContext = require("../../lib/phoneContext");

var _CallsListPanel = _interopRequireDefault(require("../../components/CallsListPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _extensionInfo$site$c, _extensionInfo$site, _extensionInfo$isMult;

  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      callLogger = _ref$phone.callLogger,
      callMonitor = _ref$phone.callMonitor,
      locale = _ref$phone.locale,
      regionSettings = _ref$phone.regionSettings,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      callHistory = _ref$phone.callHistory,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      call = _ref$phone.call,
      composeText = _ref$phone.composeText,
      extensionInfo = _ref$phone.extensionInfo,
      _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
      showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal;
  return {
    currentSiteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
    isMultipleSiteEnabled: (_extensionInfo$isMult = extensionInfo === null || extensionInfo === void 0 ? void 0 : extensionInfo.isMultipleSiteEnabled) !== null && _extensionInfo$isMult !== void 0 ? _extensionInfo$isMult : false,
    currentLocale: locale.currentLocale,
    activeRingCalls: callMonitor.activeRingCalls,
    activeOnHoldCalls: callMonitor.activeOnHoldCalls,
    activeCurrentCalls: callMonitor.activeCurrentCalls,
    otherDeviceCalls: callMonitor.otherDeviceCalls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
    // showSpinner: false,
    brand: brand.fullName,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog),
    enableContactFallback: enableContactFallback,
    calls: callHistory.latestCalls,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    loggingMap: callLogger && callLogger.loggingMap,
    showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready)),
    readTextPermission: rolesAndPermissions.readTextPermissions
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      callLogger = _ref2$phone.callLogger,
      composeText = _ref2$phone.composeText,
      contactMatcher = _ref2$phone.contactMatcher,
      contactSearch = _ref2$phone.contactSearch,
      regionSettings = _ref2$phone.regionSettings,
      contactDetailsUI = _ref2$phone.contactDetailsUI,
      routerInteraction = _ref2$phone.routerInteraction,
      webphone = _ref2$phone.webphone,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      callHistory = _ref2$phone.callHistory,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
      _ref2$callCtrlRoute = _ref2.callCtrlRoute,
      callCtrlRoute = _ref2$callCtrlRoute === void 0 ? '/calls/active' : _ref2$callCtrlRoute,
      onCreateContact = _ref2.onCreateContact,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      onViewContact = _ref2.onViewContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function (_ref3) {
    var utcTimestamp = _ref3.utcTimestamp;
    return dateTimeFormat.formatDateTime({
      utcTimestamp: utcTimestamp
    });
  } : _ref2$dateTimeFormatt,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute;
  return {
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber["default"])({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    webphoneAnswer: function webphoneAnswer() {
      return webphone && webphone.answer.apply(webphone, arguments);
    },
    webphoneToVoicemail: function webphoneToVoicemail() {
      return webphone && webphone.toVoiceMail.apply(webphone, arguments);
    },
    webphoneReject: function webphoneReject() {
      return webphone && webphone.reject.apply(webphone, arguments);
    },
    webphoneHangup: function webphoneHangup() {
      return webphone && webphone.hangup.apply(webphone, arguments);
    },
    webphoneResume: function webphoneResume() {
      var _arguments = arguments;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (webphone) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return webphone.resume.apply(webphone, _toConsumableArray(_arguments));

              case 4:
                if (routerInteraction.currentPath !== callCtrlRoute) {
                  routerInteraction.push(callCtrlRoute);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onCreateContact: onCreateContact ? /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
        var phoneNumber, name, entityType, hasMatchNumber;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                _context2.next = 3;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 3:
                hasMatchNumber = _context2.sent;

                if (hasMatchNumber) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return onCreateContact({
                  phoneNumber: phoneNumber,
                  name: name,
                  entityType: entityType
                });

              case 7:
                _context2.next = 9;
                return contactMatcher.forceMatchNumber({
                  phoneNumber: phoneNumber
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
        var call, contact, _ref6$redirect, redirect;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                call = _ref6.call, contact = _ref6.contact, _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect;
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

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }(),
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact || function (_ref8) {
      var _ref8$contact = _ref8.contact,
          type = _ref8$contact.type,
          id = _ref8$contact.id;

      if (contactDetailsUI) {
        contactDetailsUI.showContactDetails({
          type: type,
          id: id,
          direct: true
        });
      }
    },
    onClickToDial: dialerUI ? function (recipient) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        dialerUI.call({
          recipient: recipient
        });
        callHistory.onClickToCall();
      }
    } : undefined,
    onClickToSms: composeText ? /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contact) {
        var isDummyContact,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                isDummyContact = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;

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
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref9.apply(this, arguments);
      };
    }() : undefined
  };
}

var CallsListPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsListPanel["default"]));
var _default = CallsListPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
