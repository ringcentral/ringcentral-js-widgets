"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.fill");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeGauge = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: ", "px;\n  height: ", "px;\n  margin: 1px ", "px;\n  border-radius: ", "px;\n  background: ", ";\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  white-space: nowrap;\n  width: auto;\n  transform: translateX(", "%);\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  height: ", "px;\n  margin: 0;\n  overflow: hidden;\n  width: ", "px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var inactiveDotColor = (0, _juno.palette2)('neutral', 'l02');
var activeDotColor = (0, _juno.palette2)('success', 'b05');
var recordingDotColor = (0, _juno.palette2)('danger', 'b04');
var dotDistance = 4;
var dotWidth = 4;
var dotHeight = 14;
var dotCompleteWidth = dotWidth + dotDistance;
var computeWidthFn = function computeWidthFn(_ref) {
  var size = _ref.size;
  return size * dotCompleteWidth;
};
var GaugeWrapper = _juno.styled.div(_templateObject(), dotHeight + 2, computeWidthFn);
var computeVolumeFn = function computeVolumeFn(_ref2) {
  var volume = _ref2.volume;
  return -50 + volume / 2;
};
var Gauge = _juno.styled.div(_templateObject2(), computeVolumeFn);
var computeBackgroundFn = function computeBackgroundFn(_ref3) {
  var inactive = _ref3.inactive,
    isRecording = _ref3.isRecording;
  if (!inactive && !isRecording) {
    return activeDotColor;
  }
  return isRecording ? recordingDotColor : inactiveDotColor;
};
var Dot = _juno.styled.div(_templateObject3(), dotWidth, dotHeight, dotDistance / 2, dotWidth / 2, computeBackgroundFn);
var VolumeGauge = function VolumeGauge(_ref4) {
  var _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 16 : _ref4$size,
    _ref4$volume = _ref4.volume,
    volume = _ref4$volume === void 0 ? 0 : _ref4$volume,
    _ref4$isRecording = _ref4.isRecording,
    isRecording = _ref4$isRecording === void 0 ? false : _ref4$isRecording,
    rest = _objectWithoutProperties(_ref4, ["size", "volume", "isRecording"]);
  var dots = (0, _react.useMemo)(function () {
    return Array(size).fill(0);
  }, [size]);
  return /*#__PURE__*/_react["default"].createElement(GaugeWrapper, _extends({
    size: size
  }, rest), /*#__PURE__*/_react["default"].createElement(Gauge, {
    volume: volume
  }, dots.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(Dot, {
      key: i,
      isRecording: isRecording
    });
  }), dots.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(Dot, {
      key: i,
      inactive: true
    });
  })));
};
exports.VolumeGauge = VolumeGauge;
//# sourceMappingURL=VolumeGauge.js.map
