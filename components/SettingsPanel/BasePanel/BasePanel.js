"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Panel = _interopRequireDefault(require("../../Panel"));

var _SpinnerOverlay = _interopRequireDefault(require("../../SpinnerOverlay"));

var _Eula = _interopRequireDefault(require("../../Eula"));

var _Footer = require("../SettingItems/Footer");

var _Header = require("../SettingItems/Header");

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BasePanel = function BasePanel(_ref) {
  var currentLocale = _ref.currentLocale,
      className = _ref.className,
      showSpinner = _ref.showSpinner,
      showHeader = _ref.showHeader,
      children = _ref.children,
      brandId = _ref.brandId,
      loginNumber = _ref.loginNumber,
      onLogoutButtonClick = _ref.onLogoutButtonClick,
      EulaRenderer = _ref.EulaRenderer,
      version = _ref.version,
      versionContainer = _ref.versionContainer;

  if (showSpinner) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay["default"], null);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_Header.Header, {
    showHeader: showHeader,
    currentLocale: currentLocale
  }), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: (0, _classnames["default"])(_styles["default"].content, showHeader && _styles["default"].contentWithHeader)
  }, children, /*#__PURE__*/_react["default"].createElement(_Footer.Footer, {
    brandId: brandId,
    loginNumber: loginNumber,
    currentLocale: currentLocale,
    onLogoutButtonClick: onLogoutButtonClick,
    EulaRenderer: EulaRenderer,
    version: version,
    versionContainer: versionContainer
  })));
};

BasePanel.defaultProps = {
  className: null,
  showSpinner: false,
  showHeader: false,
  children: null,
  EulaRenderer: _Eula["default"]
};
var _default = BasePanel;
exports["default"] = _default;
//# sourceMappingURL=BasePanel.js.map
