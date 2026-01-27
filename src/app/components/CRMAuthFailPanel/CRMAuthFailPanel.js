"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRMAuthFailPanel = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CRMAuthFailPanel = exports.CRMAuthFailPanel = function CRMAuthFailPanel(_ref) {
  var onSignOut = _ref.onSignOut,
    onTryAgain = _ref.onTryAgain,
    tryAgainAfterSeconds = _ref.tryAgainAfterSeconds;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full h-full pt-[179px]"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    className: "text-danger",
    size: "xxlarge",
    symbol: _springIcon.AlertMd
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-mainText text-center text-neutral-b0 mt-6"
  }, t('canNotAuthenticate')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-mainText text-center text-neutral-b0"
  }, tryAgainAfterSeconds ? t('tryAgainLater', {
    seconds: tryAgainAfterSeconds
  }) : t('tryAgainNow'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed w-full flex flex-col bottom-0 p-4"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "contained",
    onClick: onTryAgain,
    size: "large",
    disabled: !!tryAgainAfterSeconds,
    "data-sign": "tryAgain",
    fullWidth: true
  }, t('tryBtn')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "outlined",
    onClick: onSignOut,
    size: "large",
    "data-sign": "signOut",
    fullWidth: true,
    className: "mt-4"
  }, t('signOut'))));
};
//# sourceMappingURL=CRMAuthFailPanel.js.map
