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

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      brand = _ref$phone.brand,
      callHistory = _ref$phone.callHistory,
      regionSettings = _ref$phone.regionSettings,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      callLogger = _ref$phone.callLogger,
      call = _ref$phone.call,
      composeText = _ref$phone.composeText,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === undefined ? false : _ref$enableContactFal;

  return {
    enableContactFallback: enableContactFallback,
    brand: brand.fullName,
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

  var _ref2$phone = _ref2.phone,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      callLogger = _ref2$phone.callLogger,
      contactMatcher = _ref2$phone.contactMatcher,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      composeText = _ref2$phone.composeText,
      routerInteraction = _ref2$phone.routerInteraction,
      contactSearch = _ref2$phone.contactSearch,
      callHistory = _ref2$phone.callHistory,
      onCreateContact = _ref2.onCreateContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function (_ref3) {
    var utcTimestamp = _ref3.utcTimestamp;
    return dateTimeFormat.formatDateTime({
      utcTimestamp: utcTimestamp
    });
  } : _ref2$dateTimeFormatt,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/dialer' : _ref2$dialerRoute,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout,
      onViewContact = _ref2.onViewContact;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact || function (_ref4) {
      var _ref4$contact = _ref4.contact,
          type = _ref4$contact.type,
          id = _ref4$contact.id;

      routerInteraction.push('/contacts/' + type + '/' + id + '?direct=true');
    },
    onCreateContact: onCreateContact ? function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref6) {
        var phoneNumber = _ref6.phoneNumber,
            name = _ref6.name,
            entityType = _ref6.entityType;
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

                if (hasMatchNumber) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }() : undefined,
    onClickToDial: dialerUI ? function (recipient) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        dialerUI.call({ recipient: recipient });
        callHistory.onClickToCall();
      }
    } : undefined,
    onClickToSms: composeText ? function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
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
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref9) {
        var call = _ref9.call,
            contact = _ref9.contact,
            _ref9$redirect = _ref9.redirect,
            redirect = _ref9$redirect === undefined ? true : _ref9$redirect;
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

      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }()
  };
}

var CallsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsPanel2.default));

exports.default = CallsPage;
//# sourceMappingURL=index.js.map
