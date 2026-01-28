"use strict";

require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ArrayFieldTemplate;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _Box = require("@ringcentral/juno/es6/components/Box/Box.js");
var _Grid = require("@ringcentral/juno/es6/components/Grid/Grid.js");
var _Paper = require("@ringcentral/juno/es6/components/Paper/Paper.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["key"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldTemplate(props) {
  var canAdd = props.canAdd,
    disabled = props.disabled,
    idSchema = props.idSchema,
    uiSchema = props.uiSchema,
    items = props.items,
    onAddClick = props.onAddClick,
    readonly = props.readonly,
    registry = props.registry,
    required = props.required,
    schema = props.schema,
    title = props.title;
  var uiOptions = (0, _utils.getUiOptions)(uiSchema);
  var ArrayFieldDescriptionTemplate = (0, _utils.getTemplate)('ArrayFieldDescriptionTemplate', registry, uiOptions);
  var ArrayFieldItemTemplate = (0, _utils.getTemplate)('ArrayFieldItemTemplate', registry, uiOptions);
  var ArrayFieldTitleTemplate = (0, _utils.getTemplate)('ArrayFieldTitleTemplate', registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return /*#__PURE__*/_react["default"].createElement(_Paper.RcPaper, {
    elevation: 2
  }, /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    p: 2
  }, /*#__PURE__*/_react["default"].createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    schema: schema,
    uiSchema: uiSchema,
    required: required,
    registry: registry
  }), /*#__PURE__*/_react["default"].createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), items && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/_react["default"].createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  }), canAdd && /*#__PURE__*/_react["default"].createElement(_Grid.RcGrid, {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/_react["default"].createElement(_Grid.RcGrid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    mt: 2
  }, /*#__PURE__*/_react["default"].createElement(AddButton, {
    className: "array-item-add",
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  }))))));
}
//# sourceMappingURL=ArrayFieldTemplate.js.map
