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
      callMonitor = _ref.callMonitor,
      regionSettings = _ref.regionSettings,
      connectivityMonitor = _ref.connectivityMonitor,
      dateTimeFormat = _ref.dateTimeFormat,
      callLogger = _ref.callLogger;

  return {
    active: true,
    title: _i18n2.default.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callMonitor.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity,
    loggingMap: callLogger.loggingMap,
    showSpinner: !(locale.ready && callMonitor.ready && regionSettings.ready && connectivityMonitor.ready && dateTimeFormat.ready && callLogger.ready)
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
      isLoggedContact = _ref2.isLoggedContact;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact,
    isLoggedContact: isLoggedContact,
    onLogCall: onLogCall || callLogger && function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref4) {
        var call = _ref4.call,
            contact = _ref4.contact,
            _ref4$redirect = _ref4.redirect,
            redirect = _ref4$redirect === undefined ? true : _ref4$redirect;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return callLogger.logCall({
                  call: call,
                  contact: contact,
                  redirect: redirect
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }()
  };
}

var CallMonitorPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsPanel2.default);

exports.default = CallMonitorPage;
//# sourceMappingURL=index.js.map
