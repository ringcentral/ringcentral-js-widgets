"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionUpdatePanel = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _BasicSessionPanel = require("../BasicSessionPanel");
var _SelectList = require("../SelectList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var SessionUpdatePanel = function SessionUpdatePanel(_ref) {
  var currentLocale = _ref.currentLocale,
    goToSettingsPageWhetherSessionChanged = _ref.goToSettingsPageWhetherSessionChanged,
    onSaveUpdate = _ref.onSaveUpdate,
    rest = _objectWithoutProperties(_ref, ["currentLocale", "goToSettingsPageWhetherSessionChanged", "onSaveUpdate"]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_SelectList.BackHeader, {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('editSession', currentLocale),
    onBackClick: goToSettingsPageWhetherSessionChanged
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_BasicSessionPanel.BasicSessionPanel, _extends({}, rest, {
    currentLocale: currentLocale,
    classes: {
      root: _styles["default"].basicSessionPanel
    }
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "saveUpdate",
    fullWidth: true,
    size: "medium",
    onClick: onSaveUpdate,
    classes: {
      root: _styles["default"].saveUpdateButton
    }
  }, _i18n["default"].getString('saveUpdate', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "cancel",
    fullWidth: true,
    size: "medium",
    onClick: goToSettingsPageWhetherSessionChanged,
    variant: "outlined"
  }, _i18n["default"].getString('cancel', currentLocale))));
};
exports.SessionUpdatePanel = SessionUpdatePanel;
//# sourceMappingURL=SessionUpdatePanel.js.map
