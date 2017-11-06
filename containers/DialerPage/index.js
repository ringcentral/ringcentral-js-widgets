'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      call = _ref$phone.call,
      callingSettings = _ref$phone.callingSettings,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      locale = _ref$phone.locale,
      rateLimiter = _ref$phone.rateLimiter,
      webphone = _ref$phone.webphone,
      _ref$phone$audioSetti = _ref$phone.audioSettings,
      dialButtonVolume = _ref$phone$audioSetti.dialButtonVolume,
      dialButtonMuted = _ref$phone$audioSetti.dialButtonMuted;

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
    showSpinner: !(call.ready && callingSettings.ready && locale.ready && connectivityMonitor.ready && (!isWebphoneMode || !webphone || !waitingWebphoneConnected)),
    dialButtonVolume: dialButtonVolume,
    dialButtonMuted: dialButtonMuted
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      call = _ref2$phone.call,
      callingSettings = _ref2$phone.callingSettings,
      regionSettings = _ref2$phone.regionSettings;

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

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = DialerPage;
//# sourceMappingURL=index.js.map
