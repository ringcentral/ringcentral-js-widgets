"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SpinnerOverlay = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SpinnerOverlay = function SpinnerOverlay(_ref) {
  var className = _ref.className,
      SpinnerComponent = _ref.custom,
      classes = _ref.classes;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "spinnerOverlay",
    className: (0, _classnames["default"])(_styles["default"].root, className, classes.root)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].mask, classes.mask)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].container, classes.container)
  }, /*#__PURE__*/_react["default"].createElement(SpinnerComponent, null)));
};

exports.SpinnerOverlay = SpinnerOverlay;
var _default = SpinnerOverlay;
exports["default"] = _default;
SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: _Spinner["default"],
  classes: {}
};
//# sourceMappingURL=SpinnerOverlay.js.map
