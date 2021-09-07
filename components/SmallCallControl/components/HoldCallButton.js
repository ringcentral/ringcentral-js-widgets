"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldCallButton = void 0;

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _react = _interopRequireDefault(require("react"));

var _help = require("../help");

var _i18n = _interopRequireDefault(require("../i18n"));

var _getIconColor = require("./getIconColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HoldCallButton = function HoldCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
      isOnHold = _ref.isOnHold,
      onUnHold = _ref.onUnHold,
      onHold = _ref.onHold,
      size = _ref.size,
      disableHold = _ref.disableHold,
      className = _ref.className,
      dataSign = _ref.dataSign;

  var _getCircleIconButtonT = (0, _help.getCircleIconButtonTitle)({
    isOnHold: isOnHold
  }),
      holdTitle = _getCircleIconButtonT.holdTitle;

  var color = (0, _getIconColor.getIconColor)({
    active: isOnHold,
    disable: disableHold
  });
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    symbol: _icon.Hold,
    "data-icon": "hold",
    title: _i18n["default"].getString(holdTitle, currentLocale),
    color: color,
    shouldPersistBg: isOnHold || disableHold,
    onClick: isOnHold ? onUnHold : onHold,
    disabled: disableHold,
    size: size,
    className: className,
    useColorWhenDisabled: isOnHold,
    "data-sign": dataSign
  });
};

exports.HoldCallButton = HoldCallButton;
HoldCallButton.defaultProps = {
  onHold: function onHold() {},
  onUnHold: function onUnHold() {},
  disableHold: false,
  currentLocale: 'en-US',
  dataSign: 'holdCall'
};
//# sourceMappingURL=HoldCallButton.js.map
