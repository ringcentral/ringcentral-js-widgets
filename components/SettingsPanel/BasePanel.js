"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePanel = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Header = require("../Header");
var _Panel = _interopRequireDefault(require("../Panel"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _Footer = require("./Footer");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BasePanel = exports.BasePanel = function BasePanel(_ref) {
  var currentLocale = _ref.currentLocale,
    className = _ref.className,
    showSpinner = _ref.showSpinner,
    showHeader = _ref.showHeader,
    children = _ref.children,
    loginNumber = _ref.loginNumber,
    onLogoutButtonClick = _ref.onLogoutButtonClick,
    eulaLabel = _ref.eulaLabel,
    eulaLink = _ref.eulaLink,
    onEulaLinkClick = _ref.onEulaLinkClick,
    version = _ref.version,
    versionContainer = _ref.versionContainer,
    privacyNoticeLabel = _ref.privacyNoticeLabel,
    privacyNoticeLink = _ref.privacyNoticeLink;
  if (showSpinner) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, showHeader ? /*#__PURE__*/_react["default"].createElement(_Header.Header, null, _i18n["default"].getString('settings', currentLocale)) : null, /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: (0, _clsx["default"])(_styles["default"].content, showHeader && _styles["default"].contentWithHeader)
  }, children, /*#__PURE__*/_react["default"].createElement(_Footer.Footer, {
    loginNumber: loginNumber,
    currentLocale: currentLocale,
    eulaLabel: eulaLabel,
    eulaLink: eulaLink,
    onEulaLinkClick: onEulaLinkClick,
    privacyNoticeLabel: privacyNoticeLabel,
    privacyNoticeLink: privacyNoticeLink,
    onLogoutButtonClick: onLogoutButtonClick,
    version: version,
    versionContainer: versionContainer
  })));
};
//# sourceMappingURL=BasePanel.js.map
