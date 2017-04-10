'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _moduleStatuses = require('ringcentral-integration/enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

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
      dateTimeFormat = _ref.dateTimeFormat,
      callLogger = _ref.callLogger,
      call = _ref.call,
      composeText = _ref.composeText,
      rolesAndPermissions = _ref.rolesAndPermissions;

  return {
    title: _i18n2.default.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callHistory.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity,
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
    loggingMap: callLogger && callLogger.loggingMap,
    showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.status === _moduleStatuses2.default.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready))
  };
}
function mapToFunctions(_, _ref2) {
  var _this = this;

  var dateTimeFormat = _ref2.dateTimeFormat,
      onViewContact = _ref2.onViewContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function (utcTimestamp) {
    return dateTimeFormat.formatDateTime({
      utcTimestamp: utcTimestamp
    });
  } : _ref2$dateTimeFormatt,
      callLogger = _ref2.callLogger,
      onLogCall = _ref2.onLogCall,
      isLoggedContact = _ref2.isLoggedContact,
      call = _ref2.call,
      composeText = _ref2.composeText,
      router = _ref2.router,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/' : _ref2$dialerRoute,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact,
    onClickToDial: call ? function (phoneNumber) {
      if (call.isIdle) {
        router.history.push(dialerRoute);
        call.onToNumberChange(phoneNumber);
        call.onCall();
      }
    } : undefined,
    onClickToSms: composeText ? function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (router) {
                  router.history.push(composeTextRoute);
                }
                composeText.addToNumber(contact);
                if (composeText.typingToNumber === contact.phoneNumber) {
                  composeText.cleanTypingToNumber();
                }

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }() : undefined,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
        var call = _ref5.call,
            contact = _ref5.contact,
            _ref5$redirect = _ref5.redirect,
            redirect = _ref5$redirect === undefined ? true : _ref5$redirect;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return callLogger.logCall({
                  call: call,
                  contact: contact,
                  redirect: redirect
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }()
  };
}

var CallsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsPanel2.default);

exports.default = CallsPage;
//# sourceMappingURL=index.js.map
