"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NavigationButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Tooltip = require("../Rcui/Tooltip");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var NavigationButton = function NavigationButton(_ref) {
  var active = _ref.active,
    activeIcon = _ref.activeIcon,
    icon = _ref.icon,
    label = _ref.label,
    noticeCounts = _ref.noticeCounts,
    onClick = _ref.onClick,
    width = _ref.width,
    height = _ref.height,
    keepStyle = _ref.keepStyle,
    className = _ref.className,
    activeClassName = _ref.activeClassName,
    inActiveClassName = _ref.inActiveClassName,
    id = _ref.id,
    tooltipForceHide = _ref.tooltipForceHide,
    dataSign = _ref.dataSign;
  var notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notices,
        "data-sign": "navigationNoticeCount"
      }, "99+");
    } else {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notice,
        "data-sign": "navigationNoticeCount"
      }, noticeCounts);
    }
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    onClick: onClick,
    className: (0, _classnames["default"])(_styles["default"].navigationButton, active && _styles["default"].active),
    style: {
      width: width,
      height: height
    },
    id: id
  }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: label,
    tooltipForceHide: tooltipForceHide
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconHolder,
    "data-sign": dataSign !== null && dataSign !== void 0 ? dataSign : label
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].icon, !keepStyle ? _styles["default"].iconStyles : null, className, active ? activeClassName : inActiveClassName)
  }, active ? activeIcon : icon), notice)));
};
exports.NavigationButton = NavigationButton;
NavigationButton.defaultProps = {
  active: false,
  keepStyle: false
};
var _default = NavigationButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
