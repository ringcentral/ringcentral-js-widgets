"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSmallCallControl = void 0;
var _react = _interopRequireDefault(require("react"));
var _SmallCallControl = require("../SmallCallControl");
var _components = require("./components");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var EvSmallCallControl = function EvSmallCallControl(_ref) {
  var isOnActive = _ref.isOnActive,
    showMuteButton = _ref.showMuteButton,
    showRecordCall = _ref.showRecordCall,
    recordPauseCount = _ref.recordPauseCount,
    disableRecordControl = _ref.disableRecordControl,
    isRecording = _ref.isRecording,
    rest = _objectWithoutProperties(_ref, ["isOnActive", "showMuteButton", "showRecordCall", "recordPauseCount", "disableRecordControl", "isRecording"]);
  var configData;
  var RecordBtn;
  if (!disableRecordControl) {
    if (recordPauseCount !== null && !isRecording) {
      configData = _objectSpread({
        recordPauseCount: recordPauseCount
      }, rest);
      RecordBtn = _components.CountDownButton;
    } else {
      configData = _objectSpread({
        isRecording: isRecording
      }, rest);
      RecordBtn = _components.RecordControlButton;
    }
  } else {
    configData = _objectSpread({
      disabled: true
    }, rest);
    RecordBtn = _components.RecordingButton;
  }
  return /*#__PURE__*/_react["default"].createElement(_SmallCallControl.SmallCallControl, rest, /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HoldCallButton, rest), showMuteButton && /*#__PURE__*/_react["default"].createElement(_SmallCallControl.MuteCallButton, rest), /*#__PURE__*/_react["default"].createElement(_SmallCallControl.TransferCallButton, rest), showRecordCall && /*#__PURE__*/_react["default"].createElement(RecordBtn, _extends({}, configData, {
    "data-sign": "recordButton"
  })), isOnActive ? /*#__PURE__*/_react["default"].createElement(_components.ActiveCallButton, rest) : /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HangUpButton, rest));
};
exports.EvSmallCallControl = EvSmallCallControl;
EvSmallCallControl.defaultProps = {
  isOnActive: false,
  showMuteButton: false,
  showRecordCall: false
};
//# sourceMappingURL=EvSmallCallControl.js.map
