"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
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
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children", "size"],
  _excluded2 = ["children", "volume"],
  _excluded3 = ["children", "inactive", "isRecording"],
  _excluded4 = ["size", "volume", "isRecording"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var GaugeWrapper = function GaugeWrapper(_ref) {
  var children = _ref.children,
    size = _ref.size,
    rest = _objectWithoutProperties(_ref, _excluded);
  var width = size * 8;
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: (0, _clsx["default"])('inline-block align-middle h-4 overflow-hidden m-0'),
    style: {
      width: "".concat(width, "px")
    }
  }, rest), children);
};
var Gauge = function Gauge(_ref2) {
  var children = _ref2.children,
    volume = _ref2.volume,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var transformData = -50 + volume / 2;
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: (0, _clsx["default"])('inline-block whitespace-nowrap w-auto'),
    style: {
      transform: "translateX(".concat(transformData, "%)")
    }
  }, rest), children);
};
var Dot = function Dot(_ref3) {
  var children = _ref3.children,
    inactive = _ref3.inactive,
    isRecording = _ref3.isRecording,
    rest = _objectWithoutProperties(_ref3, _excluded3);
  var backgroundColor = 'bg-neutral-b4';
  if (!inactive && !isRecording) {
    backgroundColor = 'bg-success';
  }
  if (isRecording) {
    backgroundColor = 'bg-danger';
  }
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: (0, _clsx["default"])('inline-block w-1 h-3.5 mx-0.5 my-px rounded-sm', backgroundColor)
  }, rest), children);
};
var VolumeGauge = exports.VolumeGauge = function VolumeGauge(_ref4) {
  var _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 16 : _ref4$size,
    _ref4$volume = _ref4.volume,
    volume = _ref4$volume === void 0 ? 0 : _ref4$volume,
    _ref4$isRecording = _ref4.isRecording,
    isRecording = _ref4$isRecording === void 0 ? false : _ref4$isRecording,
    rest = _objectWithoutProperties(_ref4, _excluded4);
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
