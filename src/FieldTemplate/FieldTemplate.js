"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FieldTemplate;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `FieldTemplate` component is the template used by `SchemaField` to render any field. It renders the field
 * content, (label, description, children, errors and help) inside of a `WrapIfAdditional` component.
 *
 * @param props - The `FieldTemplateProps` for this component
 */
function FieldTemplate(props) {
  var id = props.id,
    children = props.children,
    classNames = props.classNames,
    style = props.style,
    disabled = props.disabled,
    displayLabel = props.displayLabel,
    hidden = props.hidden,
    label = props.label,
    onDropPropertyClick = props.onDropPropertyClick,
    onKeyChange = props.onKeyChange,
    readonly = props.readonly,
    required = props.required,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    errors = props.errors,
    help = props.help,
    description = props.description,
    rawDescription = props.rawDescription,
    schema = props.schema,
    uiSchema = props.uiSchema,
    registry = props.registry;
  var uiOptions = (0, _utils.getUiOptions)(uiSchema);
  var WrapIfAdditionalTemplate = (0, _utils.getTemplate)('WrapIfAdditionalTemplate', registry, uiOptions);
  if (hidden) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: 'none'
      }
    }, children);
  }
  return /*#__PURE__*/_react["default"].createElement(WrapIfAdditionalTemplate, {
    classNames: classNames,
    style: style,
    disabled: disabled,
    id: id,
    label: label,
    onDropPropertyClick: onDropPropertyClick,
    onKeyChange: onKeyChange,
    readonly: readonly,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full"
  }, children, displayLabel && rawDescription ? /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-mainText"
  }, description) : null, errors, help));
}
//# sourceMappingURL=FieldTemplate.js.map
