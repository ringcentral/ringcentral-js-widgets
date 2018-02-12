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

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      call = _ref$phone.call,
      dialerUI = _ref$phone.dialerUI,
      callingSettings = _ref$phone.callingSettings,
      contactSearch = _ref$phone.contactSearch,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      locale = _ref$phone.locale,
      rateLimiter = _ref$phone.rateLimiter,
      webphone = _ref$phone.webphone,
      audioSettings = _ref$phone.audioSettings;

  var isWebphoneMode = callingSettings.callingMode === _callingModes2.default.webphone;
  var waitingWebphoneConnected = isWebphoneMode && webphone && webphone.connecting;
  var webphoneDisconnected = isWebphoneMode && webphone && !webphone.connected;
  return {
    currentLocale: locale.currentLocale,
    callingMode: callingSettings.callingMode,
    isWebphoneMode: isWebphoneMode,
    callButtonDisabled: !call.isIdle || !connectivityMonitor.connectivity || rateLimiter.throttling || webphoneDisconnected,
    toNumber: dialerUI.toNumberField,
    recipient: dialerUI.recipient,
    searchContactList: contactSearch ? contactSearch.sortedResult : [],
    fromNumbers: callingSettings.fromNumbers,
    fromNumber: callingSettings.fromNumber,
    showSpinner: !(call.ready && callingSettings.ready && locale.ready && connectivityMonitor.ready && (!isWebphoneMode || !webphone || !waitingWebphoneConnected)),
    dialButtonVolume: audioSettings ? audioSettings.dialButtonVolume : 1,
    dialButtonMuted: audioSettings ? audioSettings.dialButtonMuted : 1
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      callingSettings = _ref2$phone.callingSettings,
      regionSettings = _ref2$phone.regionSettings,
      contactSearch = _ref2$phone.contactSearch,
      dialerUI = _ref2$phone.dialerUI,
      phoneTypeRenderer = _ref2.phoneTypeRenderer;

  return {
    onToNumberChange: function onToNumberChange(value) {
      return dialerUI.setToNumberField(value);
    },
    clearToNumber: function clearToNumber() {
      return dialerUI.clearToNumberField();
    },
    onCallButtonClick: function onCallButtonClick() {
      dialerUI.onCallButtonClick();
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
    },
    setRecipient: function setRecipient(recipient) {
      return dialerUI.setRecipient(recipient);
    },
    clearRecipient: function clearRecipient() {
      return dialerUI.clearRecipient();
    },
    searchContact: function searchContact(searchString) {
      if (!contactSearch) {
        return;
      }
      contactSearch.debouncedSearch({ searchString: searchString });
    },
    phoneTypeRenderer: phoneTypeRenderer
  };
}

var DialerPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_DialerPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = DialerPage;
//# sourceMappingURL=index.js.map
