"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPanel = void 0;
var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");
var _toolTipDelayTime = require("@ringcentral-integration/widgets/lib/toolTipDelayTime");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SettingsPanel = function SettingsPanel(_ref) {
  var _clsx;
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
    className: (0, _clsx2["default"])(_styles["default"].name, _styles["default"].item)
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
    className: (0, _clsx2["default"])(_styles["default"].info, _styles["default"].item)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].infoTitle
  }, /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('sessionInfo', currentLocale)), showEditSessionIcon && /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _clsx2["default"])((_clsx = {}, _defineProperty(_clsx, _styles["default"].pointerWrap, disableEditSessionButton), _defineProperty(_clsx, _styles["default"].alignRight, true), _clsx))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "editSession",
    title: _i18n["default"].getString('edit', currentLocale),
    disabled: disableEditSessionButton,
    onClick: goToSessionUpdatePage,
    size: "small",
    symbol: _junoIcon.Edit
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])(_styles["default"].infoWrap)
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
    className: (0, _clsx2["default"])(_styles["default"].version, _styles["default"].item)
  }, _i18n["default"].getString('version', currentLocale), /*#__PURE__*/_react["default"].createElement("span", null, version)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])(_styles["default"].logout)
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
