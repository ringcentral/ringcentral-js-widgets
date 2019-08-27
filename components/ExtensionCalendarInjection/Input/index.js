"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _themeContext = require("../commons/themeContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Input(_ref) {
  var _classnames2;

  var theme = _ref.theme,
      dataSign = _ref.dataSign,
      onChange = _ref.onChange,
      value = _ref.value,
      disabled = _ref.disabled,
      errorMessage = _ref.errorMessage,
      isError = _ref.isError,
      className = _ref.className,
      placeholder = _ref.placeholder;

  if (disabled) {
    return _react["default"].createElement("div", {
      className: (0, _classnames3["default"])(_styles["default"].disabled, className, _defineProperty({}, _styles["default"].isOld, theme.isOldUI))
    }, value || placeholder);
  }

  return _react["default"].createElement("div", {
    className: (0, _classnames3["default"])(className, (_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].error, isError), _defineProperty(_classnames2, _styles["default"].isOld, theme.isOldUI), _classnames2))
  }, _react["default"].createElement("input", {
    placeholder: placeholder,
    type: "text",
    className: (0, _classnames3["default"])(_styles["default"].textField, theme.UI && _styles["default"][theme.UI]),
    value: value,
    onChange: onChange,
    "data-sign": dataSign
  }), isError && _react["default"].createElement("div", {
    className: _styles["default"].message
  }, errorMessage));
}

Input.propTypes = {
  isError: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  theme: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func,
  errorMessage: _propTypes["default"].string,
  className: _propTypes["default"].string,
  dataSign: _propTypes["default"].string,
  value: _propTypes["default"].string,
  placeholder: _propTypes["default"].string
};
Input.defaultProps = {
  isError: false,
  disabled: false,
  onChange: null,
  value: null,
  dataSign: '',
  className: '',
  errorMessage: '',
  placeholder: ''
};

var _default = (0, _themeContext.ThemeConsumer)(Input);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
