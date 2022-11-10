"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HangUpButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _help = require("../help");

var _i18n = _interopRequireDefault(require("../i18n"));

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HangUpButton = function HangUpButton(_ref) {
  var currentLocale = _ref.currentLocale,
      onReject = _ref.onReject,
      onHangup = _ref.onHangup,
      isInComingCall = _ref.isInComingCall,
      size = _ref.size,
      disableHangup = _ref.disableHangup,
      className = _ref.className,
      dataSign = _ref.dataSign;

  var _getCircleIconButtonT = (0, _help.getCircleIconButtonTitle)({
    isInComingCall: isInComingCall
  }),
      endTitle = _getCircleIconButtonT.endTitle;

  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    symbol: _icon.HandUp,
    variant: "contained",
    "data-icon": "hand-up",
    title: _i18n["default"].getString(endTitle, currentLocale),
    color: "danger.b03",
    onClick: isInComingCall ? onReject : onHangup,
    disabled: disableHangup,
    size: size,
    className: (0, _classnames["default"])(_styles["default"].hangup, className),
    disableRipple: true,
    "data-sign": dataSign
  });
};

exports.HangUpButton = HangUpButton;
HangUpButton.defaultProps = {
  onReject: function onReject() {},
  onHangup: function onHangup() {},
  disableHangup: false,
  isInComingCall: false,
  currentLocale: 'en-US',
  dataSign: 'hangup'
};
//# sourceMappingURL=HangUpButton.js.map
