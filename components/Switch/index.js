"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Switch = function Switch(props) {
  var onChange = props.onChange ?
  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
  function (e) {
    return !props.disable && props.onChange(e.currentTarget.checked);
  } : undefined;
  return /*#__PURE__*/_react["default"].createElement("label", {
    title: props.title,
    "data-sign": props.dataSign,
    className: (0, _clsx["default"])(_styles["default"]["switch"], props.className, props.disable && _styles["default"].disable),
    htmlFor: props.dataSign
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: props.dataSign,
    "data-sign": "switch",
    type: "checkbox",
    role: "switch",
    disabled: props.disable,
    "aria-label": props.dataSign,
    checked: props.checked,
    onChange: onChange
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].slider
  }));
};
Switch.defaultProps = {
  checked: false,
  disable: false,
  onChange: undefined,
  title: undefined,
  dataSign: undefined,
  className: undefined
};
var _default = Switch;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
