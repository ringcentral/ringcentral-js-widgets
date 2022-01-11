"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialer = void 0;

var _react = _interopRequireDefault(require("react"));

var _DialDelete = require("@ringcentral/juno/es6/components/Dialer/DialDelete/DialDelete.js");

var _Dialer = require("@ringcentral/juno/es6/components/Dialer/Dialer.js");

var _DialTextField = require("@ringcentral/juno/es6/components/Dialer/DialTextField/DialTextField.js");

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _Deletenumber = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Deletenumber.js"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Dialer = function Dialer(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue,
      children = _ref.children,
      placeholder = _ref.placeholder;
  var isHaveValue = value.length > 0;
  return /*#__PURE__*/_react["default"].createElement(_Dialer.RcDialer, null, /*#__PURE__*/_react["default"].createElement(_styles.DialerWrapper, null, /*#__PURE__*/_react["default"].createElement(_styles.TextFieldWrapper, {
    isHaveValue: isHaveValue
  }, /*#__PURE__*/_react["default"].createElement(_DialTextField.RcDialTextField, {
    "data-sign": "numberField",
    value: value,
    textVariant: "subheading1",
    align: "center",
    placeholder: placeholder,
    fullWidth: true,
    onlyAllowKeypadValue: true,
    onChange: setValue,
    InputProps: {
      endAdornment: value.length > 0 && /*#__PURE__*/_react["default"].createElement(_DialDelete.RcDialDelete, null, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
        symbol: _Deletenumber["default"],
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
