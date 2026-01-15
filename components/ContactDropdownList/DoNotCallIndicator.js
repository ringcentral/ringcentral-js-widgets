"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoNotCallIndicator = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _Tooltip = require("../Rcui/Tooltip");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * @deprecated please use ringcentral-js-widgets/ringcentral-widgets/components/ContactSearchPanel/DoNotCallIndicator.tsx
 */
var DoNotCallIndicator = exports.DoNotCallIndicator = function DoNotCallIndicator(_ref) {
  var doNotCall = _ref.doNotCall,
    currentLocale = _ref.currentLocale;
  if (!doNotCall) return null;
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: _i18n["default"].getString('doNotCall', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].doNotCall,
    "data-sign": "doNotCall"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    color: "neutral.f04",
    symbol: _junoIcon.Blocked,
    size: "xsmall"
  })));
};
DoNotCallIndicator.defaultProps = {
  doNotCall: false
};
//# sourceMappingURL=DoNotCallIndicator.js.map
