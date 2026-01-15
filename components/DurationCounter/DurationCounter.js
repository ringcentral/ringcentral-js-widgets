"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationCounter = void 0;
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * DurationCounter component displays a formatted duration that updates every second.
 */
var DurationCounter = function DurationCounter(props) {
  var startTime = props.startTime;
  var prev = (0, _springUi.usePrevious)(function () {
    return startTime;
  });
  var forceUpdate = (0, _springUi.useForceUpdate)();

  // when startTime changes, force update to full re-render the component
  (0, _react.useEffect)(function () {
    if (prev && prev !== startTime) {
      forceUpdate();
    }
  }, [forceUpdate, prev, startTime]);
  if (prev && prev !== startTime) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(InnerDurationCounter, props);
};

/**
 * DurationCounter component displays a formatted duration that updates every second.
 */
exports.DurationCounter = DurationCounter;
var InnerDurationCounter = function InnerDurationCounter(_ref) {
  var className = _ref.className,
    startTime = _ref.startTime,
    _ref$offset = _ref.offset,
    offset = _ref$offset === void 0 ? 0 : _ref$offset;
  var getFormattedDuration = (0, _react.useCallback)(function () {
    if (startTime === undefined) return (0, _formatDuration.formatDuration)(startTime);
    var adjustedStartTime = startTime + offset;
    var duration = Math.round((Date.now() - adjustedStartTime) / 1000);
    return (0, _formatDuration.formatDuration)(duration);
  }, [offset, startTime]);

  // use result ref to avoid re-creating the function on every render
  var defaultValueRef = (0, _springUi.useResultRef)(getFormattedDuration);
  var _useState = (0, _react.useState)(defaultValueRef.current),
    _useState2 = _slicedToArray(_useState, 2),
    duration = _useState2[0],
    setDuration = _useState2[1];
  (0, _springUi.useInterval)(function () {
    return setDuration(getFormattedDuration());
  }, 1000);
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _clsx["default"])(className, 'typography-descriptorMini'),
    "data-sign": "duration"
  }, duration);
};
//# sourceMappingURL=DurationCounter.js.map
