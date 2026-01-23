"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveMeetingWarn = void 0;
require("core-js/modules/es.array.concat.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = require("../FormattedMessage");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RemoveMeetingWarn = exports.RemoveMeetingWarn = function RemoveMeetingWarn(_ref) {
  var brandConfig = _ref.brandConfig,
    _ref$hasRemoved = _ref.hasRemoved,
    hasRemoved = _ref$hasRemoved === void 0 ? false : _ref$hasRemoved;
  var app = /*#__PURE__*/_react["default"].createElement(_springUi.Link, {
    "data-sign": "removeMeetingWarningLink",
    className: (0, _clsx["default"])(_styles["default"].underline, _styles["default"].textInherit),
    target: "_blank",
    color: "warning.f02",
    href: "".concat(brandConfig.alternativeLink).concat(brandConfig.id),
    key: brandConfig.id
  }, brandConfig.substituteName);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].expandWrapper,
    "data-sign": "removeMeetingWarning"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Alert, {
    severity: "warning",
    className: _styles["default"].expandAlert
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage.FormattedMessage, {
    message: t('scheduleMeetingTips'),
    values: {
      app: app
    }
  })));
};
//# sourceMappingURL=RemoveMeetingWarn.js.map
