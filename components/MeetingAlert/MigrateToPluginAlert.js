"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MigrateToPluginAlert = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MigrateToPluginAlert = function MigrateToPluginAlert(_ref) {
  var substituteName = _ref.substituteName,
    currentLocale = _ref.currentLocale,
    onCloseAlert = _ref.onCloseAlert;
  var app = /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    variant: "inherit",
    "data-sign": "substituteLink",
    target: "_blank",
    href: "https://www.ringcentral.com/apps/microsoft-outlook"
  }, substituteName);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].wrapper,
    "data-sign": "outlook-outdated-alert"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
    severity: "warning",
    className: _styles["default"].alert,
    icon: true
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    display: "flex",
    justifyContent: "flex-start"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    flex: 1,
    mt: 2
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString('migrateToPluginAlert', currentLocale),
    values: {
      app: app
    }
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    symbol: _junoIcon.Close,
    onClick: onCloseAlert
  }))));
};
exports.MigrateToPluginAlert = MigrateToPluginAlert;
//# sourceMappingURL=MigrateToPluginAlert.js.map
