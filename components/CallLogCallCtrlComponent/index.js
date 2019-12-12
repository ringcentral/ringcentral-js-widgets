"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallLogCallCtrlComponent;

require("core-js/modules/es6.object.define-property");

var _classnames5 = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CallLogCallCtrlComponent(props) {
  var _classnames, _classnames2, _classnames3, _classnames4;

  var onMute = props.onMute,
      onUnmute = props.onUnmute,
      onHangup = props.onHangup,
      onReject = props.onReject,
      isOnMute = props.isOnMute,
      callStatus = props.callStatus,
      currentLocale = props.currentLocale,
      callDirection = props.callDirection,
      onTransfer = props.onTransfer,
      isOnTransfer = props.isOnTransfer,
      isOnHold = props.isOnHold,
      onUnHold = props.onUnHold,
      onHold = props.onHold,
      disableLinks = props.disableLinks,
      isWide = props.isWide,
      transferRef = props.transferRef; // reject conditions: call direction is inbound & call status is ringing

  var isInComingCall = _callDirections["default"].inbound === callDirection && _telephonyStatus["default"].ringing === callStatus;
  var muteIcon = isOnMute ? _Mute["default"] : _Unmute["default"];
  var muteAction = isOnMute ? onUnmute : onMute;
  var muteTitle = isOnMute ? 'unmute' : 'mute';
  var holdTitle = isOnHold ? 'onHold' : 'hold';
  var holdAction = isOnHold ? onUnHold : onHold;
  var endTitle = isInComingCall ? 'reject' : 'hangup';
  var endAction = isInComingCall ? onReject : onHangup;
  var disabledCtrl = callStatus === _telephonyStatus["default"].ringing;
  return _react["default"].createElement("div", {
    className: (0, _classnames5["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
  }, _react["default"].createElement("span", {
    title: _i18n["default"].getString(muteTitle, currentLocale)
  }, _react["default"].createElement(_CircleButton["default"], {
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _classnames5["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].button, true), _defineProperty(_classnames, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames)),
    disabled: disableLinks || disabledCtrl
  })), _react["default"].createElement("span", {
    ref: transferRef,
    title: _i18n["default"].getString('transfer', currentLocale)
  }, _react["default"].createElement(_CircleButton["default"], {
    dataSign: "transfer",
    icon: _Transfer["default"],
    onClick: onTransfer,
    className: (0, _classnames5["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].button, true), _defineProperty(_classnames2, _styles["default"].buttonActive, isOnTransfer), _defineProperty(_classnames2, _styles["default"].buttonDisabled, disableLinks || isInComingCall), _classnames2)),
    disabled: disableLinks || isInComingCall
  })), _react["default"].createElement("span", {
    title: _i18n["default"].getString(holdTitle, currentLocale)
  }, _react["default"].createElement(_CircleButton["default"], {
    dataSign: holdTitle,
    icon: _Hold["default"],
    onClick: holdAction,
    className: (0, _classnames5["default"])((_classnames3 = {}, _defineProperty(_classnames3, _styles["default"].button, true), _defineProperty(_classnames3, _styles["default"].buttonActive, isOnHold), _defineProperty(_classnames3, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _classnames3)),
    disabled: disableLinks || isInComingCall
  })), _react["default"].createElement("span", {
    title: _i18n["default"].getString(endTitle, currentLocale)
  }, _react["default"].createElement(_CircleButton["default"], {
    dataSign: endTitle,
    showBorder: false,
    icon: _End["default"],
    onClick: endAction,
    className: (0, _classnames5["default"])((_classnames4 = {}, _defineProperty(_classnames4, _styles["default"].hangup, true), _defineProperty(_classnames4, _styles["default"].button, true), _defineProperty(_classnames4, _styles["default"].buttonDisabled, disableLinks), _classnames4)),
    disabled: disableLinks
  })));
}

CallLogCallCtrlComponent.propTypes = {
  onMute: _propTypes["default"].func,
  onUnmute: _propTypes["default"].func,
  onHangup: _propTypes["default"].func,
  onReject: _propTypes["default"].func,
  onTransfer: _propTypes["default"].func,
  isOnMute: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].bool,
  onUnHold: _propTypes["default"].func,
  onHold: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  callStatus: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string,
  callDirection: _propTypes["default"].string.isRequired,
  isWide: _propTypes["default"].bool,
  transferRef: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].shape({
    current: _propTypes["default"].instanceOf(Element)
  })]),
  isOnTransfer: _propTypes["default"].bool
};
CallLogCallCtrlComponent.defaultProps = {
  onMute: function onMute() {},
  onUnmute: function onUnmute() {},
  onHangup: function onHangup() {},
  onReject: function onReject() {},
  onTransfer: function onTransfer() {},
  onUnHold: function onUnHold() {},
  onHold: function onHold() {},
  isOnMute: false,
  isOnHold: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false
};
//# sourceMappingURL=index.js.map
