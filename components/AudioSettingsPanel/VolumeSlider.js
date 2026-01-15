"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeSlider = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _templateObject, _templateObject2, _templateObject3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var Container = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n"])));
var VolumeIconContainer = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])));
var PaddedSlider = (0, _juno.styled)(_juno.RcSlider)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  margin: 0 16px;\n"])));
function toPercentValue(value) {
  return Math.floor(value * 100);
}
function toValue(percent) {
  return percent / 100;
}
var VolumeSlider = exports.VolumeSlider = function VolumeSlider(_ref) {
  var className = _ref.className,
    volume = _ref.volume,
    _ref$minVolume = _ref.minVolume,
    minVolume = _ref$minVolume === void 0 ? 0 : _ref$minVolume,
    _ref$maxVolume = _ref.maxVolume,
    maxVolume = _ref$maxVolume === void 0 ? 1 : _ref$maxVolume,
    _onChange = _ref.onChange;
  return /*#__PURE__*/_react["default"].createElement(Container, {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(VolumeIconContainer, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    symbol: _junoIcon.AudioSp
  })), /*#__PURE__*/_react["default"].createElement(PaddedSlider, {
    min: toPercentValue(minVolume),
    max: toPercentValue(maxVolume),
    value: toPercentValue(volume),
    step: 10
    // cast value to number as we are not using ranged slider
    ,
    onChange: function onChange(_, value) {
      return _onChange(toValue(value));
    }
  }), /*#__PURE__*/_react["default"].createElement(VolumeIconContainer, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    symbol: _junoIcon.Audio
  })));
};
//# sourceMappingURL=VolumeSlider.js.map
