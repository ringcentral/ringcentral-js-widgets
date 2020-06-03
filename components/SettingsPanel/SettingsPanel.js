"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPanel = void 0;

var _rcui = require("@ringcentral-integration/rcui");

var _iconLogout = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-Logout.svg"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var containerClass = (0, _classnames["default"])(_styles["default"].offhookStatusContainer, _styles["default"].item);
var versionClass = (0, _classnames["default"])(_styles["default"].version, _styles["default"].item);

var SettingsPanel = function SettingsPanel(_ref) {
  var onLogout = _ref.onLogout,
      currentLocale = _ref.currentLocale,
      isOffHookDisable = _ref.isOffHookDisable,
      offhookState = _ref.offhookState,
      version = _ref.version,
      offhook = _ref.offhook,
      isOffhooking = _ref.isOffhooking;

  var offhookStatusText = _i18n["default"].getString('offhookStatus', currentLocale);

  var logoutText = _i18n["default"].getString('logout', currentLocale);

  var offhookStateText = _i18n["default"].getString(offhookState, currentLocale);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].settingsPanel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcList, null, /*#__PURE__*/_react["default"].createElement(_rcui.RcListItem, {
    title: logoutText,
    size: "small",
    button: true,
    classes: {
      root: _styles["default"].settingItem
    },
    onClick: onLogout
  }, logoutText, /*#__PURE__*/_react["default"].createElement(_rcui.RcIcon, {
    size: "small",
    className: _styles["default"].logoutIcon,
    symbol: _iconLogout["default"]
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: versionClass
  }, _i18n["default"].getString('version', currentLocale), " ", version));
};

exports.SettingsPanel = SettingsPanel;
//# sourceMappingURL=SettingsPanel.js.map
