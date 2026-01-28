"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectWidget;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["schema", "id", "name", "options", "label", "hideLabel", "required", "disabled", "readonly", "placeholder", "value", "multiple", "autofocus", "onChange", "onBlur", "onFocus", "rawErrors", "registry", "uiSchema", "hideError", "formContext"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function SelectWidget(_ref) {
  var schema = _ref.schema,
    id = _ref.id,
    name = _ref.name,
    options = _ref.options,
    label = _ref.label,
    hideLabel = _ref.hideLabel,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    placeholder = _ref.placeholder,
    value = _ref.value,
    multiple = _ref.multiple,
    autofocus = _ref.autofocus,
    _onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
    registry = _ref.registry,
    uiSchema = _ref.uiSchema,
    hideError = _ref.hideError,
    formContext = _ref.formContext,
    textFieldProps = _objectWithoutProperties(_ref, _excluded);
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    optEmptyVal = options.emptyValue;
  multiple = typeof multiple === 'undefined' ? false : !!multiple;
  var emptyValue = multiple ? [] : '';
  var isEmpty = typeof value === 'undefined' || multiple && value.length < 1 || !multiple && value === emptyValue;
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, (0, _utils.enumOptionsValueForIndex)(value, enumOptions, optEmptyVal));
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, (0, _utils.enumOptionsValueForIndex)(value, enumOptions, optEmptyVal));
  };
  var selectedIndexes = (0, _utils.enumOptionsIndexForValue)(value, enumOptions, multiple);
  return /*#__PURE__*/_react["default"].createElement(_springUi.Select, _extends({
    variant: "outlined",
    "data-sign": name,
    id: id,
    name: id,
    label: (0, _utils.labelValue)(label, hideLabel || !label, false),
    value: !isEmpty && typeof selectedIndexes !== 'undefined' ? selectedIndexes : emptyValue,
    required: required,
    disabled: disabled || readonly,
    focused: autofocus,
    placeholder: placeholder,
    error: rawErrors.length > 0,
    onChange: function onChange(_ref4) {
      var value = _ref4.target.value;
      return _onChange((0, _utils.enumOptionsValueForIndex)(value, enumOptions, optEmptyVal));
    },
    renderValue: function renderValue(value) {
      var _enumOptions$find;
      return enumOptions === null || enumOptions === void 0 ? void 0 : (_enumOptions$find = enumOptions.find(function (_, i) {
        return value === String(i);
      })) === null || _enumOptions$find === void 0 ? void 0 : _enumOptions$find.label;
    },
    onBlur: _onBlur,
    onFocus: _onFocus,
    size: "medium"
  }, textFieldProps, {
    "aria-describedby": (0, _utils.ariaDescribedByIds)(id)
  }), Array.isArray(enumOptions) && enumOptions.map(function (_ref5, i) {
    var value = _ref5.value,
      label = _ref5.label;
    var disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      key: i,
      value: String(i),
      disabled: disabled
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, label));
  }));
}
//# sourceMappingURL=SelectWidget.js.map
