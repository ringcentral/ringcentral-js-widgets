"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialer = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Dialer = function Dialer(_ref) {
  var value = _ref.value,
    setValue = _ref.setValue,
    children = _ref.children,
    placeholder = _ref.placeholder;
  var isHaveValue = value.length > 0;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcDialer, null, /*#__PURE__*/_react["default"].createElement(_styles.DialerWrapper, null, /*#__PURE__*/_react["default"].createElement(_styles.TextFieldWrapper, {
    isHaveValue: isHaveValue
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcDialTextField, {
    "data-sign": "numberField",
    value: value,
    textVariant: "subheading1",
    align: "center",
    placeholder: placeholder,
    fullWidth: true,
    onlyAllowKeypadValue: true,
    onChange: setValue,
    InputProps: {
      endAdornment: value.length > 0 && /*#__PURE__*/_react["default"].createElement(_juno.RcDialDelete, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        symbol: _junoIcon.Deletenumber,
        "data-sign": "deleteButton",
        color: "neutral.f03",
        title: "delete",
        variant: "plain",
        size: "large"
      }))
    }
  })), children));
};
exports.Dialer = Dialer;
//# sourceMappingURL=Dialer.js.map
