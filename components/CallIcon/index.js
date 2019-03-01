"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _ConferenceCallIcon = _interopRequireDefault(require("../../assets/images/ConferenceCallIcon.svg"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _callIconMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections.default.inbound, _DynamicsFont.default.inbound), _defineProperty(_callIconMap, _callDirections.default.outbound, _DynamicsFont.default.outbound), _callIconMap);

function CallIcon(_ref) {
  var direction = _ref.direction,
      ringing = _ref.ringing,
      inboundTitle = _ref.inboundTitle,
      outboundTitle = _ref.outboundTitle,
      isOnConferenceCall = _ref.isOnConferenceCall,
      showAvatar = _ref.showAvatar,
      avatarUrl = _ref.avatarUrl,
      _ref$extraNum = _ref.extraNum,
      extraNum = _ref$extraNum === void 0 ? 0 : _ref$extraNum;
  var title = direction === _callDirections.default.inbound ? inboundTitle : outboundTitle;
  var symbol;

  if (showAvatar) {
    symbol = _react.default.createElement("div", {
      className: (0, _classnames.default)(_styles.default.callIcon, _styles.default.avatar)
    }, _react.default.createElement(_CallAvatar.default, {
      isOnConferenceCall: isOnConferenceCall,
      avatarUrl: avatarUrl,
      extraNum: extraNum
    }));
  } else {
    symbol = _react.default.createElement("div", {
      className: _styles.default.callIcon
    }, _react.default.createElement("span", {
      className: (0, _classnames.default)(callIconMap[direction], _styles.default.activeCall, ringing && _styles.default.ringing),
      title: title
    }));
  }

  return symbol;
}

CallIcon.propTypes = {
  direction: _propTypes.default.string.isRequired,
  ringing: _propTypes.default.bool,
  isOnConferenceCall: _propTypes.default.bool,
  inboundTitle: _propTypes.default.string,
  outboundTitle: _propTypes.default.string,
  showAvatar: _propTypes.default.bool,
  avatarUrl: _propTypes.default.string
};
CallIcon.defaultProps = {
  ringing: false,
  isOnConferenceCall: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
  showAvatar: false,
  avatarUrl: null
};
var _default = CallIcon;
exports.default = _default;
//# sourceMappingURL=index.js.map
