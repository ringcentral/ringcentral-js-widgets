"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Switch = function Switch(props) {
  var onChange = props.onChange ? function (e) {
    return !props.disable && props.onChange(e.currentTarget.checked);
  } : undefined;
  return /*#__PURE__*/_react["default"].createElement("label", {
    title: props.title,
    "data-sign": props.dataSign,
    className: (0, _classnames["default"])(_styles["default"]["switch"], props.className, props.disable && _styles["default"].disable)
  }, /*#__PURE__*/_react["default"].createElement("input", {
    "data-sign": "switch",
    type: "checkbox",
    role: "switch",
    "aria-label": props.dataSign,
    checked: props.checked,
    onChange: onChange
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].slider
  }));
};

Switch.propTypes = {
  checked: _propTypes["default"].bool,
  disable: _propTypes["default"].bool,
  title: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  dataSign: _propTypes["default"].string,
  className: _propTypes["default"].string
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
