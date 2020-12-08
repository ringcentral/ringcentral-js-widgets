"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Search = _interopRequireDefault(require("../../assets/images/Search.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SearchInput = function SearchInput(_ref) {
  var dataSign = _ref.dataSign,
      className = _ref.className,
      value = _ref.value,
      maxLength = _ref.maxLength,
      placeholder = _ref.placeholder,
      disabled = _ref.disabled,
      onChange = _ref.onChange,
      onKeyUp = _ref.onKeyUp;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_Search["default"], {
    className: _styles["default"].icon
  }), /*#__PURE__*/_react["default"].createElement("input", {
    "data-sign": dataSign,
    name: "search",
    value: value,
    onChange: onChange,
    onKeyUp: onKeyUp,
    className: _styles["default"].input,
    maxLength: maxLength,
    placeholder: placeholder,
    autoComplete: "off",
    disabled: disabled
  }));
};

exports.SearchInput = SearchInput;
SearchInput.defaultProps = {
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
  dataSign: ''
};
//# sourceMappingURL=SearchInput.js.map
