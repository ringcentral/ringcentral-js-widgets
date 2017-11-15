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

var _ActiveCallsPanel = require('../../components/ActiveCallsPanel');

var _ActiveCallsPanel2 = _interopRequireDefault(_ActiveCallsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      callLogger = _ref$phone.callLogger,
      callMonitor = _ref$phone.callMonitor,
      locale = _ref$phone.locale,
      regionSettings = _ref$phone.regionSettings,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
      showContactDisplayPlaceholder = _ref$showContactDispl === undefined ? false : _ref$showContactDispl;

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
    showSpinner: false,
    brand: brand.fullName,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog)
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
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout,
      _ref2$callCtrlRoute = _ref2.callCtrlRoute,
      callCtrlRoute = _ref2$callCtrlRoute === undefined ? '/calls/active' : _ref2$callCtrlRoute,
      onCreateContact = _ref2.onCreateContact,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      onCallsEmpty = _ref2.onCallsEmpty,
      onViewContact = _ref2.onViewContact;

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
        return _ref3.apply(this, arguments);
      };
    }(),
    onViewContact: onViewContact || function (_ref4) {
      var contact = _ref4.contact;

      var id = contact.id;
      var type = contact.type;
      routerInteraction.push('/contacts/' + type + '/' + id + '?direct=true');
    },
    onClickToSms: composeText ? function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (routerInteraction) {
                  routerInteraction.push(composeTextRoute);
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
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }() : undefined,
    onCreateContact: onCreateContact ? function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref7) {
        var phoneNumber = _ref7.phoneNumber,
            name = _ref7.name,
            entityType = _ref7.entityType;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context3.sent;

                if (hasMatchNumber) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context3.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x3) {
        return _ref6.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref9) {
        var call = _ref9.call,
            contact = _ref9.contact,
            _ref9$redirect = _ref9.redirect,
            redirect = _ref9$redirect === undefined ? true : _ref9$redirect;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return callLogger.logCall({
                  call: call,
                  contact: contact,
                  redirect: redirect
                });

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }(),
    onCallsEmpty: onCallsEmpty
  };
}

var ActiveCallsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ActiveCallsPanel2.default));

exports.default = ActiveCallsPage;
//# sourceMappingURL=index.js.map
