"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ArrayFieldItemTemplate;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldItemTemplate(props) {
  var children = props.children,
    disabled = props.disabled,
    hasToolbar = props.hasToolbar,
    hasCopy = props.hasCopy,
    hasMoveDown = props.hasMoveDown,
    hasMoveUp = props.hasMoveUp,
    hasRemove = props.hasRemove,
    index = props.index,
    onCopyIndexClick = props.onCopyIndexClick,
    onDropIndexClick = props.onDropIndexClick,
    onReorderClick = props.onReorderClick,
    readonly = props.readonly,
    uiSchema = props.uiSchema,
    registry = props.registry;
  var _registry$templates$B = registry.templates.ButtonTemplates,
    CopyButton = _registry$templates$B.CopyButton,
    MoveDownButton = _registry$templates$B.MoveDownButton,
    MoveUpButton = _registry$templates$B.MoveUpButton,
    RemoveButton = _registry$templates$B.RemoveButton;
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
    minWidth: 0
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1",
    style: {
      overflow: 'auto'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "shadow-md"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2"
  }, children)))), hasToolbar && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex"
  }, (hasMoveUp || hasMoveDown) && /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    uiSchema: uiSchema,
    registry: registry
  }), hasCopy && /*#__PURE__*/_react["default"].createElement(CopyButton, {
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onCopyIndexClick(index),
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && /*#__PURE__*/_react["default"].createElement(RemoveButton, {
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    uiSchema: uiSchema,
    registry: registry
  })));
}
//# sourceMappingURL=ArrayFieldItemTemplate.js.map
