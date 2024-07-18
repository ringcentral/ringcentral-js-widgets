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
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _callIconMap, _newCallIconMap;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  var CallDirectionIco = newCallIconMap[direction || _callDirections["default"].outbound];
  if (showAvatar) {
    symbol = /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx2["default"])(_styles["default"].callIcon, _styles["default"].avatar)
    }, /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
      isOnConferenceCall: isOnConferenceCall,
      avatarUrl: avatarUrl,
      extraNum: extraNum
    }));
  } else if (newCallIcon) {
    symbol = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].newCallIcon
    }, isOnConferenceCall ? /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "conferenceCall"
    }, /*#__PURE__*/_react["default"].createElement(_junoIcon.ConferenceBorder, {
      className: _styles["default"].activeCall
    })) : /*#__PURE__*/_react["default"].createElement("span", {
      title: title,
      "data-sign": "callDirection"
    }, /*#__PURE__*/_react["default"].createElement(CallDirectionIco, {
      className: (0, _clsx2["default"])(_styles["default"].activeCall, _defineProperty({}, _styles["default"].newRinging, ringing))
    })));
  } else {
    symbol = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].callIcon
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _clsx2["default"])(
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
