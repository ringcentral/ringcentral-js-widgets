"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeSlider = void 0;
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function toPercentValue(value) {
  return Math.floor(value * 100);
}
function toValue(percent) {
  return percent / 100;
}
var VolumeSlider = exports.VolumeSlider = function VolumeSlider(_ref) {
  var volume = _ref.volume,
    className = _ref.className,
    _ref$minVolume = _ref.minVolume,
    minVolume = _ref$minVolume === void 0 ? 0 : _ref$minVolume,
    _ref$maxVolume = _ref.maxVolume,
    maxVolume = _ref$maxVolume === void 0 ? 1 : _ref$maxVolume,
    _onChange = _ref.onChange,
    label = _ref.label,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-col', className),
    "data-sign": dataSign
  }, label ? /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    "data-sign": "label",
    component: "p",
    className: "typography-mainText text-neutral-b0 mb-2"
  }, label) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center items-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.MuteMd,
    className: "text-neutral-b2",
    size: "medium"
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Slider, {
    "data-sign": "slider",
    className: "mx-4 my-0",
    min: toPercentValue(minVolume),
    max: toPercentValue(maxVolume),
    value: toPercentValue(volume),
    valueLabelDisplay: "auto",
    step: 10,
    onChange: function onChange(_, value) {
      return _onChange(toValue(value));
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center items-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.VolumeMd,
    className: "text-neutral-b2",
    size: "medium"
  }))));
};
//# sourceMappingURL=VolumeSlider.js.map
