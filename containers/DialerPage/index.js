'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _CallingSettings = require('ringcentral-integration/modules/CallingSettings');

var _CallingSettings2 = _interopRequireDefault(_CallingSettings);

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _Call = require('ringcentral-integration/modules/Call');

var _Call2 = _interopRequireDefault(_Call);

var _ConnectivityMonitor = require('ringcentral-integration/modules/ConnectivityMonitor');

var _ConnectivityMonitor2 = _interopRequireDefault(_ConnectivityMonitor);

var _RateLimiter = require('ringcentral-integration/modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var call = _ref.call,
      callingSettings = _ref.callingSettings,
      connectivityMonitor = _ref.connectivityMonitor,
      locale = _ref.locale,
      rateLimiter = _ref.rateLimiter,
      webphone = _ref.webphone;

  var isWebphoneMode = callingSettings.callingMode === _callingModes2.default.webphone;
  var waitingWebphoneConnected = isWebphoneMode && webphone && webphone.connecting;
  var webphoneDisconnected = isWebphoneMode && webphone && !webphone.connected;
  return {
    currentLocale: locale.currentLocale,
    callingMode: callingSettings.callingMode,
    isWebphoneMode: isWebphoneMode,
    callButtonDisabled: !call.isIdle || !connectivityMonitor.connectivity || rateLimiter.throttling || webphoneDisconnected,
    toNumber: call.toNumber,
    fromNumbers: callingSettings.fromNumbers,
    fromNumber: callingSettings.fromNumber,
    showSpinner: !(call.ready && callingSettings.ready && locale.ready && connectivityMonitor.ready && (!isWebphoneMode || !webphone || !waitingWebphoneConnected))
  };
}

function mapToFunctions(_, _ref2) {
  var call = _ref2.call,
      callingSettings = _ref2.callingSettings,
      regionSettings = _ref2.regionSettings;

  return {
    keepToNumber: function keepToNumber(value) {
      call.onToNumberChange(value);
    },
    onCall: function onCall() {
      call.onCall();
    },
    changeFromNumber: function changeFromNumber() {
      return callingSettings.updateFromNumber.apply(callingSettings, arguments);
    },
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings && regionSettings.areaCode,
        countryCode: regionSettings && regionSettings.countryCode
      });
    }
  };
}

var DialerPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_DialerPanel2.default);

var propTypes = {
  call: _propTypes2.default.instanceOf(_Call2.default).isRequired,
  callingSettings: _propTypes2.default.instanceOf(_CallingSettings2.default).isRequired,
  connectivityMonitor: _propTypes2.default.instanceOf(_ConnectivityMonitor2.default).isRequired,
  locale: _propTypes2.default.instanceOf(_Locale2.default).isRequired,
  rateLimiter: _propTypes2.default.instanceOf(_RateLimiter2.default).isRequired
};

DialerPage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = DialerPage;
//# sourceMappingURL=index.js.map
