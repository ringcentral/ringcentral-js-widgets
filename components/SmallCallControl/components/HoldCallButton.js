"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldCallButton = void 0;

var _iconHold = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-hold.svg"));

var _react = _interopRequireDefault(require("react"));

var _CircleIconButton = require("../../CircleIconButton");

var _help = require("../help");

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HoldCallButton = function HoldCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
      isOnHold = _ref.isOnHold,
      onUnHold = _ref.onUnHold,
      onHold = _ref.onHold,
      size = _ref.size,
      disableHold = _ref.disableHold,
      className = _ref.className;

  var _getCircleIconButtonT = (0, _help.getCircleIconButtonTitle)({
    isOnHold: isOnHold
  }),
      holdTitle = _getCircleIconButtonT.holdTitle;

  return /*#__PURE__*/_react["default"].createElement(_CircleIconButton.CircleIconButton, {
    "data-icon": "hold",
    symbol: _iconHold["default"],
    title: _i18n["default"].getString(holdTitle, currentLocale),
    active: isOnHold,
    onClick: isOnHold ? onUnHold : onHold,
    disabled: disableHold,
    size: size,
    className: className,
    normal: true
  });
};

exports.HoldCallButton = HoldCallButton;
HoldCallButton.defaultProps = {
  onHold: function onHold() {},
  onUnHold: function onUnHold() {},
  disableHold: false,
  currentLocale: 'en-US'
};
//# sourceMappingURL=HoldCallButton.js.map
