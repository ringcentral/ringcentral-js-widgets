"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoNotCallIndicator = void 0;

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _Tooltip = require("../Rcui/Tooltip");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DoNotCallIndicator = function DoNotCallIndicator(_ref) {
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
    symbol: _icon.Blocked,
    size: "xsmall"
  })));
};

exports.DoNotCallIndicator = DoNotCallIndicator;
DoNotCallIndicator.defaultProps = {
  doNotCall: false
};
//# sourceMappingURL=DoNotCallIndicator.js.map
