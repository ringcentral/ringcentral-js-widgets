'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CallItem = require('../CallItem');

var _CallItem2 = _interopRequireDefault(_CallItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoCalls(_ref) {
  var currentLocale = _ref.currentLocale,
      active = _ref.active;

  return _react2.default.createElement(
    'p',
    { className: _styles2.default.noCalls },
    _i18n2.default.getString(active ? 'noActiveCalls' : 'noRecords', currentLocale)
  );
}
NoCalls.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  active: _propTypes2.default.bool.isRequired
};

function CallList(_ref2) {
  var className = _ref2.className,
      brand = _ref2.brand,
      currentLocale = _ref2.currentLocale,
      calls = _ref2.calls,
      areaCode = _ref2.areaCode,
      countryCode = _ref2.countryCode,
      onViewContact = _ref2.onViewContact,
      onCreateContact = _ref2.onCreateContact,
      onLogCall = _ref2.onLogCall,
      onClickToDial = _ref2.onClickToDial,
      onClickToSms = _ref2.onClickToSms,
      isLoggedContact = _ref2.isLoggedContact,
      disableLinks = _ref2.disableLinks,
      disableClickToDial = _ref2.disableClickToDial,
      outboundSmsPermission = _ref2.outboundSmsPermission,
      internalSmsPermission = _ref2.internalSmsPermission,
      active = _ref2.active,
      dateTimeFormatter = _ref2.dateTimeFormatter,
      loggingMap = _ref2.loggingMap,
      webphoneAnswer = _ref2.webphoneAnswer,
      webphoneReject = _ref2.webphoneReject,
      webphoneHangup = _ref2.webphoneHangup,
      webphoneResume = _ref2.webphoneResume,
      enableContactFallback = _ref2.enableContactFallback,
      autoLog = _ref2.autoLog,
      showContactDisplayPlaceholder = _ref2.showContactDisplayPlaceholder,
      sourceIcons = _ref2.sourceIcons;

  if (calls && calls.length) {
    return _react2.default.createElement(
      'div',
      { className: className },
      calls.map(function (call) {
        return _react2.default.createElement(_CallItem2.default, {
          key: call.id,
          call: call,
          currentLocale: currentLocale,
          brand: brand,
          areaCode: areaCode,
          countryCode: countryCode,
          onViewContact: onViewContact,
          onCreateContact: onCreateContact,
          onLogCall: onLogCall,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          isLoggedContact: isLoggedContact,
          disableLinks: disableLinks,
          disableClickToDial: disableClickToDial,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          active: active,
          dateTimeFormatter: dateTimeFormatter,
          isLogging: !!loggingMap[call.sessionId],
          webphoneAnswer: webphoneAnswer,
          webphoneReject: webphoneReject,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          enableContactFallback: enableContactFallback,
          autoLog: autoLog,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          sourceIcons: sourceIcons
        });
      })
    );
  }
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(NoCalls, { currentLocale: currentLocale, active: active })
  );
}

CallList.propTypes = {
  className: _propTypes2.default.string,
  brand: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.arrayOf(_CallItem2.default.propTypes.call).isRequired,
  active: _propTypes2.default.bool,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  isLoggedContact: _propTypes2.default.func,
  loggingMap: _propTypes2.default.object,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};
CallList.defaultProps = {
  className: null,
  active: false,
  disableLinks: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  isLoggedContact: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  autoLog: false,
  sourceIcons: undefined
};

exports.default = CallList;
//# sourceMappingURL=index.js.map
