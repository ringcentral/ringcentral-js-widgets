"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsView = void 0;

var _react = _interopRequireDefault(require("react"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _ContactDetails = require("../ContactDetails");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContactDetailsView = function ContactDetailsView(_ref) {
  var children = _ref.children,
      contact = _ref.contact,
      currentLocale = _ref.currentLocale,
      isClickToDialEnabled = _ref.isClickToDialEnabled,
      isCallButtonDisabled = _ref.isCallButtonDisabled,
      isClickToTextEnabled = _ref.isClickToTextEnabled,
      disableLinks = _ref.disableLinks,
      formatNumber = _ref.formatNumber,
      internalSmsPermission = _ref.internalSmsPermission,
      onBackClick = _ref.onBackClick,
      onClickMailTo = _ref.onClickMailTo,
      onClickToDial = _ref.onClickToDial,
      onClickToSMS = _ref.onClickToSMS,
      outboundSmsPermission = _ref.outboundSmsPermission,
      showSpinner = _ref.showSpinner,
      sourceNodeRenderer = _ref.sourceNodeRenderer;
  if (!contact) return null;
  var content = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : _react["default"].createElement(_ContactDetails.ContactDetails, {
    currentLocale: currentLocale,
    contact: contact,
    onClickToSMS: onClickToSMS,
    onClickToDial: onClickToDial,
    isClickToDialEnabled: isClickToDialEnabled,
    isCallButtonDisabled: isCallButtonDisabled,
    isClickToTextEnabled: isClickToTextEnabled,
    disableLinks: disableLinks,
    onClickMailTo: onClickMailTo,
    formatNumber: formatNumber,
    sourceNodeRenderer: sourceNodeRenderer,
    outboundSmsPermission: outboundSmsPermission,
    internalSmsPermission: internalSmsPermission
  });
  return _react["default"].createElement("div", {
    className: _styles["default"].root
  }, _react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackClick,
    className: _styles["default"].header
  }, _i18n["default"].getString('contactDetails', currentLocale)), _react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, content, children));
};

exports.ContactDetailsView = ContactDetailsView;
//# sourceMappingURL=ContactDetailsView.js.map
