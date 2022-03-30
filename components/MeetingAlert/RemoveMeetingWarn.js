"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveMeetingWarn = void 0;

var _react = _interopRequireDefault(require("react"));

var _Alert = require("@ringcentral/juno/es6/components/Alert/Alert.js");

var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RemoveMeetingWarn = function RemoveMeetingWarn(_ref) {
  var currentLocale = _ref.currentLocale,
      brandConfig = _ref.brandConfig;

  var app = /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
    variant: "inherit",
    "data-sign": "removeMeetingWarningLink",
    className: _styles["default"].underline,
    target: "_blank",
    color: "warning.f02",
    href: brandConfig.alternativeLink
  }, brandConfig.substituteName);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].expandWrapper,
    "data-sign": "removeMeetingWarning"
  }, /*#__PURE__*/_react["default"].createElement(_Alert.RcAlert, {
    severity: "warning",
    className: _styles["default"].expandAlert
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString('removeMeetingWarning', currentLocale),
    values: {
      app: app
    }
  })));
};

exports.RemoveMeetingWarn = RemoveMeetingWarn;
//# sourceMappingURL=RemoveMeetingWarn.js.map
