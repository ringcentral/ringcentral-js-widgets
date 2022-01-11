"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));

var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SmCallControl = function SmCallControl(props) {
  var onMute = props.onMute,
      onUnmute = props.onUnmute,
      onHangup = props.onHangup,
      onReject = props.onReject,
      isOnMute = props.isOnMute,
      callStatus = props.callStatus,
      currentLocale = props.currentLocale,
      callDirection = props.callDirection; // reject conditions: call direction is inbound & call status is ringing

  function canRejectCall() {
    return _callDirections["default"].inbound === callDirection && _telephonyStatus["default"].ringing === callStatus;
  }

  var muteIcon = isOnMute ? _Mute["default"] : _Unmute["default"];
  var muteAction = isOnMute ? onUnmute : onMute;
  var muteTitle = isOnMute ? 'unmute' : 'mute';
  var endTitle = canRejectCall() ? 'reject' : 'hangup';
  var endAction = canRejectCall() ? onReject : onHangup;
  var disabledCtrl = callStatus === _telephonyStatus["default"].ringing;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].smWraper
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(muteTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _classnames["default"])(_styles["default"].button, disabledCtrl ? _styles["default"].buttonDisabled : null),
    disabled: disabledCtrl
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(endTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: endTitle,
    showBorder: false,
    icon: _End["default"],
    onClick: endAction,
    className: (0, _classnames["default"])(_styles["default"].hangup, _styles["default"].button)
  })));
};

SmCallControl.defaultProps = {
  onMute: function onMute() {},
  onUnmute: function onUnmute() {},
  onHangup: function onHangup() {},
  onReject: function onReject() {},
  isOnMute: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US'
};
var _default = SmCallControl;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
