"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetails = void 0;
var _react = _interopRequireDefault(require("react"));
var _CompanyInfo = require("./components/CompanyInfo");
var _Emails = require("./components/Emails");
var _PhoneSection = require("./components/PhoneSection");
var _Profile = require("./components/Profile");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ContactDetails = function ContactDetails(_ref) {
  var contact = _ref.contact,
    currentLocale = _ref.currentLocale,
    onClickMailTo = _ref.onClickMailTo,
    disableLinks = _ref.disableLinks,
    isMultipleSiteEnabled = _ref.isMultipleSiteEnabled,
    isCallButtonDisabled = _ref.isCallButtonDisabled,
    canCallButtonShow = _ref.canCallButtonShow,
    canTextButtonShow = _ref.canTextButtonShow,
    formatNumber = _ref.formatNumber,
    onClickToDial = _ref.onClickToDial,
    onClickToSMS = _ref.onClickToSMS,
    sourceNodeRenderer = _ref.sourceNodeRenderer,
    getPresence = _ref.getPresence;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root,
    role: "main"
  }, /*#__PURE__*/_react["default"].createElement(_Profile.Profile, {
    getPresence: getPresence,
    contact: contact,
    sourceNodeRenderer: sourceNodeRenderer,
    currentLocale: currentLocale,
    isMultipleSiteEnabled: isMultipleSiteEnabled
  }), /*#__PURE__*/_react["default"].createElement(_CompanyInfo.CompanyInfo, {
    company: contact.company,
    currentLocale: currentLocale,
    jobTitle: contact.jobTitle
  }), /*#__PURE__*/_react["default"].createElement(_PhoneSection.PhoneSection, {
    contact: contact,
    currentLocale: currentLocale,
    disableLinks: disableLinks,
    canCallButtonShow: canCallButtonShow,
    canTextButtonShow: canTextButtonShow,
    isCallButtonDisabled: isCallButtonDisabled,
    isMultipleSiteEnabled: isMultipleSiteEnabled,
    formatNumber: formatNumber,
    onClickToDial: onClickToDial,
    onClickToSMS: onClickToSMS
  }), /*#__PURE__*/_react["default"].createElement(_Emails.Emails, {
    contactType: contact.type,
    currentLocale: currentLocale,
    emails: contact.emails,
    onClickMailTo: onClickMailTo
  }));
};
exports.ContactDetails = ContactDetails;
//# sourceMappingURL=ContactDetails.js.map
