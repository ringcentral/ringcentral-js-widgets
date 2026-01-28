"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WrapIfAdditionalTemplate;
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
function WrapIfAdditionalTemplate(props) {
  var children = props.children,
    classNames = props.classNames,
    style = props.style,
    disabled = props.disabled,
    id = props.id,
    label = props.label,
    onDropPropertyClick = props.onDropPropertyClick,
    onKeyChange = props.onKeyChange,
    readonly = props.readonly,
    required = props.required,
    schema = props.schema,
    uiSchema = props.uiSchema,
    registry = props.registry;
  var templates = registry.templates,
    translateString = registry.translateString;
  // Button templates are not overridden in the uiSchema
  var RemoveButton = templates.ButtonTemplates.RemoveButton;
  var keyLabel = translateString(_utils.TranslatableString.KeyLabel, [label]);
  var additional = _utils.ADDITIONAL_PROPERTY_FLAG in schema;
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold'
  };
  if (!additional) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classNames,
      style: style
    }, children);
  }
  var handleBlur = function handleBlur(_ref) {
    var target = _ref.target;
    return onKeyChange(target.value);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "".concat(id, "-key"),
    className: "flex items-center gap-2 ".concat(classNames),
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    fullWidth: true,
    required: required,
    label: keyLabel,
    defaultValue: label,
    disabled: disabled || readonly,
    id: "".concat(id, "-key"),
    onBlur: !readonly ? handleBlur : undefined,
    type: "text"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, children), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/_react["default"].createElement(RemoveButton, {
    iconType: "default",
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label),
    uiSchema: uiSchema,
    registry: registry
  })));
}
//# sourceMappingURL=WrapIfAdditionalTemplate.js.map
