"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _junoIcon = require("@ringcentral/juno-icon");
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _callIconMap, _newCallIconMap;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _callIconMap);
var newCallIconMap = (_newCallIconMap = {}, _defineProperty(_newCallIconMap, _callDirections["default"].inbound, _junoIcon.IncallBorder), _defineProperty(_newCallIconMap, _callDirections["default"].outbound, _junoIcon.OutcallBorder), _newCallIconMap);
var CallIcon = function CallIcon(_ref) {
  var direction = _ref.direction,
    ringing = _ref.ringing,
    inboundTitle = _ref.inboundTitle,
    outboundTitle = _ref.outboundTitle,
    isOnConferenceCall = _ref.isOnConferenceCall,
    showAvatar = _ref.showAvatar,
    avatarUrl = _ref.avatarUrl,
    _ref$extraNum = _ref.extraNum,
    extraNum = _ref$extraNum === void 0 ? 0 : _ref$extraNum,
    newCallIcon = _ref.newCallIcon;
  var title = direction === _callDirections["default"].inbound ? inboundTitle : outboundTitle;
  var symbol;
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var CallDirectionIco = newCallIconMap[direction];
  if (showAvatar) {
    symbol = /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames2["default"])(_styles["default"].callIcon, _styles["default"].avatar)
    }, /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
      isOnConferenceCall: isOnConferenceCall,
      avatarUrl: avatarUrl,
      extraNum: extraNum
    }));
  } else if (newCallIcon) {
    symbol = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].newCallIcon
    }, /*#__PURE__*/_react["default"].createElement("span", {
      title: title,
      "data-sign": "callDirection"
    }, /*#__PURE__*/_react["default"].createElement(CallDirectionIco, {
      className: (0, _classnames2["default"])(_styles["default"].activeCall, _defineProperty({}, _styles["default"].newRinging, ringing))
    })));
  } else {
    symbol = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].callIcon
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames2["default"])(
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      callIconMap[direction], _styles["default"].activeCall, ringing && _styles["default"].ringing),
      title: title,
      "data-sign": "callDirection"
    }));
  }
  return symbol;
};
CallIcon.defaultProps = {
  ringing: false,
  isOnConferenceCall: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
  showAvatar: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  avatarUrl: null,
  newCallIcon: false
};
var _default = CallIcon;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
