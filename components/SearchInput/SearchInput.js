"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchInput = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Search = _interopRequireDefault(require("../../assets/images/Search.svg"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_Search["default"], {
    "data-sign": "searchIcon",
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
  dataSign: ''
};
//# sourceMappingURL=SearchInput.js.map
