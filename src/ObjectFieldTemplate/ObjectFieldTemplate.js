"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ObjectFieldTemplate;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
function ObjectFieldTemplate(props) {
  var _schema$propertiesWra, _schema$className;
  var description = props.description,
    title = props.title,
    properties = props.properties,
    required = props.required,
    disabled = props.disabled,
    readonly = props.readonly,
    uiSchema = props.uiSchema,
    idSchema = props.idSchema,
    schema = props.schema,
    formData = props.formData,
    onAddClick = props.onAddClick,
    registry = props.registry;
  var uiOptions = (0, _utils.getUiOptions)(uiSchema);
  var TitleFieldTemplate = (0, _utils.getTemplate)('TitleFieldTemplate', registry, uiOptions);
  var DescriptionFieldTemplate = (0, _utils.getTemplate)('DescriptionFieldTemplate', registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  var propertiesWrap = (_schema$propertiesWra = schema.propertiesWrap) !== null && _schema$propertiesWra !== void 0 ? _schema$propertiesWra : true;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, title && /*#__PURE__*/_react["default"].createElement(TitleFieldTemplate, {
    id: (0, _utils.titleId)(idSchema),
    title: title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), description && /*#__PURE__*/_react["default"].createElement(DescriptionFieldTemplate, {
    id: (0, _utils.descriptionId)(idSchema),
    description: description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (_schema$className = schema.className) !== null && _schema$className !== void 0 ? _schema$className : 'flex flex-col gap-3 mt-4'
  }, properties.map(function (element, index) {
    return (
      // Remove the <RcGrid> if the inner element is hidden as the <RcGrid>
      // itself would otherwise still take up space.
      element.hidden || !propertiesWrap ? element.content : /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-span-12",
        key: index
      }, element.content)
    );
  }), (0, _utils.canExpand)(schema, uiSchema, formData) && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/_react["default"].createElement(AddButton, {
    className: "object-property-expand",
    onClick: onAddClick(schema),
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  })))));
}
//# sourceMappingURL=ObjectFieldTemplate.js.map
