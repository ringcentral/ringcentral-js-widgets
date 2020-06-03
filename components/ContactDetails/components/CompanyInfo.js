"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyInfo = exports.CompanyInfoItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("../styles.scss"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CompanyInfoItem = function CompanyInfoItem(_ref) {
  var label = _ref.label,
      value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].item
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label
  }, /*#__PURE__*/_react["default"].createElement("span", null, label)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].text
  }, value)));
};

exports.CompanyInfoItem = CompanyInfoItem;

var CompanyInfo = function CompanyInfo(_ref2) {
  var currentLocale = _ref2.currentLocale,
      company = _ref2.company,
      jobTitle = _ref2.jobTitle;
  var content = [];

  if (company) {
    content.push( /*#__PURE__*/_react["default"].createElement(CompanyInfoItem, {
      key: "company",
      label: _i18n["default"].getString('company', currentLocale),
      value: company
    }));
  }

  if (jobTitle) {
    content.push( /*#__PURE__*/_react["default"].createElement(CompanyInfoItem, {
      key: "jobTitle",
      label: _i18n["default"].getString('jobTitle', currentLocale),
      value: jobTitle
    }));
  }

  if (content.length) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].section, _styles["default"].companyInfo)
    }, content);
  }

  return null;
};

exports.CompanyInfo = CompanyInfo;
//# sourceMappingURL=CompanyInfo.js.map
