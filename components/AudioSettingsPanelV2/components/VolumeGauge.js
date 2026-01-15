"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeGauge = void 0;
require("core-js/modules/es.array.fill.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["size", "volume", "isRecording"];
var _templateObject, _templateObject2, _templateObject3;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var GaugeWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  height: ", "px;\n  margin: 0;\n  overflow: hidden;\n  width: ", "px;\n"])), dotHeight + 2, computeWidthFn);
var computeVolumeFn = function computeVolumeFn(_ref2) {
  var volume = _ref2.volume;
  return -50 + volume / 2;
};
var Gauge = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  white-space: nowrap;\n  width: auto;\n  transform: translateX(", "%);\n"])), computeVolumeFn);
var computeBackgroundFn = function computeBackgroundFn(_ref3) {
  var inactive = _ref3.inactive,
    isRecording = _ref3.isRecording;
  if (!inactive && !isRecording) {
    return activeDotColor;
  }
  return isRecording ? recordingDotColor : inactiveDotColor;
};
var Dot = _juno.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: ", "px;\n  height: ", "px;\n  margin: 1px ", "px;\n  border-radius: ", "px;\n  background: ", ";\n"])), dotWidth, dotHeight, dotDistance / 2, dotWidth / 2, computeBackgroundFn);
var VolumeGauge = exports.VolumeGauge = function VolumeGauge(_ref4) {
  var _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 16 : _ref4$size,
    _ref4$volume = _ref4.volume,
    volume = _ref4$volume === void 0 ? 0 : _ref4$volume,
    _ref4$isRecording = _ref4.isRecording,
    isRecording = _ref4$isRecording === void 0 ? false : _ref4$isRecording,
    rest = _objectWithoutProperties(_ref4, _excluded);
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
//# sourceMappingURL=VolumeGauge.js.map
