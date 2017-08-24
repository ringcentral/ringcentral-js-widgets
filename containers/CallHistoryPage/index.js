'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _CallsPanel = require('../../components/CallsPanel');

var _CallsPanel2 = _interopRequireDefault(_CallsPanel);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var locale = _ref.locale,
      callHistory = _ref.callHistory,
      regionSettings = _ref.regionSettings,
      connectivityMonitor = _ref.connectivityMonitor,
      rateLimiter = _ref.rateLimiter,
      dateTimeFormat = _ref.dateTimeFormat,
      callLogger = _ref.callLogger,
      call = _ref.call,
      composeText = _ref.composeText,
      rolesAndPermissions = _ref.rolesAndPermissions,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === undefined ? false : _ref$enableContactFal;

  return {
    enableContactFallback: enableContactFallback,
    title: _i18n2.default.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callHistory.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
    loggingMap: callLogger && callLogger.loggingMap,
    showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready)),
    autoLog: !!(callLogger && callLogger.autoLog)
  };
}
function mapToFunctions(_, _ref2) {
  var _this = this;

  var dateTimeFormat = _ref2.dateTimeFormat,
      onViewContact = _ref2.onViewContact,
      onCreateContact = _ref2.onCreateContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function (_ref3) {
    var utcTimestamp = _ref3.utcTimestamp;
    return dateTimeFormat.formatDateTime({
      utcTimestamp: utcTimestamp
    });
  } : _ref2$dateTimeFormatt,
      callLogger = _ref2.callLogger,
      contactMatcher = _ref2.contactMatcher,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      call = _ref2.call,
      composeText = _ref2.composeText,
      router = _ref2.router,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/dialer' : _ref2$dialerRoute,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout,
      contactSearch = _ref2.contactSearch;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact ? function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref5) {
        var phoneNumber = _ref5.phoneNumber,
            contact = _ref5.contact;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context.sent;

                if (!hasMatchNumber) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return onViewContact({ phoneNumber: phoneNumber, contact: contact });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }() : undefined,
    onCreateContact: onCreateContact ? function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref7) {
        var phoneNumber = _ref7.phoneNumber,
            name = _ref7.name,
            entityType = _ref7.entityType;
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

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }() : undefined,
    onClickToDial: call ? function (phoneNumber) {
      if (call.isIdle) {
        router.push(dialerRoute);
        call.onToNumberChange(phoneNumber);
        call.onCall();
      }
    } : undefined,
    onClickToSms: composeText ? function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (router) {
                  router.push(composeTextRoute);
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

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x3) {
        return _ref8.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref10) {
        var call = _ref10.call,
            contact = _ref10.contact,
            _ref10$redirect = _ref10.redirect,
            redirect = _ref10$redirect === undefined ? true : _ref10$redirect;
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

      return function (_x5) {
        return _ref9.apply(this, arguments);
      };
    }()
  };
}

var CallsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsPanel2.default);

exports.default = CallsPage;
//# sourceMappingURL=index.js.map
