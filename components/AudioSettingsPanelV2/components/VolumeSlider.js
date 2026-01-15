"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeSlider = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function toPercentValue(value) {
  return Math.floor(value * 100);
}
function toValue(percent) {
  return percent / 100;
}
var VolumeSlider = exports.VolumeSlider = function VolumeSlider(_ref) {
  var volume = _ref.volume,
    _ref$minVolume = _ref.minVolume,
    minVolume = _ref$minVolume === void 0 ? 0 : _ref$minVolume,
    _ref$maxVolume = _ref.maxVolume,
    maxVolume = _ref$maxVolume === void 0 ? 1 : _ref$maxVolume,
    _onChange = _ref.onChange,
    label = _ref.label,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sliderContainer,
    "data-sign": dataSign
  }, label ? /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    "data-sign": "label",
    variant: "body2",
    color: "neutral.f06",
    className: _styles["default"].sliderLabel
  }, label) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sliderVolume
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sliderVolumeIconContainer
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    symbol: _junoIcon.SpeakerDown,
    color: "neutral.f04",
    size: "small"
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcSlider, {
    "data-sign": "slider",
    style: {
      margin: '0 16px'
    },
    min: toPercentValue(minVolume),
    max: toPercentValue(maxVolume),
    value: toPercentValue(volume),
    step: 10
    // cast value to number as we are not using ranged slider
    ,
    onChange: function onChange(_, value) {
      return _onChange(toValue(value));
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sliderVolumeIconContainer
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    symbol: _junoIcon.SpeakerUp,
    color: "neutral.f04",
    size: "small"
  }))));
};
//# sourceMappingURL=VolumeSlider.js.map
