"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListTextField = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _CustomArrowButton = require("../../../../Rcui/CustomArrowButton");

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SelectListTextField = function SelectListTextField(_ref) {
  var value = _ref.value,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ["value", "disabled"]);

  return /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, _extends({}, rest, {
    title: "".concat(value),
    value: value,
    gutterBottom: true,
    disabled: disabled,
    InputProps: {
      classes: {
        input: _styles["default"].customTextField
      },
      readOnly: true,
      endAdornment: /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
        disabled: disabled
      })
    },
    fullWidth: true,
    clearBtn: false
  }));
};

exports.SelectListTextField = SelectListTextField;
//# sourceMappingURL=SelectListTextField.js.map
