"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Spinner = function Spinner(_ref) {
  var className = _ref.className,
    ringWidth = _ref.ringWidth;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className),
    "data-sign": "Spinner"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].padding)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].spinner,
    style: {
      borderWidth: ringWidth
    }
  }));
};
Spinner.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  ringWidth: 8
};
var _default = Spinner;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
