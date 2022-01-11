"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _TransferCall = _interopRequireDefault(require("@ringcentral/juno/es6/icon/TransferCall.js"));

var _i18n = _interopRequireDefault(require("../i18n"));

var _getIconColor = require("./getIconColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TransferCallButton = function TransferCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
      onTransfer = _ref.onTransfer,
      transferRef = _ref.transferRef,
      disableTransfer = _ref.disableTransfer,
      size = _ref.size,
      className = _ref.className,
      dataSign = _ref.dataSign;
  var color = (0, _getIconColor.getIconColor)({
    active: false,
    disable: disableTransfer
  });
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    ref: transferRef,
    size: size,
    onClick: onTransfer,
    symbol: _TransferCall["default"],
    disabled: disableTransfer,
    "data-sign": dataSign,
    "data-icon": "transfer-call",
    title: _i18n["default"].getString('transfer', currentLocale),
    color: color,
    className: className,
    shouldPersistBg: disableTransfer
  });
};

exports.TransferCallButton = TransferCallButton;
TransferCallButton.defaultProps = {
  onTransfer: function onTransfer() {},
  disableTransfer: false,
  currentLocale: 'en-US',
  dataSign: 'transferCall'
};
//# sourceMappingURL=TransferCallButton.js.map
