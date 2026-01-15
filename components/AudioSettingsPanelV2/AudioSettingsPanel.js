"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsPanel = void 0;
var _VolumeInspector = require("@ringcentral-integration/commons/modules/VolumeInspector");
var _webphoneHelper = require("@ringcentral-integration/commons/modules/Webphone/webphoneHelper");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _PageHeader = require("../BackHeader/PageHeader");
var _RingtoneSelection = require("../RingtoneSelection");
var _components = require("./components");
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
var AudioSettingsPanel = function AudioSettingsPanel(_ref) {
  var availableInputDevices = _ref.availableInputDevices,
    availableOutputDevices = _ref.availableOutputDevices,
    availableRingtoneDevices = _ref.availableRingtoneDevices,
    callVolume = _ref.callVolume,
    showDangerAlert = _ref.showDangerAlert,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$inputDeviceDisab = _ref.inputDeviceDisabled,
    inputDeviceDisabled = _ref$inputDeviceDisab === void 0 ? false : _ref$inputDeviceDisab,
    inputDeviceId = _ref.inputDeviceId,
    onBackButtonClick = _ref.onBackButtonClick,
    onSave = _ref.onSave,
    _ref$outputDeviceDisa = _ref.outputDeviceDisabled,
    outputDeviceDisabled = _ref$outputDeviceDisa === void 0 ? false : _ref$outputDeviceDisa,
    _ref$ringtoneSelectDi = _ref.ringtoneSelectDisabled,
    ringtoneSelectDisabled = _ref$ringtoneSelectDi === void 0 ? false : _ref$ringtoneSelectDi,
    outputDeviceId = _ref.outputDeviceId,
    ringtoneVolume = _ref.ringtoneVolume,
    isAGCEnabled = _ref.isAGCEnabled,
    showAGCEnabled = _ref.showAGCEnabled,
    hasUserMedia = _ref.hasUserMedia,
    ringtoneDeviceId = _ref.ringtoneDeviceId,
    handleTestMicroClick = _ref.handleTestMicroClick,
    handleTestSpeakerClick = _ref.handleTestSpeakerClick,
    checkAudioAvailable = _ref.checkAudioAvailable,
    volumeTestData = _ref.volumeTestData,
    fullRingtoneList = _ref.fullRingtoneList,
    selectedRingtoneId = _ref.selectedRingtoneId,
    isUploadRingtoneDisabled = _ref.isUploadRingtoneDisabled,
    enableCustomRingtone = _ref.enableCustomRingtone,
    uploadCustomRingtone = _ref.uploadCustomRingtone,
    updateCurrentRingtone = _ref.updateCurrentRingtone,
    removeCustomRingtone = _ref.removeCustomRingtone;
  (0, _react.useEffect)(function () {
    checkAudioAvailable();
  }, []);
  var enableTestVolumeAndSource = !((0, _utils.isSafari)() || (0, _webphoneHelper.isFirefox)());
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onBackButtonClick
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, (0, _i18n.t)('title')), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, /*#__PURE__*/_react["default"].createElement(_components.Section, {
    show: enableTestVolumeAndSource,
    label: (0, _i18n.t)('input'),
    dataSign: "inputDeviceSection"
  }, /*#__PURE__*/_react["default"].createElement(_components.AudioDeviceSelect, {
    dataSign: "microphoneDeviceSelect",
    label: (0, _i18n.t)('microphone'),
    availableDevices: availableInputDevices,
    isDisabled: inputDeviceDisabled,
    deviceId: inputDeviceId,
    onChange: function onChange(deviceId) {
      onSave({
        inputDeviceId: deviceId
      });
    }
  }), /*#__PURE__*/_react["default"].createElement(_components.VolumeTester, _extends({}, volumeTestData, {
    disabled: inputDeviceDisabled,
    audioType: _VolumeInspector.TEST_TYPE.microphone,
    handleButtonClick: function handleButtonClick() {
      handleTestMicroClick(volumeTestData.testState);
    }
  })), showAGCEnabled && /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    formControlLabelProps: {
      labelPlacement: 'start',
      style: {
        alignItems: 'start',
        marginLeft: 0
      }
    },
    "data-sign": "autoAdjustMicLevel",
    disabled: !hasUserMedia,
    className: _styles["default"]["switch"],
    label: /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "body2"
    }, (0, _i18n.t)('autoAdjustMicLevel')),
    checked: isAGCEnabled,
    onChange: function onChange(_, checked) {
      onSave({
        isAGCEnabled: checked
      });
    }
  })), /*#__PURE__*/_react["default"].createElement(_components.Section, {
    label: (0, _i18n.t)('output'),
    dataSign: "outputDeviceSection"
  }, enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_components.AudioDeviceSelect, {
    dataSign: "speakerDeviceSelect",
    availableDevices: availableOutputDevices,
    isDisabled: outputDeviceDisabled,
    deviceId: outputDeviceId,
    onChange: function onChange(deviceId) {
      onSave({
        outputDeviceId: deviceId
      });
    },
    label: (0, _i18n.t)('speakerSource')
  }), enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_components.VolumeTester, _extends({}, volumeTestData, {
    audioType: _VolumeInspector.TEST_TYPE.speaker,
    disabled: outputDeviceDisabled,
    handleButtonClick: function handleButtonClick() {
      handleTestSpeakerClick(volumeTestData.testState);
    }
  })), /*#__PURE__*/_react["default"].createElement(_components.VolumeSlider, {
    volume: callVolume,
    dataSign: "speakerVolume",
    label: (0, _i18n.t)('speakerVolume'),
    onChange: function onChange(volume) {
      onSave({
        callVolume: volume
      });
    }
  }), enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_components.AudioDeviceSelect, {
    dataSign: "ringtoneDeviceSelect",
    isDisabled: ringtoneSelectDisabled,
    availableDevices: availableRingtoneDevices,
    deviceId: ringtoneDeviceId,
    onChange: function onChange(deviceId) {
      onSave({
        ringtoneDeviceId: deviceId
      });
    },
    label: (0, _i18n.t)('ringtoneSource')
  }), /*#__PURE__*/_react["default"].createElement(_RingtoneSelection.RingtoneSelection, {
    label: (0, _i18n.t)('ringtones'),
    ringtoneDeviceId: ringtoneDeviceId,
    ringtoneList: fullRingtoneList,
    isDisabled: ringtoneSelectDisabled,
    selectedRingtoneId: selectedRingtoneId,
    volume: ringtoneVolume,
    isUploadRingtoneDisabled: isUploadRingtoneDisabled,
    enableCustomRingtone: enableCustomRingtone,
    updateCurrentRingtone: updateCurrentRingtone,
    uploadCustomRingtone: uploadCustomRingtone,
    removeCustomRingtone: removeCustomRingtone,
    showAlert: showDangerAlert
  }), /*#__PURE__*/_react["default"].createElement(_components.VolumeSlider, {
    volume: ringtoneVolume,
    dataSign: "ringtoneVolume",
    label: (0, _i18n.t)('ringtoneVolume'),
    onChange: function onChange(volume) {
      onSave({
        ringtoneVolume: volume
      });
    }
  }))));
};
exports.AudioSettingsPanel = AudioSettingsPanel;
//# sourceMappingURL=AudioSettingsPanel.js.map
