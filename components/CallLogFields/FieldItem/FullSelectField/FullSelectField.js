"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullSelectField = void 0;
var _react = _interopRequireDefault(require("react"));
var _SelectList = require("../../../SelectList");
var _SelectListTextField = require("./SelectListTextField/SelectListTextField");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
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
      return onFullSelectFieldClick === null || onFullSelectFieldClick === void 0 ? void 0 : onFullSelectFieldClick(field);
    }
  }));
};
exports.FullSelectField = FullSelectField;
FullSelectField.defaultProps = {
  TextFieldProps: {}
};
//# sourceMappingURL=FullSelectField.js.map
