"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveButton = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Button = require("../Button");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SaveButton = function SaveButton(_ref) {
  var _ref$isSaving = _ref.isSaving,
    isSaving = _ref$isSaving === void 0 ? false : _ref$isSaving,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? function () {
      //
    } : _ref$onClick,
    _ref$overlapped = _ref.overlapped,
    overlapped = _ref$overlapped === void 0 ? false : _ref$overlapped,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].buttonPanel, overlapped && _styles["default"].overlapped)
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].primaryButton, isSaving && _styles["default"].disabled),
    disabled: isSaving,
    onClick: onClick
  }, children));
};
exports.SaveButton = SaveButton;
//# sourceMappingURL=SaveButton.js.map
