"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedRecipientItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _RemoveButton = require("../RemoveButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SelectedRecipientItem = function SelectedRecipientItem(_ref) {
  var phoneNumber = _ref.phoneNumber,
    _ref$isWarning = _ref.isWarning,
    isWarning = _ref$isWarning === void 0 ? false : _ref$isWarning,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? phoneNumber : _ref$name,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? name : _ref$title,
    onRemove = _ref.onRemove;
  var className = phoneNumber.length > 5 ? _styles["default"].phoneNumber : _styles["default"].extension;
  if (isWarning) className = _styles["default"].warningRecipient;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: className,
    title: title,
    "data-sign": "recipientItem"
  }, /*#__PURE__*/_react["default"].createElement("span", null, name), /*#__PURE__*/_react["default"].createElement(_RemoveButton.RemoveButton, {
    className: _styles["default"].removeReceiver,
    onClick: onRemove,
    visibility: true,
    showWarningIcon: isWarning
  }));
};
exports.SelectedRecipientItem = SelectedRecipientItem;
//# sourceMappingURL=SelectedRecipientItem.js.map
