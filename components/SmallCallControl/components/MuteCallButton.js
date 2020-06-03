"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuteCallButton = void 0;

var _iconMicOff = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-mic-off.svg"));

var _iconMic = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-mic.svg"));

var _react = _interopRequireDefault(require("react"));

var _CircleIconButton = require("../../CircleIconButton");

var _help = require("../help");

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MuteCallButton = function MuteCallButton(_ref) {
  var isOnMute = _ref.isOnMute,
      currentLocale = _ref.currentLocale,
      onUnmute = _ref.onUnmute,
      onMute = _ref.onMute,
      size = _ref.size,
      className = _ref.className,
      disableMute = _ref.disableMute;

  var _getCircleIconButtonT = (0, _help.getCircleIconButtonTitle)({
    isOnMute: isOnMute
  }),
      muteTitle = _getCircleIconButtonT.muteTitle;

  return /*#__PURE__*/_react["default"].createElement(_CircleIconButton.CircleIconButton, {
    "data-icon": isOnMute ? 'mic-off' : 'mic',
    symbol: isOnMute ? _iconMicOff["default"] : _iconMic["default"],
    title: _i18n["default"].getString(muteTitle, currentLocale),
    active: isOnMute,
    onClick: isOnMute ? onUnmute : onMute,
    disabled: disableMute,
    size: size,
    className: className,
    normal: true
  });
};

exports.MuteCallButton = MuteCallButton;
MuteCallButton.defaultProps = {
  onMute: function onMute() {},
  onUnmute: function onUnmute() {},
  disableMute: false,
  currentLocale: 'en-US'
};
//# sourceMappingURL=MuteCallButton.js.map
