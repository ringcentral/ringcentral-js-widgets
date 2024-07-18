"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedRecipients = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _RemoveButton = require("../RemoveButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Recipient = function Recipient(_ref) {
  var phoneNumber = _ref.phoneNumber,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? phoneNumber : _ref$name,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? name : _ref$title,
    _ref$isWarning = _ref.isWarning,
    isWarning = _ref$isWarning === void 0 ? false : _ref$isWarning,
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
var SelectedRecipients = function SelectedRecipients(_ref2) {
  var recipients = _ref2.recipients,
    _onRemove = _ref2.onRemove,
    className = _ref2.className;
  if (recipients.length) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      "data-sign": "recipientsList",
      className: (0, _clsx["default"])(className, _styles["default"].selectReceivers)
    }, recipients.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement(Recipient, {
        key: item.phoneNumber,
        name: item.name,
        phoneNumber: item.phoneNumber,
        onRemove: function onRemove() {
          return _onRemove(item.phoneNumber);
        }
      });
    }));
  }
  return null;
};
exports.SelectedRecipients = SelectedRecipients;
//# sourceMappingURL=SelectedRecipients.js.map
