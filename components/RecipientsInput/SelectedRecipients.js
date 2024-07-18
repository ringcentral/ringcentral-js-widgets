"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedRecipients = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _SelectedRecipientItem = require("./SelectedRecipientItem");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
var SelectedRecipients = function SelectedRecipients(_ref) {
  var recipient = _ref.recipient,
    recipients = _ref.recipients,
    multiple = _ref.multiple,
    _onRemove = _ref.onRemove,
    className = _ref.className;
  if (multiple && recipients.length) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      "data-sign": "recipientsList",
      className: (0, _clsx["default"])(className, _styles["default"].selectReceivers)
    }, recipients.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement(_SelectedRecipientItem.SelectedRecipientItem, _extends({}, item, {
        key: item.phoneNumber,
        name: item.name,
        phoneNumber: item.phoneNumber,
        onRemove: function onRemove() {
          return _onRemove(item.phoneNumber);
        }
      }));
    }));
  }
  if (!multiple && recipient) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      className: (0, _clsx["default"])(className, _styles["default"].selectReceivers)
    }, /*#__PURE__*/_react["default"].createElement(_SelectedRecipientItem.SelectedRecipientItem, _extends({}, recipient, {
      key: recipient.phoneNumber,
      name: recipient.name,
      phoneNumber: recipient.phoneNumber,
      onRemove: function onRemove() {
        return _onRemove(recipient.phoneNumber);
      }
    })));
  }
  return null;
};
exports.SelectedRecipients = SelectedRecipients;
//# sourceMappingURL=SelectedRecipients.js.map
