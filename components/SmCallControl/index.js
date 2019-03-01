"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SmCallControl;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));

var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SmCallControl(props) {
  var onMute = props.onMute,
      onUnmute = props.onUnmute,
      onHangup = props.onHangup,
      onReject = props.onReject,
      isOnMute = props.isOnMute,
      callStatus = props.callStatus,
      currentLocale = props.currentLocale,
      callDirection = props.callDirection; // reject conditions: call direction is inbound & call status is ringing

  function canRejectCall() {
    return _callDirections.default.inbound === callDirection && _telephonyStatus.default.ringing === callStatus;
  }

  var muteIcon = isOnMute ? _Mute.default : _Unmute.default;
  var muteAction = isOnMute ? onUnmute : onMute;
  var muteTitle = isOnMute ? 'unmute' : 'mute';
  var endTitle = canRejectCall() ? 'reject' : 'hangup';
  var endAction = canRejectCall() ? onReject : onHangup;
  var disabledCtrl = callStatus === _telephonyStatus.default.ringing;
  return _react.default.createElement("div", {
    className: _styles.default.smWraper
  }, _react.default.createElement("span", {
    title: _i18n.default.getString(muteTitle, currentLocale)
  }, _react.default.createElement(_CircleButton.default, {
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _classnames.default)(_styles.default.button, disabledCtrl ? _styles.default.buttonDisabled : null),
    disabled: disabledCtrl
  })), _react.default.createElement("span", {
    title: _i18n.default.getString(endTitle, currentLocale)
  }, _react.default.createElement(_CircleButton.default, {
    dataSign: endTitle,
    showBorder: false,
    icon: _End.default,
    onClick: endAction,
    className: (0, _classnames.default)(_styles.default.hangup, _styles.default.button)
  })));
}

SmCallControl.propTypes = {
  onMute: _propTypes.default.func,
  onUnmute: _propTypes.default.func,
  onHangup: _propTypes.default.func,
  onReject: _propTypes.default.func,
  isOnMute: _propTypes.default.bool,
  callStatus: _propTypes.default.string,
  currentLocale: _propTypes.default.string,
  callDirection: _propTypes.default.string.isRequired
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
//# sourceMappingURL=index.js.map
