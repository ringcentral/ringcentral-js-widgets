"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialer = void 0;

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _react = _interopRequireDefault(require("react"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        symbol: _icon.Deletenumber,
        "data-sign": "deleteButton",
        color: "neutral.f03",
        title: "delete",
        variant: "plain",
        size: "large"
      }))
    }
  })), /*#__PURE__*/_react["default"].createElement(_styles.DialPadWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, {
    "data-sign": "DialPad",
    sounds: _juno.RcDialerPadSounds,
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-dial-button': "".concat(v)
      };
    }
  })), children));
};

exports.Dialer = Dialer;
//# sourceMappingURL=Dialer.js.map
