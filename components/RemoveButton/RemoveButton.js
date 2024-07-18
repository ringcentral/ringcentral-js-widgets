"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveButton = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DeleteCircle = _interopRequireDefault(require("../../assets/images/DeleteCircle.svg"));
var _RemoveIcon = _interopRequireDefault(require("../../assets/images/RemoveIcon.svg"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RemoveButton = function RemoveButton(_ref) {
  var className = _ref.className,
    onClick = _ref.onClick,
    visibility = _ref.visibility,
    _ref$showWarningIcon = _ref.showWarningIcon,
    showWarningIcon = _ref$showWarningIcon === void 0 ? false : _ref$showWarningIcon;
  return /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "removeBtn",
    className: (0, _clsx["default"])(_styles["default"].container, className, !visibility && _styles["default"].hideRemoveButton)
    // @ts-expect-error TS(2322): Type '((ev: MouseEvent<Element, MouseEvent>) => vo... Remove this comment to see the full error message
    ,
    onClick: visibility ? onClick : null
  }, showWarningIcon ? /*#__PURE__*/_react["default"].createElement(_DeleteCircle["default"], {
    className: _styles["default"].deleteIcon
  }) : /*#__PURE__*/_react["default"].createElement(_RemoveIcon["default"], {
    className: _styles["default"].icon
  }));
};
exports.RemoveButton = RemoveButton;
RemoveButton.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  visibility: true
};
//# sourceMappingURL=RemoveButton.js.map
