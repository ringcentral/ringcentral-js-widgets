"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogInfo = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var LogInfo = exports.LogInfo = function LogInfo(_ref) {
  var logged = _ref.logged,
    delaySavingState = _ref.delaySavingState,
    DelayComponent = _ref.DelayComponent;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-1 items-center"
  }, delaySavingState && DelayComponent ? /*#__PURE__*/_react["default"].createElement(DelayComponent, {
    startTime: delaySavingState.delayUpdatingStartTime,
    durationMinutes: delaySavingState.delayUpdatingMinutes
  }) : logged ? /*#__PURE__*/_react["default"].createElement(_springUi.Tag, {
    "data-sign": "loggedCall",
    color: "success",
    variant: "inverted"
  }, t('logged')) : /*#__PURE__*/_react["default"].createElement(_springUi.Tag, {
    "data-sign": "unloggedCall",
    color: "neutral",
    variant: "inverted"
  }, t('unlogged')));
};
//# sourceMappingURL=LogInfo.js.map
