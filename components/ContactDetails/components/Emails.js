"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emails = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ramda = require("ramda");

var _i18n = _interopRequireDefault(require("../i18n"));

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Emails = function Emails(_ref) {
  var currentLocale = _ref.currentLocale,
      onClickMailTo = _ref.onClickMailTo,
      emails = _ref.emails,
      contactType = _ref.contactType;

  if (emails && emails.length > 0) {
    var emailList = (0, _ramda.addIndex)(_ramda.map)(function (email, idx) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: idx
      }, /*#__PURE__*/_react["default"].createElement("a", {
        title: email,
        className: onClickMailTo ? _styles["default"].underline : null,
        onClick: onClickMailTo && function () {
          return onClickMailTo(email, contactType);
        }
      }, email));
    }, emails);
    return /*#__PURE__*/_react["default"].createElement("section", {
      className: (0, _classnames["default"])(_styles["default"].section, _styles["default"].email),
      "aria-label": "email"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].label
    }, /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('emailLabel', currentLocale))), /*#__PURE__*/_react["default"].createElement("ul", {
      className: _styles["default"].content
    }, emailList));
  }

  return null;
};

exports.Emails = Emails;
//# sourceMappingURL=Emails.js.map
