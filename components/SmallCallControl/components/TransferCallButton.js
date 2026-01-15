"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallButton = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _getIconColor = require("./getIconColor");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TransferCallButton = exports.TransferCallButton = function TransferCallButton(_ref) {
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
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    ref: transferRef,
    size: size,
    onClick: onTransfer,
    symbol: _junoIcon.TransferCall,
    disabled: disableTransfer,
    "data-sign": dataSign,
    "data-icon": "transfer-call",
    title: _i18n["default"].getString('transfer', currentLocale),
    color: color,
    className: className,
    shouldPersistBg: disableTransfer
  });
};
TransferCallButton.defaultProps = {
  onTransfer: function onTransfer() {},
  disableTransfer: false,
  currentLocale: 'en-US',
  dataSign: 'transferCall'
};
//# sourceMappingURL=TransferCallButton.js.map
