'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _CallsListPanel = require('../../components/CallsListPanel');

var _CallsListPanel2 = _interopRequireDefault(_CallsListPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO it is ActiveCallsPage's function is the same, and remove ActiveCallsPage after migration.

function mapToProps(_, _ref) {
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
      _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
      showContactDisplayPlaceholder = _ref$showContactDispl === undefined ? false : _ref$showContactDispl,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === undefined ? false : _ref$enableContactFal;

  return {
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
    calls: callHistory.calls,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    loggingMap: callLogger && callLogger.loggingMap,
    showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready))
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      callLogger = _ref2$phone.callLogger,
      composeText = _ref2$phone.composeText,
      contactMatcher = _ref2$phone.contactMatcher,
      contactSearch = _ref2$phone.contactSearch,
      regionSettings = _ref2$phone.regionSettings,
      routerInteraction = _ref2$phone.routerInteraction,
      webphone = _ref2$phone.webphone,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      callHistory = _ref2$phone.callHistory,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout,
      _ref2$callCtrlRoute = _ref2.callCtrlRoute,
      callCtrlRoute = _ref2$callCtrlRoute === undefined ? '/calls/active' : _ref2$callCtrlRoute,
      onCreateContact = _ref2.onCreateContact,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      onViewContact = _ref2.onViewContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function (_ref3) {
    var utcTimestamp = _ref3.utcTimestamp;
    return dateTimeFormat.formatDateTime({
      utcTimestamp: utcTimestamp
    });
  } : _ref2$dateTimeFormatt,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/dialer' : _ref2$dialerRoute;

  return {
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
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
    webphoneResume: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _args = arguments;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (webphone) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                _context.next = 4;
                return webphone.resume.apply(webphone, _args);

              case 4:
                if (routerInteraction.currentPath !== callCtrlRoute) {
                  routerInteraction.push(callCtrlRoute);
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function webphoneResume() {
        return _ref4.apply(this, arguments);
      };
    }(),
    onCreateContact: onCreateContact ? function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref6) {
        var phoneNumber = _ref6.phoneNumber,
            name = _ref6.name,
            entityType = _ref6.entityType;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context2.sent;

                if (hasMatchNumber) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context2.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref8) {
        var call = _ref8.call,
            contact = _ref8.contact,
            _ref8$redirect = _ref8.redirect,
            redirect = _ref8$redirect === undefined ? true : _ref8$redirect;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return callLogger.logCall({
                  call: call,
                  contact: contact,
                  redirect: redirect
                });

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }(),

    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact || function (_ref9) {
      var _ref9$contact = _ref9.contact,
          type = _ref9$contact.type,
          id = _ref9$contact.id;

      routerInteraction.push('/contacts/' + type + '/' + id + '?direct=true');
    },
    onClickToDial: dialerUI ? function (recipient) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        dialerUI.call({ recipient: recipient });
        callHistory.onClickToCall();
      }
    } : undefined,
    onClickToSms: composeText ? function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (routerInteraction) {
                  routerInteraction.push(composeTextRoute);
                }
                // if contact autocomplete, if no match fill the number only
                if (contact.name && contact.phoneNumber && isDummyContact) {
                  composeText.updateTypingToNumber(contact.name);
                  contactSearch.search({ searchString: contact.name });
                } else {
                  composeText.addToNumber(contact);
                  if (composeText.typingToNumber === contact.phoneNumber) {
                    composeText.cleanTypingToNumber();
                  }
                }
                callHistory.onClickToSMS();

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function (_x3) {
        return _ref10.apply(this, arguments);
      };
    }() : undefined
  };
}

var CallsListPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsListPanel2.default));

exports.default = CallsListPage;
//# sourceMappingURL=index.js.map
