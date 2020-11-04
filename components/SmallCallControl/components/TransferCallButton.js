"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallButton = void 0;

var _iconTransferCall = _interopRequireDefault(require("@ringcentral/juno/icons/icon-transfer-call.svg"));

var _react = _interopRequireDefault(require("react"));

var _CircleIconButton = require("../../CircleIconButton");

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TransferCallButton = function TransferCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
      isOnTransfer = _ref.isOnTransfer,
      onTransfer = _ref.onTransfer,
      transferRef = _ref.transferRef,
      disableTransfer = _ref.disableTransfer,
      size = _ref.size,
      className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement(_CircleIconButton.CircleIconButton, {
    "data-icon": "transfer-call",
    symbol: _iconTransferCall["default"],
    title: _i18n["default"].getString('transfer', currentLocale),
    active: isOnTransfer,
    onClick: onTransfer,
    innerRef: transferRef,
    disabled: disableTransfer,
    size: size,
    className: className,
    normal: true
  });
};

exports.TransferCallButton = TransferCallButton;
TransferCallButton.defaultProps = {
  onTransfer: function onTransfer() {},
  disableTransfer: false,
  currentLocale: 'en-US'
};
//# sourceMappingURL=TransferCallButton.js.map
