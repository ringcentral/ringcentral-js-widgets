"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoomAction = void 0;
var _utils = require("@ringcentral-integration/utils");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _Text = require("@ringcentral/juno/es6/components/Text/Text.js");
var _useInterval3 = require("@ringcentral/juno/es6/foundation/hooks/useInterval/useInterval.js");
var _useLongPress3 = require("@ringcentral/juno/es6/foundation/hooks/useLongPress/useLongPress.js");
var _ResetZoom = _interopRequireDefault(require("@ringcentral/juno-icon/es6/ResetZoom.js"));
var _ZoomIn = _interopRequireDefault(require("@ringcentral/juno-icon/es6/ZoomIn.js"));
var _ZoomOut = _interopRequireDefault(require("@ringcentral/juno-icon/es6/ZoomOut.js"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["onZoom", "min", "max"],
  _excluded2 = ["ref"],
  _excluded3 = ["ref"];
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ZoomAction = exports.ZoomAction = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var onZoom = _ref.onZoom,
    min = _ref.min,
    max = _ref.max,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, _react.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    rate = _useState2[0],
    setRate = _useState2[1];
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      setRate: setRate
    };
  });
  var _useInterval = (0, _useInterval3.useInterval)(function (times) {
      // use power to make zoom out faster
      onZoom(rate - 0.1 * Math.pow(times, 2));
    }, 300, false),
    zoomOutStart = _useInterval.play,
    zoomOutCancel = _useInterval.cancel;
  var _useInterval2 = (0, _useInterval3.useInterval)(function (times) {
      // use power to make zoom in faster
      onZoom(rate + 0.1 * Math.pow(times, 2));
    }, 300, false),
    zoomInStart = _useInterval2.play,
    zoomInCancel = _useInterval2.cancel;
  var cancelEvents = (0, _react.useMemo)(function () {
    var cancelZoom = function cancelZoom() {
      zoomOutCancel();
      zoomInCancel();
    };
    return {
      onMouseUp: cancelZoom,
      onTouchEnd: cancelZoom,
      onKeyUp: cancelZoom
    };
  }, [zoomInCancel, zoomOutCancel]);
  var _useLongPress = (0, _useLongPress3.useLongPress)({
      onPress: zoomOutStart,
      onTap: function onTap() {
        onZoom(rate - 0.1);
      }
    }, cancelEvents),
    zoomOutRef = _useLongPress.ref,
    zoomOutEvents = _objectWithoutProperties(_useLongPress, _excluded2);
  var _useLongPress2 = (0, _useLongPress3.useLongPress)({
      onPress: zoomInStart,
      onTap: function onTap() {
        onZoom(rate + 0.1);
      }
    }, cancelEvents),
    zoomInRef = _useLongPress2.ref,
    zoomInEvents = _objectWithoutProperties(_useLongPress2, _excluded3);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, props, {
    onClick: _utils.stopPropagation,
    className: "flex gap-2 h-10 items-center absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-b5 rounded-full px-4 shadow-lg"
  }), /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, _extends({
    ref: zoomOutRef,
    variant: "plain",
    "aria-label": "Zoom out",
    symbol: _ZoomOut["default"],
    disabled: rate === min
  }, zoomOutEvents)), /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
    color: "neutral.f06"
  }, Math.round(rate * 100), "%"), /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, _extends({
    variant: "plain",
    "aria-label": "Zoom in",
    symbol: _ZoomIn["default"],
    disabled: rate === max,
    ref: zoomInRef
  }, zoomInEvents)), /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    variant: "plain",
    "aria-label": "Reset zoom",
    symbol: _ResetZoom["default"],
    disabled: rate === 1,
    onClick: function onClick() {
      onZoom(1);
    }
  }));
});
//# sourceMappingURL=ZoomAction.js.map
