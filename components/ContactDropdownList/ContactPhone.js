"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactPhone = void 0;

var _react = _interopRequireDefault(require("react"));

var _phoneTypeNames = _interopRequireDefault(require("../../lib/phoneTypeNames"));

var _splitter = require("./splitter");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContactPhone = function ContactPhone(_ref) {
  var phoneType = _ref.phoneType,
      phoneNumber = _ref.phoneNumber,
      formatContactPhone = _ref.formatContactPhone,
      titleEnabled = _ref.titleEnabled,
      phoneTypeRenderer = _ref.phoneTypeRenderer;
  var phoneTypeName = phoneTypeRenderer ? phoneTypeRenderer(phoneType) : _phoneTypeNames["default"].getString(phoneType);
  var phoneNumberTitle = phoneTypeName ? "".concat(formatContactPhone(phoneNumber), " ").concat(_splitter.splitter, " ").concat(phoneTypeName) : formatContactPhone(phoneNumber);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].phoneNumberSection,
    title: titleEnabled && phoneNumberTitle
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "dropDownContactPhone"
  }, formatContactPhone(phoneNumber)), phoneTypeName && /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].splitter
  }, _splitter.splitter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneTypeName));
};

exports.ContactPhone = ContactPhone;
ContactPhone.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined
};
//# sourceMappingURL=ContactPhone.js.map
