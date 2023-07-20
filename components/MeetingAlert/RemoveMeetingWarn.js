"use strict";

require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveMeetingWarn = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RemoveMeetingWarn = function RemoveMeetingWarn(_ref) {
  var currentLocale = _ref.currentLocale,
    brandConfig = _ref.brandConfig,
    _ref$hasRemoved = _ref.hasRemoved,
    hasRemoved = _ref$hasRemoved === void 0 ? false : _ref$hasRemoved;
  var app = /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    variant: "inherit",
    "data-sign": "removeMeetingWarningLink",
    className: _styles["default"].underline,
    target: "_blank",
    color: "warning.f02",
    href: "".concat(brandConfig.alternativeLink).concat(brandConfig.id),
    key: brandConfig.id
  }, brandConfig.substituteName);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].expandWrapper,
    "data-sign": "removeMeetingWarning"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
    severity: "warning",
    className: _styles["default"].expandAlert
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString(hasRemoved ? 'scheduleMeetingTips' : 'removeMeetingWarning', currentLocale),
    values: {
      // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
      app: app
    }
  })));
};
exports.RemoveMeetingWarn = RemoveMeetingWarn;
//# sourceMappingURL=RemoveMeetingWarn.js.map
