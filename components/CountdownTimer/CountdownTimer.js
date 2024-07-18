"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountdownTimer = void 0;
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var CountdownTimer = function CountdownTimer(_ref) {
  var creationTime = _ref.creationTime,
    duration = _ref.duration,
    variant = _ref.variant,
    currentLocale = _ref.currentLocale,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? /*#__PURE__*/_react["default"].createElement("span", null) : _ref$children;
  var endTime = creationTime + duration * 60 * 1000; // ms
  var remain = Math.floor((endTime - Date.now()) / 1000); // s
  var _useState = (0, _react.useState)(remain),
    _useState2 = _slicedToArray(_useState, 2),
    timeRemaining = _useState2[0],
    setTimeRemaining = _useState2[1];
  (0, _react.useEffect)(function () {
    var intervalId = setInterval(function () {
      var remainingTime = Math.floor((endTime - Date.now()) / 1000); // s
      if (remainingTime <= -1) {
        clearInterval(intervalId);
        // do something when time is up
      }
      setTimeRemaining(remainingTime);
    }, 1000);
    return function () {
      return clearInterval(intervalId);
    };
  }, [creationTime, duration]);
  var minutes = Math.ceil(timeRemaining / 60);
  var seconds = Math.ceil(timeRemaining % 60);
  var countdownInfo;
  if (timeRemaining > 60) {
    countdownInfo = "".concat((0, _utils.format)(_i18n["default"].getString('infoMessageMins', currentLocale), {
      delayTime: minutes
    }));
  } else if (timeRemaining === 60) {
    /* 1 minute */
    countdownInfo = "".concat((0, _utils.format)(_i18n["default"].getString('infoMessageMin', currentLocale), {
      delayTime: minutes
    }));
  } else if (seconds !== 1) {
    countdownInfo = "".concat((0, _utils.format)(_i18n["default"].getString('infoMessageSecs', currentLocale), {
      delayTime: seconds
    }));
  } else {
    /* 1 second */
    countdownInfo = "".concat((0, _utils.format)(_i18n["default"].getString('infoMessageSec', currentLocale), {
      delayTime: seconds
    }));
  }
  if (timeRemaining < 0 && variant === 'tooltip') {
    return children;
  } else if (timeRemaining < 0) {
    return null;
  }
  switch (variant) {
    case 'info':
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "delaySavingTimer",
        className: _styles["default"].wrapper
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
        icon: true,
        className: _styles["default"].alert
      }, countdownInfo));
    case 'tooltip':
      return /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
        title: countdownInfo,
        ignorePointer: true
      }, children);
    case 'plain':
    default:
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "delaySavingTimer",
        className: _styles["default"].plaintext,
        title: countdownInfo
      }, countdownInfo);
  }
};
exports.CountdownTimer = CountdownTimer;
//# sourceMappingURL=CountdownTimer.js.map
