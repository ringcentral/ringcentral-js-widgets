'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _callingOptions = require('ringcentral-integration/modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

var _AudioSettingsPanel = require('../../components/AudioSettingsPanel');

var _AudioSettingsPanel2 = _interopRequireDefault(_AudioSettingsPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      _ref$phone$audioSetti = _ref$phone.audioSettings,
      dialButtonVolume = _ref$phone$audioSetti.dialButtonVolume,
      dialButtonMuted = _ref$phone$audioSetti.dialButtonMuted,
      ringtoneVolume = _ref$phone$audioSetti.ringtoneVolume,
      ringtoneMuted = _ref$phone$audioSetti.ringtoneMuted,
      callVolume = _ref$phone$audioSetti.callVolume,
      availableInputDevices = _ref$phone$audioSetti.availableInputDevices,
      inputDeviceId = _ref$phone$audioSetti.inputDeviceId,
      availableOutputDevices = _ref$phone$audioSetti.availableOutputDevices,
      outputDeviceId = _ref$phone$audioSetti.outputDeviceId,
      supportDevices = _ref$phone$audioSetti.supportDevices,
      userMedia = _ref$phone$audioSetti.userMedia,
      currentLocale = _ref$phone.locale.currentLocale,
      callWith = _ref$phone.callingSettings.callWith;

  return {
    currentLocale: currentLocale,
    dialButtonVolume: dialButtonVolume,
    dialButtonMuted: dialButtonMuted,
    ringtoneVolume: ringtoneVolume,
    ringtoneMuted: ringtoneMuted,
    callVolume: callVolume,
    availableInputDevices: availableInputDevices,
    inputDeviceId: inputDeviceId,
    availableOutputDevices: availableOutputDevices,
    outputDeviceId: outputDeviceId,
    supportDevices: supportDevices,
    userMedia: userMedia,
    isWebRTC: callWith === _callingOptions2.default.browser
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      routerInteraction = _ref2$phone.routerInteraction,
      audioSettings = _ref2$phone.audioSettings;

  return {
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    onSave: function onSave(data) {
      audioSettings.setData(data);
    },
    checkUserMedia: function checkUserMedia() {
      audioSettings.getUserMedia();
    }
  };
}

var AudioSettingsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_AudioSettingsPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = AudioSettingsPage;
//# sourceMappingURL=index.js.map
