'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActiveCallsPanel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _ActiveCallItem = require('../ActiveCallItem');

var _ActiveCallItem2 = _interopRequireDefault(_ActiveCallItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveCallList(_ref) {
  var calls = _ref.calls,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      brand = _ref.brand,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      formatPhone = _ref.formatPhone,
      onClickToSms = _ref.onClickToSms,
      onCreateContact = _ref.onCreateContact,
      onViewContact = _ref.onViewContact,
      outboundSmsPermission = _ref.outboundSmsPermission,
      internalSmsPermission = _ref.internalSmsPermission,
      isLoggedContact = _ref.isLoggedContact,
      onLogCall = _ref.onLogCall,
      autoLog = _ref.autoLog,
      loggingMap = _ref.loggingMap,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      enableContactFallback = _ref.enableContactFallback,
      title = _ref.title;

  if (calls.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.list, className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.listTitle },
      title
    ),
    calls.map(function (call) {
      return _react2.default.createElement(_ActiveCallItem2.default, {
        call: call,
        key: call.id,
        currentLocale: currentLocale,
        areaCode: areaCode,
        countryCode: countryCode,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        formatPhone: formatPhone,
        onClickToSms: onClickToSms,
        internalSmsPermission: internalSmsPermission,
        outboundSmsPermission: outboundSmsPermission,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog
      });
    })
  );
}

ActiveCallList.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  isLoggedContact: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  loggingMap: _propTypes2.default.object,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool
};

ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined
};

function ActiveCallsPanel(_ref2) {
  var hasCalls = _ref2.hasCalls,
      activeRingCalls = _ref2.activeRingCalls,
      activeOnHoldCalls = _ref2.activeOnHoldCalls,
      activeCurrentCalls = _ref2.activeCurrentCalls,
      otherDeviceCalls = _ref2.otherDeviceCalls,
      showSpinner = _ref2.showSpinner,
      className = _ref2.className,
      currentLocale = _ref2.currentLocale,
      areaCode = _ref2.areaCode,
      countryCode = _ref2.countryCode,
      brand = _ref2.brand,
      showContactDisplayPlaceholder = _ref2.showContactDisplayPlaceholder,
      formatPhone = _ref2.formatPhone,
      onClickToSms = _ref2.onClickToSms,
      onCreateContact = _ref2.onCreateContact,
      onViewContact = _ref2.onViewContact,
      outboundSmsPermission = _ref2.outboundSmsPermission,
      internalSmsPermission = _ref2.internalSmsPermission,
      isLoggedContact = _ref2.isLoggedContact,
      onLogCall = _ref2.onLogCall,
      autoLog = _ref2.autoLog,
      loggingMap = _ref2.loggingMap,
      webphoneAnswer = _ref2.webphoneAnswer,
      webphoneReject = _ref2.webphoneReject,
      webphoneHangup = _ref2.webphoneHangup,
      webphoneResume = _ref2.webphoneResume,
      enableContactFallback = _ref2.enableContactFallback;

  if (showSpinner) {
    return _react2.default.createElement(_SpinnerOverlay2.default, null);
  }
  if (!hasCalls) {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.root, className) },
      _react2.default.createElement(
        'p',
        { className: _styles2.default.noCalls },
        _i18n2.default.getString('noActiveCalls', currentLocale)
      )
    );
  }
  var getCallList = function getCallList(calls, title) {
    return _react2.default.createElement(ActiveCallList, {
      title: title,
      calls: calls,
      currentLocale: currentLocale,
      areaCode: areaCode,
      countryCode: countryCode,
      brand: brand,
      showContactDisplayPlaceholder: showContactDisplayPlaceholder,
      formatPhone: formatPhone,
      onClickToSms: onClickToSms,
      onCreateContact: onCreateContact,
      onViewContact: onViewContact,
      outboundSmsPermission: outboundSmsPermission,
      internalSmsPermission: internalSmsPermission,
      isLoggedContact: isLoggedContact,
      onLogCall: onLogCall,
      autoLog: autoLog,
      loggingMap: loggingMap,
      webphoneAnswer: webphoneAnswer,
      webphoneReject: webphoneReject,
      webphoneHangup: webphoneHangup,
      webphoneResume: webphoneResume,
      enableContactFallback: enableContactFallback
    });
  };
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    getCallList(activeRingCalls, _i18n2.default.getString('ringCall', currentLocale)),
    getCallList(activeCurrentCalls, _i18n2.default.getString('currentCall', currentLocale)),
    getCallList(activeOnHoldCalls, _i18n2.default.getString('onHoldCall', currentLocale)),
    getCallList(otherDeviceCalls, _i18n2.default.getString('otherDeviceCall', currentLocale))
  );
}

ActiveCallsPanel.propTypes = {
  hasCalls: _propTypes2.default.bool.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  activeRingCalls: _propTypes2.default.array.isRequired,
  activeOnHoldCalls: _propTypes2.default.array.isRequired,
  activeCurrentCalls: _propTypes2.default.array.isRequired,
  otherDeviceCalls: _propTypes2.default.array.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  isLoggedContact: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  autoLog: _propTypes2.default.bool,
  onViewContact: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  loggingMap: _propTypes2.default.object
};

ActiveCallsPanel.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  onViewContact: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false
};
//# sourceMappingURL=index.js.map
