"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emails = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
        title: email
        // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        ,
        className: onClickMailTo ? _styles["default"].underline : null,
        onClick: onClickMailTo && function () {
          return onClickMailTo(email, contactType);
        }
      }, email));
    }, emails);
    return /*#__PURE__*/_react["default"].createElement("section", {
      className: (0, _clsx["default"])(_styles["default"].section, _styles["default"].email),
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
