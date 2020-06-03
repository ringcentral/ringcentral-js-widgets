"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedRecipients = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _SelectedRecipientItem = require("./SelectedRecipientItem");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SelectedRecipients = function SelectedRecipients(_ref) {
  var recipient = _ref.recipient,
      recipients = _ref.recipients,
      multiple = _ref.multiple,
      _onRemove = _ref.onRemove,
      className = _ref.className;

  if (multiple && recipients.length) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      className: (0, _classnames["default"])(className, _styles["default"].selectReceivers)
    }, recipients.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement(_SelectedRecipientItem.SelectedRecipientItem, {
        key: item.phoneNumber,
        name: item.name,
        phoneNumber: item.phoneNumber,
        onRemove: function onRemove() {
          return _onRemove(item.phoneNumber);
        }
      });
    }));
  }

  if (!multiple && recipient) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      className: (0, _classnames["default"])(className, _styles["default"].selectReceivers)
    }, /*#__PURE__*/_react["default"].createElement(_SelectedRecipientItem.SelectedRecipientItem, {
      key: recipient.phoneNumber,
      name: recipient.name,
      phoneNumber: recipient.phoneNumber,
      onRemove: function onRemove() {
        return _onRemove(recipient.phoneNumber);
      }
    }));
  }

  return null;
};

exports.SelectedRecipients = SelectedRecipients;
//# sourceMappingURL=SelectedRecipients.js.map
