"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ContactPhone;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _phoneTypeNames = _interopRequireDefault(require("../../lib/phoneTypeNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ContactPhone(_ref) {
  var formatContactPhone = _ref.formatContactPhone,
      phoneNumber = _ref.phoneNumber,
      phoneType = _ref.phoneType,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      splitter = _ref.splitter,
      enableTitle = _ref.enableTitle;
  var phoneTypeName = phoneTypeRenderer ? phoneTypeRenderer(phoneType) : _phoneTypeNames["default"].getString(phoneType);
  var title = enableTitle ? "".concat(formatContactPhone(phoneNumber), " ").concat(splitter, " ").concat(phoneTypeName) : undefined;
  return _react["default"].createElement("div", {
    className: _styles["default"].phoneNumberSection,
    title: title
  }, _react["default"].createElement("span", null, formatContactPhone(phoneNumber)), _react["default"].createElement("span", {
    className: _styles["default"].spliter
  }, splitter), _react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneTypeName));
}

ContactPhone.propTypes = {
  formatContactPhone: _propTypes["default"].func.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  phoneType: _propTypes["default"].string.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  splitter: _propTypes["default"].string.isRequired,
  enableTitle: _propTypes["default"].bool
};
ContactPhone.defaultProps = {
  phoneTypeRenderer: undefined,
  enableTitle: undefined
};
//# sourceMappingURL=ContactPhone.js.map
