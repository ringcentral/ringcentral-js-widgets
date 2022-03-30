"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullSelectField = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _SelectList = require("../../../SelectList");

var _SelectListTextField = require("./SelectListTextField/SelectListTextField");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FullSelectField = function FullSelectField(_ref) {
  var disabled = _ref.disabled,
      TextFieldProps = _ref.TextFieldProps,
      field = _ref.field,
      title = _ref.title,
      onFullSelectFieldClick = _ref.onFullSelectFieldClick,
      rest = _objectWithoutProperties(_ref, ["disabled", "TextFieldProps", "field", "title", "onFullSelectFieldClick"]);

  var helperText = TextFieldProps.helperText,
      value = TextFieldProps.value;
  return /*#__PURE__*/_react["default"].createElement(_SelectList.SelectList, _extends({
    disabled: disabled,
    field: field,
    title: title
  }, rest), /*#__PURE__*/_react["default"].createElement(_SelectListTextField.SelectListTextField, {
    "data-sign": field,
    value: value,
    disabled: disabled,
    helperText: helperText,
    label: title,
    onClick: function onClick() {
      return onFullSelectFieldClick(field);
    }
  }));
};

exports.FullSelectField = FullSelectField;
FullSelectField.defaultProps = {
  TextFieldProps: {},
  onFullSelectFieldClick: function onFullSelectFieldClick() {}
};
//# sourceMappingURL=FullSelectField.js.map
