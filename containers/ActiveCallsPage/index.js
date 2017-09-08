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

var _ActiveCallsPanel = require('../../components/ActiveCallsPanel');

var _ActiveCallsPanel2 = _interopRequireDefault(_ActiveCallsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var callMonitor = _ref.callMonitor,
      locale = _ref.locale,
      regionSettings = _ref.regionSettings,
      rolesAndPermissions = _ref.rolesAndPermissions,
      brand = _ref.brand,
      _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
      showContactDisplayPlaceholder = _ref$showContactDispl === undefined ? false : _ref$showContactDispl,
      callLogger = _ref.callLogger;

  return {
    hasCalls: callMonitor.calls.length !== 0,
    currentLocale: locale.currentLocale,
    activeRingCalls: callMonitor.activeRingCalls,
    activeOnHoldCalls: callMonitor.activeOnHoldCalls,
    activeCurrentCalls: callMonitor.activeCurrentCalls,
    otherDeviceCalls: callMonitor.otherDeviceCalls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
    showSpinner: false,
    brand: brand.fullName,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var webphone = _ref2.webphone,
      regionSettings = _ref2.regionSettings,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout,
      _ref2$callCtrlRoute = _ref2.callCtrlRoute,
      callCtrlRoute = _ref2$callCtrlRoute === undefined ? '/calls/active' : _ref2$callCtrlRoute,
      onViewContact = _ref2.onViewContact,
      onCreateContact = _ref2.onCreateContact,
      composeText = _ref2.composeText,
      callLogger = _ref2.callLogger,
      onLogCall = _ref2.onLogCall,
      contactMatcher = _ref2.contactMatcher,
      router = _ref2.router,
      contactSearch = _ref2.contactSearch,
      isLoggedContact = _ref2.isLoggedContact,
      onCallsEmpty = _ref2.onCallsEmpty;

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
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
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
                if (router.currentPath !== callCtrlRoute) {
                  router.push(callCtrlRoute);
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function webphoneResume() {
        return _ref3.apply(this, arguments);
      };
    }(),
    onViewContact: onViewContact ? function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
        var phoneNumber = _ref5.phoneNumber,
            contact = _ref5.contact;
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

                if (!hasMatchNumber) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return onViewContact({ phoneNumber: phoneNumber, contact: contact });

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }() : undefined,
    onClickToSms: composeText ? function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (router) {
                  router.push(composeTextRoute);
                }
                if (contact.name && contact.phoneNumber && isDummyContact) {
                  composeText.updateTypingToNumber(contact.name);
                  contactSearch.search({ searchString: contact.name });
                } else {
                  composeText.addToNumber(contact);
                  if (composeText.typingToNumber === contact.phoneNumber) {
                    composeText.cleanTypingToNumber();
                  }
                }

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }() : undefined,
    onCreateContact: onCreateContact ? function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref8) {
        var phoneNumber = _ref8.phoneNumber,
            name = _ref8.name,
            entityType = _ref8.entityType;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context4.sent;

                if (hasMatchNumber) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context4.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function (_x4) {
        return _ref7.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref10) {
        var call = _ref10.call,
            contact = _ref10.contact,
            _ref10$redirect = _ref10.redirect,
            redirect = _ref10$redirect === undefined ? true : _ref10$redirect;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return callLogger.logCall({
                  call: call,
                  contact: contact,
                  redirect: redirect
                });

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }));

      return function (_x5) {
        return _ref9.apply(this, arguments);
      };
    }(),
    onCallsEmpty: onCallsEmpty
  };
}

var ActiveCallsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ActiveCallsPanel2.default);

exports.default = ActiveCallsPage;
//# sourceMappingURL=index.js.map
