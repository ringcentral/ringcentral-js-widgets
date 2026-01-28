"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseInputTemplate;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["id", "name", "placeholder", "required", "readonly", "disabled", "type", "label", "hideLabel", "hideError", "value", "onChange", "onChangeOverride", "onBlur", "onFocus", "autofocus", "options", "schema", "uiSchema", "rawErrors", "formContext", "registry", "InputLabelProps"],
  _excluded2 = ["step", "min", "max"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var TYPES_THAT_SHRINK_LABEL = ['date', 'datetime-local', 'file', 'time'];

/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
function BaseInputTemplate(props) {
  var id = props.id,
    name = props.name,
    placeholder = props.placeholder,
    required = props.required,
    readonly = props.readonly,
    disabled = props.disabled,
    type = props.type,
    label = props.label,
    hideLabel = props.hideLabel,
    hideError = props.hideError,
    value = props.value,
    onChange = props.onChange,
    onChangeOverride = props.onChangeOverride,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    autofocus = props.autofocus,
    options = props.options,
    schema = props.schema,
    uiSchema = props.uiSchema,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    formContext = props.formContext,
    registry = props.registry,
    InputLabelProps = props.InputLabelProps,
    textFieldProps = _objectWithoutProperties(props, _excluded);
  var inputProps = (0, _utils.getInputProps)(schema, type, options);
  // Now we need to pull out the step, min, max into an inner `inputProps` for material-ui
  var step = inputProps.step,
    min = inputProps.min,
    max = inputProps.max,
    rest = _objectWithoutProperties(inputProps, _excluded2);
  var otherProps = _objectSpread({
    inputProps: _objectSpread({
      step: step,
      min: min,
      max: max
    }, schema.examples ? {
      list: (0, _utils.examplesId)(id)
    } : undefined)
  }, rest);
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return onChange(value);
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };
  var DisplayInputLabelProps = TYPES_THAT_SHRINK_LABEL.includes(type) ? _objectSpread(_objectSpread({}, InputLabelProps), {}, {
    shrink: true
  }) : InputLabelProps;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, _extends({
    "data-sign": name,
    id: id,
    placeholder: placeholder,
    label: (0, _utils.labelValue)(label || undefined, hideLabel, false),
    fullWidth: true
    // eslint-disable-next-line jsx-a11y/no-autofocus
    ,
    autoFocus: autofocus,
    required: required,
    disabled: disabled || readonly
  }, otherProps, {
    value: value || value === 0 ? value : '',
    error: rawErrors.length > 0,
    onChange: onChangeOverride || _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }, textFieldProps, {
    type: "text",
    "aria-describedby": (0, _utils.ariaDescribedByIds)(id, !!schema.examples)
  })), Array.isArray(schema.examples) && /*#__PURE__*/_react["default"].createElement("datalist", {
    id: (0, _utils.examplesId)(id)
  }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: example,
      value: example
    });
  })));
}
//# sourceMappingURL=BaseInputTemplate.js.map
