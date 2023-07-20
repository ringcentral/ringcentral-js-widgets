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
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");
var _toolTipDelayTime = require("@ringcentral-integration/widgets/lib/toolTipDelayTime");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
    symbol: _junoIcon.Edit
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
