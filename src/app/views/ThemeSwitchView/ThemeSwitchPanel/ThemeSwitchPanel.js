"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSwitchPanel = void 0;
exports.formatCountryDisplay = formatCountryDisplay;
require("core-js/modules/es.array.concat.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _react = _interopRequireDefault(require("react"));
var _Section = require("../../../components/Section");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function formatCountryDisplay(callingCode, countryName) {
  return "(+".concat(callingCode, ") ").concat(countryName);
}
var ThemeSwitchPanel = exports.ThemeSwitchPanel = function ThemeSwitchPanel(_ref) {
  var themeId = _ref.themeId,
    onThemeIdChange = _ref.onThemeIdChange,
    themeType = _ref.themeType,
    themeTypeOptions = _ref.themeTypeOptions,
    onThemeTypeChange = _ref.onThemeTypeChange,
    themeMap = _ref.themeMap,
    onBack = _ref.onBack,
    prefersReducedMotion = _ref.prefersReducedMotion,
    onPrefersReducedMotionChange = _ref.onPrefersReducedMotionChange,
    reducedMotionOptions = _ref.reducedMotionOptions;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onBack
  }, t('theme'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-auto overflow-y-auto overflow-x-hidden px-4 py-2 space-y-5"
  }, /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: t('colorThemes')
  }, /*#__PURE__*/_react["default"].createElement(_components2.SelectLine, {
    value: themeType,
    onChange: onThemeTypeChange,
    options: themeTypeOptions,
    border: true
  }, t('label')), /*#__PURE__*/_react["default"].createElement(_components2.Line, {
    divider: false,
    className: "-mt-2"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-neutral-b2 typography-descriptorMini"
  }, t('description')))), /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: t('accessibility')
  }, /*#__PURE__*/_react["default"].createElement(_components2.SelectLine, {
    value: prefersReducedMotion,
    onChange: onPrefersReducedMotionChange,
    options: reducedMotionOptions,
    border: true
  }, t('reduceMotion')), /*#__PURE__*/_react["default"].createElement(_components2.Line, {
    divider: false,
    className: "-mt-2"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-neutral-b2 typography-descriptorMini"
  }, t('reduceMotionDescription'))))), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
//# sourceMappingURL=ThemeSwitchPanel.js.map
