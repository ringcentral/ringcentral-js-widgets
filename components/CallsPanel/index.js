'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallsPanel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('core-js/fn/array/find');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _CallList = require('../CallList');

var _CallList2 = _interopRequireDefault(_CallList);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallsPanel(_ref) {
  var brand = _ref.brand,
      currentLocale = _ref.currentLocale,
      calls = _ref.calls,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      onViewContact = _ref.onViewContact,
      onCreateContact = _ref.onCreateContact,
      onLogCall = _ref.onLogCall,
      onClickToDial = _ref.onClickToDial,
      onClickToSms = _ref.onClickToSms,
      isLoggedContact = _ref.isLoggedContact,
      disableLinks = _ref.disableLinks,
      disableClickToDial = _ref.disableClickToDial,
      outboundSmsPermission = _ref.outboundSmsPermission,
      internalSmsPermission = _ref.internalSmsPermission,
      dateTimeFormatter = _ref.dateTimeFormatter,
      showSpinner = _ref.showSpinner,
      title = _ref.title,
      active = _ref.active,
      loggingMap = _ref.loggingMap,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      enableContactFallback = _ref.enableContactFallback,
      autoLog = _ref.autoLog,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      sourceIcons = _ref.sourceIcons;

  var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_CallList2.default, {
    brand: brand,
    currentLocale: currentLocale,
    calls: calls,
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
    dateTimeFormatter: dateTimeFormatter,
    active: active,
    loggingMap: loggingMap,
    webphoneAnswer: webphoneAnswer,
    webphoneReject: webphoneReject,
    webphoneHangup: webphoneHangup,
    webphoneResume: webphoneResume,
    enableContactFallback: enableContactFallback,
    autoLog: autoLog,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    sourceIcons: sourceIcons
  });
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    _react2.default.createElement(
      _Header2.default,
      null,
      title
    ),
    _react2.default.createElement(
      _Panel2.default,
      { className: _styles2.default.content },
      content
    )
  );
}

CallsPanel.propTypes = {
  brand: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  isLoggedContact: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool.isRequired,
  disableClickToDial: _propTypes2.default.bool,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  showSpinner: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  loggingMap: _propTypes2.default.object,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};

CallsPanel.defaultProps = {
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  showSpinner: false,
  title: '',
  active: false,
  isLoggedContact: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined
};
//# sourceMappingURL=index.js.map
