"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsPanel = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _webphoneHelper = require("@ringcentral-integration/commons/modules/Webphone/webphoneHelper");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _VolumeInspector = require("@ringcentral-integration/micro-phone/src/app/services/VolumeInspector");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _utils = require("@ringcentral-integration/utils");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Section = require("../../../components/Section");
var _components3 = require("./components");
var _i18n = require("./i18n");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable react/destructuring-assignment */
var sectionClasses = {
  content: 'py-3 px-4'
};
var AudioSettingsPanel = exports.AudioSettingsPanel = function AudioSettingsPanel(_ref) {
  var availableInputDevices = _ref.availableInputDevices,
    availableOutputDevices = _ref.availableOutputDevices,
    availableRingtoneDevices = _ref.availableRingtoneDevices,
    callVolume = _ref.callVolume,
    showDangerAlert = _ref.showDangerAlert,
    _ref$showHeader = _ref.showHeader,
    showHeader = _ref$showHeader === void 0 ? true : _ref$showHeader,
    _ref$showRingtoneConf = _ref.showRingtoneConfig,
    showRingtoneConfig = _ref$showRingtoneConf === void 0 ? true : _ref$showRingtoneConf,
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
    removeCustomRingtone = _ref.removeCustomRingtone,
    onExit = _ref.onExit;
  (0, _react.useEffect)(function () {
    checkAudioAvailable();
    return function () {
      onExit();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var enableTestVolumeAndSource = !((0, _utils.isSafari)() || (0, _webphoneHelper.isFirefox)());
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showHeader && /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onBackButtonClick
  }, (0, _i18n.t)('title'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex-auto overflow-y-auto overflow-x-hidden px-4 py-2 space-y-5', className),
    "data-sign": "audioSettingsPanel"
  }, enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: (0, _i18n.t)('input'),
    "data-sign": "inputDeviceSection",
    classes: sectionClasses
  }, /*#__PURE__*/_react["default"].createElement(_components3.AudioDeviceSelect, {
    "data-sign": "microphoneDeviceSelect",
    label: (0, _i18n.t)('microphone'),
    availableDevices: availableInputDevices,
    isDisabled: inputDeviceDisabled,
    deviceId: inputDeviceId,
    onChange: function onChange(deviceId) {
      onSave({
        inputDeviceId: deviceId
      });
    }
  }), /*#__PURE__*/_react["default"].createElement(_components3.VolumeTester, _extends({}, volumeTestData, {
    disabled: inputDeviceDisabled,
    audioType: _VolumeInspector.TEST_TYPE.microphone,
    handleButtonClick: function handleButtonClick() {
      handleTestMicroClick(volumeTestData.testState);
    }
  })), showAGCEnabled && /*#__PURE__*/_react["default"].createElement(_springUi.FormLabel, {
    label: (0, _i18n.t)('autoAdjustMicLevel'),
    placement: "start",
    className: "justify-between w-full"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Switch, {
    "data-sign": "autoAdjustMicLevel",
    disabled: !hasUserMedia,
    className: "flex-none",
    checked: isAGCEnabled,
    onChange: function onChange(e) {
      onSave({
        isAGCEnabled: e.target.checked
      });
    }
  }))), /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: (0, _i18n.t)('output'),
    "data-sign": "outputDeviceSection",
    classes: sectionClasses
  }, enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_components3.AudioDeviceSelect, {
    "data-sign": "speakerDeviceSelect",
    availableDevices: availableOutputDevices,
    isDisabled: outputDeviceDisabled,
    deviceId: outputDeviceId,
    onChange: function onChange(deviceId) {
      onSave({
        outputDeviceId: deviceId
      });
    },
    label: (0, _i18n.t)('speakerSource')
  }), enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_components3.VolumeTester, _extends({}, volumeTestData, {
    audioType: _VolumeInspector.TEST_TYPE.speaker,
    disabled: outputDeviceDisabled,
    handleButtonClick: function handleButtonClick() {
      handleTestSpeakerClick(volumeTestData.testState);
    }
  })), /*#__PURE__*/_react["default"].createElement(_components3.VolumeSlider, {
    volume: callVolume,
    className: "mb-4",
    dataSign: "speakerVolume",
    label: (0, _i18n.t)('speakerVolume'),
    onChange: function onChange(volume) {
      onSave({
        callVolume: volume
      });
    }
  }), showRingtoneConfig && enableTestVolumeAndSource && /*#__PURE__*/_react["default"].createElement(_components3.AudioDeviceSelect, {
    "data-sign": "ringtoneDeviceSelect",
    isDisabled: ringtoneSelectDisabled,
    availableDevices: availableRingtoneDevices,
    deviceId: ringtoneDeviceId,
    onChange: function onChange(deviceId) {
      onSave({
        ringtoneDeviceId: deviceId
      });
    },
    label: (0, _i18n.t)('ringtoneSource')
  }), showRingtoneConfig && /*#__PURE__*/_react["default"].createElement(_components3.RingtoneSelection, {
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
  }), showRingtoneConfig && /*#__PURE__*/_react["default"].createElement(_components3.VolumeSlider, {
    volume: ringtoneVolume,
    dataSign: "ringtoneVolume",
    label: (0, _i18n.t)('ringtoneVolume'),
    onChange: function onChange(volume) {
      onSave({
        ringtoneVolume: volume
      });
    }
  }))), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
//# sourceMappingURL=AudioSettingsPanel.js.map
