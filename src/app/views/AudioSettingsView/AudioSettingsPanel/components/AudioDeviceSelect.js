"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFallbackLabel = exports.getDeviceOptionRenderer = exports.SelectDevice = exports.AudioDeviceSelect = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("../i18n");
var _excluded = ["children", "label"],
  _excluded2 = ["availableDevices", "onChange", "isDisabled", "deviceId", "label"];
/* eslint-disable react/destructuring-assignment */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SelectDevice = exports.SelectDevice = function SelectDevice(_ref) {
  var children = _ref.children,
    label = _ref.label,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    component: "p",
    className: "typography-mainText text-neutral-b0 mb-2"
  }, label), /*#__PURE__*/_react["default"].createElement(_springUi.Select, _extends({
    size: "medium",
    classes: {
      content: 'border-none'
    },
    className: "w-full [&_.sui-form-field-focus-effect]:border-none"
  }, props), children));
};
var getFallbackLabel = exports.getFallbackLabel = function getFallbackLabel(device) {
  var fallbackLabel = (0, _i18n.t)('noLabel');
  var deviceId = device.deviceId ? "(".concat(device.deviceId.slice(-4), ")") : '';
  return "".concat(fallbackLabel).concat(deviceId);
};
var getDeviceOptionRenderer = exports.getDeviceOptionRenderer = function getDeviceOptionRenderer(device) {
  var label;
  if (device && device.label) {
    label = device.label;
  } else if (device && device.deviceId === 'off') {
    label = (0, _i18n.t)('off');
  } else {
    label = getFallbackLabel(device);
  }
  return label;
};
var AudioDeviceSelect = exports.AudioDeviceSelect = function AudioDeviceSelect(_ref2) {
  var _ref2$availableDevice = _ref2.availableDevices,
    availableDevices = _ref2$availableDevice === void 0 ? [] : _ref2$availableDevice,
    _onChange = _ref2.onChange,
    isDisabled = _ref2.isDisabled,
    deviceId = _ref2.deviceId,
    label = _ref2.label,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var allDevicesAreEmpty = availableDevices.every(function (item) {
    return item.label === '' && item.deviceId === '' || item.label === '' && item.deviceId === 'off';
  });
  if (!availableDevices.length || allDevicesAreEmpty) {
    return /*#__PURE__*/_react["default"].createElement(SelectDevice, _extends({
      label: label,
      value: "default",
      disabled: true,
      renderValue: function renderValue() {
        return (0, _i18n.t)('noDevices');
      }
    }, rest), /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      value: "default",
      key: "default"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      primary: (0, _i18n.t)('noDevices')
    })));
  }
  return /*#__PURE__*/_react["default"].createElement(SelectDevice, _extends({}, rest, {
    value: deviceId,
    onChange: function onChange(e) {
      var deviceId = e.target.value;
      _onChange(deviceId);
    },
    renderValue: function renderValue(id) {
      var selected = availableDevices.find(function (option) {
        return option.deviceId === id;
      });
      if (!selected) return '';
      var render = getDeviceOptionRenderer(selected);
      return /*#__PURE__*/_react["default"].createElement("span", {
        title: render,
        className: "text-neutral-b2 typography-descriptor"
      }, render);
    },
    disabled: isDisabled,
    label: label
  }), availableDevices.map(function (device) {
    var render = getDeviceOptionRenderer(device);
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      key: device.deviceId,
      value: device.deviceId
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      title: render,
      primary: render
    }));
  }));
};
//# sourceMappingURL=AudioDeviceSelect.js.map
