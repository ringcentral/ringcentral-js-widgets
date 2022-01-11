"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientPhone = void 0;

var _react = _interopRequireDefault(require("react"));

var _phoneTypeNames = _interopRequireDefault(require("../../lib/phoneTypeNames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RecipientPhone = function RecipientPhone(_ref) {
  var currentLocale = _ref.currentLocale,
      formatContactPhone = _ref.formatContactPhone,
      phoneNumber = _ref.phoneNumber,
      phoneType = _ref.phoneType,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      splitter = _ref.splitter,
      enableTitle = _ref.enableTitle;
  var phoneTypeName = phoneTypeRenderer ? phoneTypeRenderer(phoneType) : _phoneTypeNames["default"].getString(phoneType, currentLocale);
  var title = enableTitle ? "".concat(formatContactPhone(phoneNumber), " ").concat(splitter, " ").concat(phoneTypeName) : undefined;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].phoneNumberSection,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("span", null, formatContactPhone(phoneNumber)), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].splitter
  }, splitter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneTypeName));
};

exports.RecipientPhone = RecipientPhone;
//# sourceMappingURL=RecipientPhone.js.map
