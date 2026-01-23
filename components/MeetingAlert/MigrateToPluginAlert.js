"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MigrateToPluginAlert = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = require("../FormattedMessage");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MigrateToPluginAlert = exports.MigrateToPluginAlert = function MigrateToPluginAlert(_ref) {
  var substituteName = _ref.substituteName,
    currentLocale = _ref.currentLocale,
    onCloseAlert = _ref.onCloseAlert;
  var app = /*#__PURE__*/_react["default"].createElement(_springUi.Link, {
    className: "text-inherit",
    "data-sign": "substituteLink",
    target: "_blank",
    href: "https://www.ringcentral.com/apps/microsoft-outlook"
  }, substituteName);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].wrapper,
    "data-sign": "outlook-outdated-alert"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Alert, {
    severity: "warning",
    className: _styles["default"].alert,
    icon: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-start"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 mt-3"
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage.FormattedMessage, {
    message: t('migrateToPluginAlert'),
    values: {
      app: app
    }
  })), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.Xmd,
    onClick: onCloseAlert
  }))));
};
//# sourceMappingURL=MigrateToPluginAlert.js.map
