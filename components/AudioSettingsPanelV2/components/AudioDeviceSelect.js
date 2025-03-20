"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.every");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFallbackLabel = exports.getDeviceOptionRenderer = exports.SelectDevice = exports.AudioDeviceSelect = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("../i18n");
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var SelectDevice = function SelectDevice(_ref) {
  var children = _ref.children,
    label = _ref.label,
    props = _objectWithoutProperties(_ref, ["children", "label"]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, _extends({
    className: _styles["default"].select,
    variant: "box",
    fullWidth: true,
    label: /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "body2",
      color: "neutral.f06"
    }, label)
  }, props), children);
};
exports.SelectDevice = SelectDevice;
var getFallbackLabel = function getFallbackLabel(device) {
  var fallbackLabel = (0, _i18n.t)('noLabel');
  var deviceId = device.deviceId ? "(".concat(device.deviceId.slice(-4), ")") : '';
  return "".concat(fallbackLabel).concat(deviceId);
};
exports.getFallbackLabel = getFallbackLabel;
var getDeviceOptionRenderer = function getDeviceOptionRenderer(device) {
  if (device && device.label) {
    return device.label;
  }
  if (device && device.deviceId === 'off') {
    return (0, _i18n.t)('off');
  }
  return getFallbackLabel(device);
};
exports.getDeviceOptionRenderer = getDeviceOptionRenderer;
var AudioDeviceSelect = function AudioDeviceSelect(_ref2) {
  var _ref2$availableDevice = _ref2.availableDevices,
    availableDevices = _ref2$availableDevice === void 0 ? [] : _ref2$availableDevice,
    _onChange = _ref2.onChange,
    isDisabled = _ref2.isDisabled,
    deviceId = _ref2.deviceId,
    label = _ref2.label,
    dataSign = _ref2.dataSign;
  var allDevicesAreEmpty = availableDevices.every(function (item) {
    return item.label === '' && item.deviceId === '' || item.label === '' && item.deviceId === 'off';
  });
  if (!availableDevices.length || allDevicesAreEmpty) {
    return /*#__PURE__*/_react["default"].createElement(SelectDevice, {
      label: label,
      value: "default",
      disabled: true,
      "data-sign": dataSign
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      value: "default"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: (0, _i18n.t)('noDevices')
    })));
  }
  return /*#__PURE__*/_react["default"].createElement(SelectDevice, {
    "data-sign": dataSign,
    value: deviceId,
    onChange: function onChange(e) {
      var deviceId = e.target.value;
      _onChange(deviceId);
    },
    disabled: isDisabled,
    label: label
  }, availableDevices.map(function (device) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: device.deviceId,
      value: device.deviceId
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
      title: getDeviceOptionRenderer(device)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: getDeviceOptionRenderer(device)
    })));
  }));
};
exports.AudioDeviceSelect = AudioDeviceSelect;
//# sourceMappingURL=AudioDeviceSelect.js.map
