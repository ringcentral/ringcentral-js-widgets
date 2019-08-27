"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.small");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _themeContext = require("../commons/themeContext");

var _icons = _interopRequireDefault(require("../commons/icons.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Checkbox(_ref) {
  var _classNames;

  var checked = _ref.checked,
      onChange = _ref.onChange,
      label = _ref.label,
      className = _ref.className,
      size = _ref.size,
      theme = _ref.theme;
  return _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].checkbox, className, (_classNames = {}, _defineProperty(_classNames, _styles["default"]["default"], size === 'default'), _defineProperty(_classNames, _styles["default"].small, size === 'small'), _defineProperty(_classNames, _styles["default"].xsmall, size === 'xsmall'), _defineProperty(_classNames, _styles["default"].checked, checked), _defineProperty(_classNames, _styles["default"]["".concat(theme.key, "-is-checked")], checked), _classNames)),
    onClick: function onClick() {
      return onChange && onChange(!checked);
    }
  }, _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].checkboxIcon, _icons["default"].msIconCheckMark)
  }), _react["default"].createElement("span", {
    className: _styles["default"].checkboxText
  }, label));
}

Checkbox.propTypes = {
  checked: _propTypes["default"].bool.isRequired,
  theme: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func,
  label: _propTypes["default"].string,
  className: _propTypes["default"].string,
  size: _propTypes["default"].string
};
Checkbox.defaultProps = {
  onChange: null,
  size: 'default',
  className: '',
  label: ''
};

var _default = (0, _themeContext.ThemeConsumer)(Checkbox);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
