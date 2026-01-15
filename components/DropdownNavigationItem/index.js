"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DropdownNavigationItem = function DropdownNavigationItem(_ref) {
  var icon = _ref.icon,
    activeIcon = _ref.activeIcon,
    active = _ref.active,
    isReverseFillIcon = _ref.isReverseFillIcon,
    label = _ref.label,
    title = _ref.title,
    noticeCounts = _ref.noticeCounts,
    onClick = _ref.onClick,
    keepStyle = _ref.keepStyle,
    dataSign = _ref.dataSign;
  var notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notice
      }, "99+");
    } else {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notice
      }, noticeCounts);
    }
  }
  var styleClass = !keepStyle ? _styles["default"].iconStyles : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    title: title || label,
    "data-sign": dataSign,
    onClick: onClick,
    className: (0, _clsx["default"])(_styles["default"].root, active && _styles["default"].active, isReverseFillIcon && _styles["default"].reverseFillIcon)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].iconHolder, styleClass)
  }, active ? activeIcon : icon), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].labelHolder
  }, label), notice);
};
DropdownNavigationItem.defaultProps = {
  active: false,
  isReverseFillIcon: false,
  label: undefined,
  title: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  keepStyle: false
};
var _default = exports["default"] = DropdownNavigationItem;
//# sourceMappingURL=index.js.map
