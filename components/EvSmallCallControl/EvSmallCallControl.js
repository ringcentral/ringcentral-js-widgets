"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSmallCallControl = void 0;
var _react = _interopRequireDefault(require("react"));
var _SmallCallControl = require("../SmallCallControl");
var _components = require("./components");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
