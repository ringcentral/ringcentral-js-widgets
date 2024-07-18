"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Button = require("../Button");
var _Spinner = _interopRequireDefault(require("../Spinner"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var LogButton = function LogButton(_ref) {
  var className = _ref.className,
    onLog = _ref.onLog,
    isLogged = _ref.isLogged,
    disableLinks = _ref.disableLinks,
    isLogging = _ref.isLogging,
    addTitle = _ref.addTitle,
    editTitle = _ref.editTitle;
  var spinner = isLogging ? /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
    ringWidth: 2,
    className: _styles["default"].spinner
  }) : null;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].log, className),
    onClick: onLog,
    disabled: disableLinks || isLogging
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: isLogged ? _DynamicsFont["default"].edit : _DynamicsFont["default"].callLog,
    title: isLogged ? editTitle : addTitle
  }), spinner);
};
LogButton.defaultProps = {
  className: undefined,
  onLog: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false,
  addTitle: undefined,
  editTitle: undefined
};
var _default = LogButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
