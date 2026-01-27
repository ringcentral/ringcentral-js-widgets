"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalMeetingSettingsSwitch = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PersonalMeetingSettingsSwitch = exports.PersonalMeetingSettingsSwitch = function PersonalMeetingSettingsSwitch(_ref) {
  var isPersonalMeetingEnabled = _ref.isPersonalMeetingEnabled,
    personalMeetingLink = _ref.personalMeetingLink,
    disabled = _ref.disabled,
    onPersonalMeetingToggle = _ref.onPersonalMeetingToggle,
    viewPersonalMeetingSettings = _ref.viewPersonalMeetingSettings;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    bordered: true,
    borderRadius: "small",
    padding: true,
    className: "w-full mx-auto",
    classes: {
      root: 'overflow-visible'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-subtitleMini text-neutral-b1"
  }, t('usePersonalMeetingLink')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1 break-all"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptor text-neutral-b2 mt-1"
  }, personalMeetingLink))), isPersonalMeetingEnabled && /*#__PURE__*/_react["default"].createElement(_springUi.Link, {
    onClick: viewPersonalMeetingSettings,
    "data-sign": "editPersonalMeetingSettings"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptorMini"
  }, t('editSettings'))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Switch, {
    checked: isPersonalMeetingEnabled,
    onChange: function onChange(e) {
      return onPersonalMeetingToggle(e.target.checked);
    },
    disabled: disabled,
    "data-sign": "usePersonalMeetingId"
  })))));
};
//# sourceMappingURL=PersonalMeetingSettingsSwitch.js.map
