"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedRecipientItem = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _RemoveButton = require("../RemoveButton");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SelectedRecipientItem = function SelectedRecipientItem(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? phoneNumber : _ref$name,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? name : _ref$title,
      onRemove = _ref.onRemove;
  var className = phoneNumber.length > 5 ? _styles["default"].phoneNumber : _styles["default"].extension;
  return _react["default"].createElement("li", {
    className: className,
    title: title
  }, _react["default"].createElement("span", null, name), _react["default"].createElement(_RemoveButton.RemoveButton, {
    className: _styles["default"].removeReceiver,
    onClick: onRemove,
    visibility: true
  }));
};

exports.SelectedRecipientItem = SelectedRecipientItem;
//# sourceMappingURL=SelectedRecipientItem.js.map
