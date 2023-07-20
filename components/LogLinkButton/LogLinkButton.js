"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("@ringcentral-integration/utils");
var _loglink = _interopRequireDefault(require("./assets/loglink.svg"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var LogLinkButton = function LogLinkButton(_ref) {
  var crmName = _ref.crmName,
    onClick = _ref.onClick,
    disabled = _ref.disabled;
  var onClickFunc = function onClickFunc(e) {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onClick();
  };
  var toolTip = (0, _utils.format)(_i18n["default"].getString('toolTip'), {
    crmName: crmName
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].logLink, disabled ? _styles["default"].disabled : null),
    onClick: onClickFunc,
    title: toolTip,
    "data-sign": "ViewLogBtn"
  }, /*#__PURE__*/_react["default"].createElement(_loglink["default"], null));
};
LogLinkButton.defaultProps = {
  crmName: '',
  onClick: function onClick() {},
  disabled: true
};
var _default = LogLinkButton;
exports["default"] = _default;
//# sourceMappingURL=LogLinkButton.js.map
