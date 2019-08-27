"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _themeContext = require("../commons/themeContext");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Title(props) {
  var label = props.label,
      subLabel = props.subLabel,
      theme = props.theme,
      className = props.className;
  var titleCls = (0, _classnames2["default"])(_styles["default"].title, _defineProperty({}, _styles["default"].isOld, theme.isOldUI), className);
  return _react["default"].createElement("div", {
    className: titleCls
  }, label, subLabel && _react["default"].createElement("span", {
    className: _styles["default"].subLabel
  }, "\xA0", subLabel));
}

Title.propTypes = {
  label: _propTypes["default"].string.isRequired,
  subLabel: _propTypes["default"].string,
  theme: _propTypes["default"].object.isRequired,
  className: _propTypes["default"].string
};
Title.defaultProps = {
  subLabel: null,
  className: ''
};

var _default = (0, _themeContext.ThemeConsumer)(Title);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
