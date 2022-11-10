"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _icon = require("@ringcentral/juno/icon");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _callIconMap, _newCallIconMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _callIconMap);
var newCallIconMap = (_newCallIconMap = {}, _defineProperty(_newCallIconMap, _callDirections["default"].inbound, _icon.IncallBorder), _defineProperty(_newCallIconMap, _callDirections["default"].outbound, _icon.OutcallBorder), _newCallIconMap);

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
      className: (0, _classnames2["default"])(callIconMap[direction], _styles["default"].activeCall, ringing && _styles["default"].ringing),
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
  avatarUrl: null,
  newCallIcon: false
};
var _default = CallIcon;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
