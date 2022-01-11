"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuteCallButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _Mic = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Mic.js"));

var _MicOff = _interopRequireDefault(require("@ringcentral/juno/es6/icon/MicOff.js"));

var _help = require("../help");

var _i18n = _interopRequireDefault(require("../i18n"));

var _getIconColor = require("./getIconColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MuteCallButton = function MuteCallButton(_ref) {
  var isOnMute = _ref.isOnMute,
      currentLocale = _ref.currentLocale,
      onUnmute = _ref.onUnmute,
      onMute = _ref.onMute,
      size = _ref.size,
      className = _ref.className,
      disableMute = _ref.disableMute,
      dataSign = _ref.dataSign;

  var _getCircleIconButtonT = (0, _help.getCircleIconButtonTitle)({
    isOnMute: isOnMute
  }),
      muteTitle = _getCircleIconButtonT.muteTitle;

  var color = (0, _getIconColor.getIconColor)({
    active: isOnMute,
    disable: disableMute
  });
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    "data-sign": dataSign,
    symbol: isOnMute ? _MicOff["default"] : _Mic["default"],
    "data-icon": isOnMute ? 'mic-off' : 'mic',
    title: _i18n["default"].getString(muteTitle, currentLocale),
    color: color,
    shouldPersistBg: isOnMute || disableMute,
    onClick: isOnMute ? onUnmute : onMute,
    disabled: disableMute,
    size: size,
    className: className,
    useColorWhenDisabled: isOnMute
  });
};

exports.MuteCallButton = MuteCallButton;
MuteCallButton.defaultProps = {
  onMute: function onMute() {},
  onUnmute: function onUnmute() {},
  disableMute: false,
  currentLocale: 'en-US',
  dataSign: 'muteCall'
};
//# sourceMappingURL=MuteCallButton.js.map
