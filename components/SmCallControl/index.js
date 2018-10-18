'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SmCallControl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _telephonyStatus = require('ringcentral-integration/enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _Mute = require('../../assets/images/Mute.svg');

var _Mute2 = _interopRequireDefault(_Mute);

var _Unmute = require('../../assets/images/Unmute.svg');

var _Unmute2 = _interopRequireDefault(_Unmute);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SmCallControl(props) {
  var onMute = props.onMute,
      onUnmute = props.onUnmute,
      onHangup = props.onHangup,
      onReject = props.onReject,
      isOnMute = props.isOnMute,
      callStatus = props.callStatus,
      currentLocale = props.currentLocale,
      callDirection = props.callDirection;

  // reject conditions: call direction is inbound & call status is ringing

  function canRejectCall() {
    return _callDirections2.default.inbound === callDirection && _telephonyStatus2.default.ringing === callStatus;
  }

  var muteIcon = isOnMute ? _Mute2.default : _Unmute2.default;
  var muteAction = isOnMute ? onUnmute : onMute;
  var muteTitle = isOnMute ? 'unmute' : 'mute';
  var endTile = canRejectCall() ? 'reject' : 'hangup';
  var endAction = canRejectCall() ? onReject : onHangup;
  var disabledCtrl = callStatus === _telephonyStatus2.default.ringing;
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.smWraper },
    _react2.default.createElement(_CircleButton2.default, {
      icon: muteIcon,
      onClick: muteAction,
      className: (0, _classnames2.default)(_styles2.default.button, disabledCtrl ? _styles2.default.buttonDisabled : null),
      title: _i18n2.default.getString(muteTitle, currentLocale),
      disabled: disabledCtrl
    }),
    _react2.default.createElement(_CircleButton2.default, {
      showBorder: false,
      icon: _End2.default,
      onClick: endAction,
      className: (0, _classnames2.default)(_styles2.default.hangup, _styles2.default.button),
      title: _i18n2.default.getString(endTile, currentLocale)
    })
  );
}

SmCallControl.propTypes = {
  onMute: _propTypes2.default.func,
  onUnmute: _propTypes2.default.func,
  onHangup: _propTypes2.default.func,
  onReject: _propTypes2.default.func,
  isOnMute: _propTypes2.default.bool,
  callStatus: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string,
  callDirection: _propTypes2.default.string.isRequired
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
