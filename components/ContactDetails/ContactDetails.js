"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetails = void 0;

var _react = _interopRequireDefault(require("react"));

var _CompanyInfo = require("./components/CompanyInfo");

var _Emails = require("./components/Emails");

var _Profile = require("./components/Profile");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _PhoneSection = require("./components/PhoneSection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContactDetails = function ContactDetails(_ref) {
  var contact = _ref.contact,
      currentLocale = _ref.currentLocale,
      onClickMailTo = _ref.onClickMailTo,
      disableLinks = _ref.disableLinks,
      isCallButtonDisabled = _ref.isCallButtonDisabled,
      isClickToDialEnabled = _ref.isClickToDialEnabled,
      isClickToTextEnabled = _ref.isClickToTextEnabled,
      formatNumber = _ref.formatNumber,
      internalSmsPermission = _ref.internalSmsPermission,
      onClickToDial = _ref.onClickToDial,
      onClickToSMS = _ref.onClickToSMS,
      outboundSmsPermission = _ref.outboundSmsPermission,
      sourceNodeRenderer = _ref.sourceNodeRenderer;
  return _react["default"].createElement("div", {
    className: _styles["default"].root
  }, _react["default"].createElement(_Profile.Profile, {
    contact: contact,
    sourceNodeRenderer: sourceNodeRenderer,
    currentLocale: currentLocale
  }), _react["default"].createElement(_CompanyInfo.CompanyInfo, {
    company: contact.company,
    currentLocale: currentLocale,
    jobTitle: contact.jobTitle
  }), _react["default"].createElement(_PhoneSection.PhoneSection, {
    contact: contact,
    currentLocale: currentLocale,
    disableLinks: disableLinks,
    isClickToDialEnabled: isClickToDialEnabled,
    isCallButtonDisabled: isCallButtonDisabled,
    isClickToTextEnabled: isClickToTextEnabled,
    formatNumber: formatNumber,
    internalSmsPermission: internalSmsPermission,
    onClickToDial: onClickToDial,
    onClickToSMS: onClickToSMS,
    outboundSmsPermission: outboundSmsPermission
  }), _react["default"].createElement(_Emails.Emails, {
    contactType: contact.type,
    currentLocale: currentLocale,
    emails: contact.emails,
    onClickMailTo: onClickMailTo
  }));
};

exports.ContactDetails = ContactDetails;
//# sourceMappingURL=ContactDetails.js.map
