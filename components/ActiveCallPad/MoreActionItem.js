"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MoreActionItem = function MoreActionItem(_ref) {
  var title = _ref.title,
    Icon = _ref.icon,
    disabled = _ref.disabled,
    onClick = _ref.onClick,
    dataSign = _ref.dataSign;
  var iconClassName = (0, _clsx["default"])(_styles["default"].buttonIcon, disabled ? _styles["default"].buttonDisabled : _styles["default"].buttonActive);
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
    _react["default"].createElement("div", {
      className: _styles["default"].buttonItem,
      onClick: disabled ? null : onClick
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: iconClassName,
      "data-sign": dataSign
    }, /*#__PURE__*/_react["default"].createElement(Icon, null)), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].buttonName
    }, title))
  );
};
MoreActionItem.defaultProps = {
  dataSign: ''
};
var _default = MoreActionItem;
exports["default"] = _default;
//# sourceMappingURL=MoreActionItem.js.map
