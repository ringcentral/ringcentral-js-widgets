"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CheckboxWidget;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
var _Checkbox = require("@ringcentral/juno/es6/components/Forms/Checkbox/Checkbox.js");
var _FormControlLabel = require("@ringcentral/juno/es6/components/Forms/FormControlLabel/FormControlLabel.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `CheckBoxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxWidget(props) {
  var _options$description;
  var schema = props.schema,
    id = props.id,
    value = props.value,
    disabled = props.disabled,
    readonly = props.readonly,
    _props$label = props.label,
    label = _props$label === void 0 ? '' : _props$label,
    hideLabel = props.hideLabel,
    autofocus = props.autofocus,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    registry = props.registry,
    options = props.options,
    uiSchema = props.uiSchema;
  var DescriptionFieldTemplate = (0, _utils.getTemplate)('DescriptionFieldTemplate', registry, options);
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  var required = (0, _utils.schemaRequiresTrueValue)(schema);
  var _onChange = function _onChange(_, checked) {
    return onChange(checked);
  };
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, value);
  };
  var description = (_options$description = options.description) !== null && _options$description !== void 0 ? _options$description : schema.description;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !hideLabel && !!description && /*#__PURE__*/_react["default"].createElement(DescriptionFieldTemplate, {
    id: (0, _utils.descriptionId)(id),
    description: description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/_react["default"].createElement(_FormControlLabel.RcFormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_Checkbox.RcCheckbox, {
      id: id,
      name: id,
      checked: typeof value === 'undefined' ? false : Boolean(value),
      required: required,
      disabled: disabled || readonly
      // eslint-disable-next-line jsx-a11y/no-autofocus
      ,
      autoFocus: autofocus,
      onChange: _onChange,
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": (0, _utils.ariaDescribedByIds)(id)
    }),
    label: (0, _utils.labelValue)(label, hideLabel, false)
  }));
}
//# sourceMappingURL=CheckboxWidget.js.map
