"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFallbackLabel = exports.getDeviceValueRenderer = exports.getDeviceOptionRenderer = exports.AudioSettingsPanel = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
var _react = _interopRequireWildcard(require("react"));
var _Info = _interopRequireDefault(require("../../assets/images/Info.svg"));
var _PageHeader = require("../BackHeader/PageHeader");
var _Button = require("../Button");
var _DropdownSelect = require("../DropdownSelect");
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _InputField = _interopRequireDefault(require("../InputField"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _SaveButton = require("../SaveButton");
var _VolumeSlider = require("./VolumeSlider");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // @ts-expect-error TS(7016): Could not find a declaration file for module 'rc-tooltip'
// TODO: find a better tooltip solution?
var Tooltip = typeof _rcTooltip["default"] === 'function' ? _rcTooltip["default"] : _rcTooltip["default"]["default"];
var CheckMicPermission = function CheckMicPermission(_ref) {
  var checkUserMedia = _ref.checkUserMedia,
    userMedia = _ref.userMedia,
    currentLocale = _ref.currentLocale;
  if (userMedia) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    noBorder: true,
    icon: /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      dataSign: "checkMicPermission",
      onClick: checkUserMedia
    }, _i18n["default"].getString('checkMicPermission', currentLocale))
  }, _i18n["default"].getString('micNoPermissionMessage', currentLocale));
};
var getFallbackLabel = function getFallbackLabel(devices, index, currentLocale) {
  var fallbackLabel = _i18n["default"].getString('noLabel', currentLocale);
  if (devices.length > 1) {
    fallbackLabel = "".concat(fallbackLabel, " ").concat(index + 1);
  }
  return fallbackLabel;
};
exports.getFallbackLabel = getFallbackLabel;
var getDeviceValueRenderer = function getDeviceValueRenderer(devices, currentLocale) {
  return function (value) {
    if (value === null) {
      return _i18n["default"].getString('noDevice', currentLocale);
    }
    var index = devices.findIndex(function (device) {
      return device.deviceId === value;
    });
    if (index > -1 && devices[index].label) {
      return devices[index].label;
    }
    return getFallbackLabel(devices, index, currentLocale);
  };
};
exports.getDeviceValueRenderer = getDeviceValueRenderer;
var getDeviceOptionRenderer = function getDeviceOptionRenderer(devices, currentLocale) {
  return function (device, index) {
    if (device && device.label) {
      return device.label;
    }
    return getFallbackLabel(devices, index, currentLocale);
  };
};
exports.getDeviceOptionRenderer = getDeviceOptionRenderer;
var useDeviceRenderers = function useDeviceRenderers(devices, currentLocale) {
  return (0, _react.useMemo)(function () {
    return [getDeviceValueRenderer(devices, currentLocale), getDeviceOptionRenderer(devices, currentLocale)];
  }, [devices, currentLocale]);
};
var deviceValueFunction = function deviceValueFunction(device) {
  return device.deviceId;
};
var OutputDevice = function OutputDevice(_ref2) {
  var availableOutputDevices = _ref2.availableOutputDevices,
    currentLocale = _ref2.currentLocale,
    isFirefox = _ref2.isFirefox,
    onChange = _ref2.onChange,
    outputDeviceDisabled = _ref2.outputDeviceDisabled,
    outputDeviceId = _ref2.outputDeviceId;
  var _useDeviceRenderers = useDeviceRenderers(availableOutputDevices, currentLocale),
    _useDeviceRenderers2 = _slicedToArray(_useDeviceRenderers, 2),
    deviceValueRenderer = _useDeviceRenderers2[0],
    deviceOptionRenderer = _useDeviceRenderers2[1];
  if (isFirefox && !availableOutputDevices.length) {
    return /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
      className: _styles["default"].noHeightInputField,
      label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('outputDevice', currentLocale)),
      noBorder: true
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].fakeDropdownContainer
    }, _i18n["default"].getString('defaultOutputDevice', currentLocale)));
  }
  return /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
    label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('outputDevice', currentLocale)),
    noBorder: true
  }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect.DropdownSelect, {
    className: _styles["default"].select,
    disabled: outputDeviceDisabled,
    value: availableOutputDevices.length ? outputDeviceId : undefined,
    onChange: onChange,
    options: availableOutputDevices,
    dropdownAlign: "left",
    renderFunction: deviceOptionRenderer,
    valueFunction: deviceValueFunction,
    renderValue: deviceValueRenderer,
    titleEnabled: true
  }));
};
var InputDevice = function InputDevice(_ref3) {
  var availableInputDevices = _ref3.availableInputDevices,
    currentLocale = _ref3.currentLocale,
    inputDeviceDisabled = _ref3.inputDeviceDisabled,
    inputDeviceId = _ref3.inputDeviceId,
    isFirefox = _ref3.isFirefox,
    onChange = _ref3.onChange;
  var _useDeviceRenderers3 = useDeviceRenderers(availableInputDevices, currentLocale),
    _useDeviceRenderers4 = _slicedToArray(_useDeviceRenderers3, 2),
    deviceValueRenderer = _useDeviceRenderers4[0],
    deviceOptionRenderer = _useDeviceRenderers4[1];
  var showTooltip = availableInputDevices.length > 0 ? availableInputDevices[0].label === '' : isFirefox;
  var tooltipContainer = (0, _react.useRef)(null);
  var inputTooltip = showTooltip ? /*#__PURE__*/_react["default"].createElement(Tooltip, {
    placement: "bottom",
    trigger: "click",
    align: {
      offset: [0, 47]
    },
    overlay: _i18n["default"].getString('noLabelTip', currentLocale),
    arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
      className: "rc-tooltip-arrow-inner"
    }),
    getTooltipContainer: function getTooltipContainer() {
      return tooltipContainer.current;
    }
  }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
    width: 14,
    height: 14,
    className: _styles["default"].infoIcon
  })) : null;
  return /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
    label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('inputDevice', currentLocale), inputTooltip),
    noBorder: true
  }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect.DropdownSelect, {
    className: _styles["default"].select,
    disabled: inputDeviceDisabled,
    value: availableInputDevices.length ? inputDeviceId : undefined,
    onChange: onChange,
    options: availableInputDevices,
    dropdownAlign: "left",
    renderFunction: deviceOptionRenderer,
    valueFunction: deviceValueFunction,
    renderValue: deviceValueRenderer,
    titleEnabled: true
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].tooltipContainer,
    ref: function ref(el) {
      tooltipContainer.current = el;
    }
  }));
};
function useDeviceIdState(deviceId, devices) {
  var _useState = (0, _react.useState)(deviceId),
    _useState2 = _slicedToArray(_useState, 2),
    deviceIdState = _useState2[0],
    setDeviceIdState = _useState2[1];
  var setDeviceState = (0, _react.useCallback)(function (device) {
    setDeviceIdState(device.deviceId);
  }, [setDeviceIdState]);
  var oldDeviceId = (0, _juno.usePrevious)(function () {
    return deviceId;
  }, true);
  var oldDevices = (0, _juno.usePrevious)(function () {
    return devices;
  }, true);
  (0, _react.useEffect)(function () {
    if (deviceId !== oldDeviceId) {
      setDeviceIdState(deviceId);
    }
    if (devices !== oldDevices) {
      if (!devices.find(function (device) {
        return device.deviceId === deviceIdState;
      })) {
        setDeviceIdState(deviceId);
      }
    }
  }, [oldDeviceId, oldDevices, devices, deviceIdState, deviceId]);
  return [deviceIdState, setDeviceState];
}
var VolumeInput = function VolumeInput(_ref4) {
  var volume = _ref4.volume,
    minVolume = _ref4.minVolume,
    maxVolume = _ref4.maxVolume,
    onChange = _ref4.onChange,
    label = _ref4.label;
  return /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
    label: /*#__PURE__*/_react["default"].createElement("span", null, label),
    noBorder: true
  }, /*#__PURE__*/_react["default"].createElement(_VolumeSlider.VolumeSlider, {
    volume: volume,
    onChange: onChange,
    maxVolume: maxVolume,
    minVolume: minVolume
  }));
};
var AudioSettingsPanel = function AudioSettingsPanel(_ref5) {
  var availableInputDevices = _ref5.availableInputDevices,
    availableOutputDevices = _ref5.availableOutputDevices,
    callVolume = _ref5.callVolume,
    checkUserMedia = _ref5.checkUserMedia,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? null : _ref5$className,
    currentLocale = _ref5.currentLocale,
    _ref5$inputDeviceDisa = _ref5.inputDeviceDisabled,
    inputDeviceDisabled = _ref5$inputDeviceDisa === void 0 ? false : _ref5$inputDeviceDisa,
    inputDeviceId = _ref5.inputDeviceId,
    onBackButtonClick = _ref5.onBackButtonClick,
    onSave = _ref5.onSave,
    _ref5$outputDeviceDis = _ref5.outputDeviceDisabled,
    outputDeviceDisabled = _ref5$outputDeviceDis === void 0 ? false : _ref5$outputDeviceDis,
    outputDeviceId = _ref5.outputDeviceId,
    ringtoneVolume = _ref5.ringtoneVolume,
    _ref5$showCallVolume = _ref5.showCallVolume,
    showCallVolume = _ref5$showCallVolume === void 0 ? false : _ref5$showCallVolume,
    _ref5$showRingToneVol = _ref5.showRingToneVolume,
    showRingToneVolume = _ref5$showRingToneVol === void 0 ? false : _ref5$showRingToneVol,
    supportDevices = _ref5.supportDevices,
    userMedia = _ref5.userMedia;
  // For firefox, when input device have empty label
  // trigger get-user-media to load the device info at the first time
  var triggerCheckUserMedia = (0, _react.useRef)(false);
  if (!triggerCheckUserMedia.current) {
    var _availableInputDevice;
    triggerCheckUserMedia.current = true;
    if (userMedia && ((_availableInputDevice = availableInputDevices[0]) === null || _availableInputDevice === void 0 ? void 0 : _availableInputDevice.label) === '') {
      checkUserMedia();
    }
  }
  var _useDeviceIdState = useDeviceIdState(outputDeviceId, availableOutputDevices),
    _useDeviceIdState2 = _slicedToArray(_useDeviceIdState, 2),
    outputDeviceIdState = _useDeviceIdState2[0],
    setOutputDeviceState = _useDeviceIdState2[1];
  var _useDeviceIdState3 = useDeviceIdState(inputDeviceId, availableInputDevices),
    _useDeviceIdState4 = _slicedToArray(_useDeviceIdState3, 2),
    inputDeviceIdState = _useDeviceIdState4[0],
    setInputDeviceState = _useDeviceIdState4[1];
  var _useState3 = (0, _react.useState)(navigator.userAgent.indexOf('Firefox') > -1),
    _useState4 = _slicedToArray(_useState3, 1),
    isFirefox = _useState4[0];
  var _useState5 = (0, _react.useState)(ringtoneVolume),
    _useState6 = _slicedToArray(_useState5, 2),
    ringtoneVolumeState = _useState6[0],
    setRingtoneVolumeState = _useState6[1];
  var _useState7 = (0, _react.useState)(callVolume),
    _useState8 = _slicedToArray(_useState7, 2),
    callVolumeState = _useState8[0],
    setCallVolumeState = _useState8[1];
  var oldRingtoneVolume = (0, _juno.usePrevious)(function () {
    return ringtoneVolume;
  }, true);
  var oldCallVolume = (0, _juno.usePrevious)(function () {
    return callVolume;
  }, true);
  (0, _react.useEffect)(function () {
    if (ringtoneVolume !== oldRingtoneVolume) {
      setRingtoneVolumeState(ringtoneVolume);
    }
    if (callVolume !== oldCallVolume) {
      setCallVolumeState(callVolume);
    }
  }, [ringtoneVolume, callVolume, oldRingtoneVolume, oldCallVolume]);
  var hasChanges = outputDeviceId !== outputDeviceIdState || inputDeviceId !== inputDeviceIdState || ringtoneVolume !== ringtoneVolumeState || callVolume !== callVolumeState;
  var onSaveClick = (0, _react.useCallback)(function () {
    return onSave({
      outputDeviceId: outputDeviceIdState,
      inputDeviceId: inputDeviceIdState,
      ringtoneVolume: ringtoneVolumeState,
      callVolume: callVolumeState
    });
  }, [onSave, outputDeviceIdState, inputDeviceIdState, ringtoneVolumeState, callVolumeState]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onBackButtonClick
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, _i18n["default"].getString('title', currentLocale)), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, supportDevices ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(OutputDevice, {
    availableOutputDevices: availableOutputDevices,
    currentLocale: currentLocale,
    isFirefox: isFirefox,
    outputDeviceDisabled: outputDeviceDisabled,
    outputDeviceId: outputDeviceIdState,
    onChange: setOutputDeviceState
  }), /*#__PURE__*/_react["default"].createElement(InputDevice, {
    availableInputDevices: availableInputDevices,
    currentLocale: currentLocale,
    isFirefox: isFirefox,
    inputDeviceDisabled: inputDeviceDisabled,
    inputDeviceId: inputDeviceIdState,
    onChange: setInputDeviceState
  })) : null, /*#__PURE__*/_react["default"].createElement(CheckMicPermission, {
    checkUserMedia: checkUserMedia,
    currentLocale: currentLocale,
    userMedia: userMedia
  }), showCallVolume ? /*#__PURE__*/_react["default"].createElement(VolumeInput, {
    volume: callVolumeState,
    label: _i18n["default"].getString('callVolume', currentLocale),
    onChange: setCallVolumeState,
    minVolume: 0.1
  }) : null, showRingToneVolume ? /*#__PURE__*/_react["default"].createElement(VolumeInput, {
    volume: ringtoneVolumeState,
    label: _i18n["default"].getString('ringtoneVolume', currentLocale),
    onChange: setRingtoneVolumeState
  }) : null, /*#__PURE__*/_react["default"].createElement(_SaveButton.SaveButton, {
    onClick: onSaveClick,
    disabled: !hasChanges,
    currentLocale: currentLocale
  })));
};
exports.AudioSettingsPanel = AudioSettingsPanel;
//# sourceMappingURL=AudioSettingsPanel.js.map
