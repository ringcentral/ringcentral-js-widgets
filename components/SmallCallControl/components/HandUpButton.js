"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandUpButton = void 0;

var _iconHandUp = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-hand-up.svg"));

var _react = _interopRequireDefault(require("react"));

var _CircleIconButton = require("../../CircleIconButton");

var _help = require("../help");

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HandUpButton = function HandUpButton(_ref) {
  var currentLocale = _ref.currentLocale,
      onReject = _ref.onReject,
      onHangup = _ref.onHangup,
      isInComingCall = _ref.isInComingCall,
      size = _ref.size,
      disableHangup = _ref.disableHangup,
      className = _ref.className;

  var _getCircleIconButtonT = (0, _help.getCircleIconButtonTitle)({
    isInComingCall: isInComingCall
  }),
      endTitle = _getCircleIconButtonT.endTitle;

  return /*#__PURE__*/_react["default"].createElement(_CircleIconButton.CircleIconButton, {
    "data-icon": "hand-up",
    symbol: _iconHandUp["default"],
    title: _i18n["default"].getString(endTitle, currentLocale),
    color: ['semantic', 'negative'],
    onClick: isInComingCall ? onReject : onHangup,
    disabled: disableHangup,
    size: size,
    className: className
  });
};

exports.HandUpButton = HandUpButton;
HandUpButton.defaultProps = {
  onReject: function onReject() {},
  onHangup: function onHangup() {},
  disableHangup: false,
  isInComingCall: false,
  currentLocale: 'en-US'
};
//# sourceMappingURL=HandUpButton.js.map
