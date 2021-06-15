"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPanel = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Tooltip = require("ringcentral-widgets/components/Rcui/Tooltip");

var _toolTipDelayTime = require("ringcentral-widgets/lib/toolTipDelayTime");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SettingsPanel = function SettingsPanel(_ref) {
  var _classNames;

  var onLogout = _ref.onLogout,
      currentLocale = _ref.currentLocale,
      version = _ref.version,
      agentName = _ref.agentName,
      userName = _ref.userName,
      sessionInfo = _ref.sessionInfo,
      goToSessionUpdatePage = _ref.goToSessionUpdatePage,
      disableEditSessionButton = _ref.disableEditSessionButton,
      showEditSessionIcon = _ref.showEditSessionIcon;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].settingsPanel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].name, _styles["default"].item)
  }, agentName && /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: agentName,
    enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].agentName
  }, agentName)), /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: userName,
    enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userName
  }, userName))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].info, _styles["default"].item)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].infoTitle
  }, /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('sessionInfo', currentLocale)), showEditSessionIcon && /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, _styles["default"].pointerWrap, disableEditSessionButton), _defineProperty(_classNames, _styles["default"].alignRight, true), _classNames))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "editSession",
    title: _i18n["default"].getString('edit', currentLocale),
    disabled: disableEditSessionButton,
    onClick: goToSessionUpdatePage,
    size: "small",
    symbol: _icon.Edit
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].infoWrap)
  }, sessionInfo.map(function (_ref2) {
    var value = _ref2.value,
        label = _ref2.label;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].infoItem,
      key: value
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      className: _styles["default"].label
    }, label), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "body1",
      className: _styles["default"].value
    }, value));
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].version, _styles["default"].item)
  }, _i18n["default"].getString('version', currentLocale), /*#__PURE__*/_react["default"].createElement("span", null, version)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].logout)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "logout",
    variant: "outlined",
    fullWidth: true,
    onClick: onLogout,
    size: "large"
  }, _i18n["default"].getString('logout', currentLocale))));
};

exports.SettingsPanel = SettingsPanel;
//# sourceMappingURL=SettingsPanel.js.map