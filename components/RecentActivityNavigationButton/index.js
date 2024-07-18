"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _MessageTabButton = require("../MessageTabButton/MessageTabButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var NavigationButton = function NavigationButton(_ref) {
  var active = _ref.active,
    icon = _ref.icon,
    label = _ref.label,
    noticeCounts = _ref.noticeCounts,
    onClick = _ref.onClick,
    width = _ref.width;
  var notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notices
      }, "99+");
    } else {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notice
      }, noticeCounts);
    }
  }
  return /*#__PURE__*/_react["default"].createElement(_MessageTabButton.StyledTab, {
    onClick: onClick,
    className: (0, _clsx["default"])(_styles["default"].navigationButton)
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    $active: active,
    style: {
      width: width
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconHolder,
    title: label
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].icon
  }, icon), notice));
};
NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined
};
var _default = NavigationButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
