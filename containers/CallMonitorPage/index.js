"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _CallsPanel = _interopRequireDefault(require("../../components/CallsPanel"));

var _phoneContext = require("../../lib/phoneContext");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      brand = _ref$phone.brand,
      callMonitor = _ref$phone.callMonitor,
      regionSettings = _ref$phone.regionSettings,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      callLogger = _ref$phone.callLogger,
      composeText = _ref$phone.composeText,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal;
  return {
    enableContactFallback: enableContactFallback,
    active: true,
    brand: brand.fullName,
    title: _i18n.default.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callMonitor.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
    loggingMap: callLogger && callLogger.loggingMap,
    showSpinner: !(locale.ready && callMonitor.ready && regionSettings.ready && connectivityMonitor.ready && dateTimeFormat.ready && (!callLogger || callLogger.ready) && (!rolesAndPermissions || rolesAndPermissions.ready) && (!composeText || composeText.ready)),
    autoLog: !!(callLogger && callLogger.autoLog)
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      callLogger = _ref2$phone.callLogger,
      composeText = _ref2$phone.composeText,
      contactMatcher = _ref2$phone.contactMatcher,
      contactSearch = _ref2$phone.contactSearch,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      routerInteraction = _ref2$phone.routerInteraction,
      webphone = _ref2$phone.webphone,
      onViewContact = _ref2.onViewContact,
      onCreateContact = _ref2.onCreateContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function (_ref3) {
    var utcTimestamp = _ref3.utcTimestamp;
    return dateTimeFormat.formatDateTime({
      utcTimestamp: utcTimestamp
    });
  } : _ref2$dateTimeFormatt,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout;
  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact ?
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref4) {
        var phoneNumber, contact, hasMatchNumber;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                phoneNumber = _ref4.phoneNumber, contact = _ref4.contact;
                _context.next = 3;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 3:
                hasMatchNumber = _context.sent;

                if (!hasMatchNumber) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return onViewContact({
                  phoneNumber: phoneNumber,
                  contact: contact
                });

              case 7:
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
    onCreateContact: onCreateContact ?
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref6) {
        var phoneNumber, name, entityType, hasMatchNumber;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                phoneNumber = _ref6.phoneNumber, name = _ref6.name, entityType = _ref6.entityType;
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

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger &&
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref8) {
        var call, contact, _ref8$redirect, redirect;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                call = _ref8.call, contact = _ref8.contact, _ref8$redirect = _ref8.redirect, redirect = _ref8$redirect === void 0 ? true : _ref8$redirect;
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
        return _ref9.apply(this, arguments);
      };
    }(),
    onClickToSms: composeText ?
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(contact) {
        var isDummyContact,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                isDummyContact = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;

                if (routerInteraction) {
                  routerInteraction.push(composeTextRoute);
                }

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

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref10.apply(this, arguments);
      };
    }() : undefined,
    webphoneAnswer: function webphoneAnswer() {
      return webphone && webphone.answer.apply(webphone, arguments);
    },
    webphoneReject: function webphoneReject() {
      return webphone && webphone.reject.apply(webphone, arguments);
    },
    webphoneHangup: function webphoneHangup() {
      return webphone && webphone.hangup.apply(webphone, arguments);
    },
    webphoneResume: function webphoneResume() {
      return webphone && webphone.resume.apply(webphone, arguments);
    }
  };
}

var CallMonitorPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsPanel.default));
var _default = CallMonitorPage;
exports.default = _default;
//# sourceMappingURL=index.js.map
