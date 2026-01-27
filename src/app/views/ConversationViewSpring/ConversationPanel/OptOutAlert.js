"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptOutAlert = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _i18n = _interopRequireDefault(require("@ringcentral-integration/micro-phone/src/app/hooks/useContactRenderInfo/i18n"));
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var OptOutAlert = exports.OptOutAlert = function OptOutAlert() {
  var _useLocale = (0, _hooks.useLocale)(_i18n2["default"], _i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1"
  }, t('optOutAlert'), /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: t('optOutAlertTooltip')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.InfoMd,
    size: "small"
  })));
};
//# sourceMappingURL=OptOutAlert.js.map
