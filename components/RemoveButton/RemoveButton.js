"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RemoveIcon = _interopRequireDefault(require("../../assets/images/RemoveIcon.svg"));

var _DeleteCircle = _interopRequireDefault(require("../../assets/images/DeleteCircle.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RemoveButton = function RemoveButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      visibility = _ref.visibility,
      _ref$showWarningIcon = _ref.showWarningIcon,
      showWarningIcon = _ref$showWarningIcon === void 0 ? false : _ref$showWarningIcon;
  return /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "removeBtn",
    className: (0, _classnames["default"])(_styles["default"].container, className, !visibility && _styles["default"].hideRemoveButton),
    onClick: visibility ? onClick : null
  }, showWarningIcon ? /*#__PURE__*/_react["default"].createElement(_DeleteCircle["default"], {
    className: _styles["default"].deleteIcon
  }) : /*#__PURE__*/_react["default"].createElement(_RemoveIcon["default"], {
    className: _styles["default"].icon
  }));
};

exports.RemoveButton = RemoveButton;
RemoveButton.defaultProps = {
  className: null,
  visibility: true
};
//# sourceMappingURL=RemoveButton.js.map
