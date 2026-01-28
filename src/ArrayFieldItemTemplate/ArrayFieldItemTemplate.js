"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ArrayFieldItemTemplate;
var _Box = require("@ringcentral/juno/es6/components/Box/Box.js");
var _Grid = require("@ringcentral/juno/es6/components/Grid/Grid.js");
var _Paper = require("@ringcentral/juno/es6/components/Paper/Paper.js");
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
  return /*#__PURE__*/_react["default"].createElement(_Grid.RcGrid, {
    container: true,
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Grid.RcGrid, {
    item: true,
    xs: true,
    style: {
      overflow: 'auto'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    mb: 2
  }, /*#__PURE__*/_react["default"].createElement(_Paper.RcPaper, {
    elevation: 2
  }, /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    p: 2
  }, children)))), hasToolbar && /*#__PURE__*/_react["default"].createElement(_Grid.RcGrid, {
    item: true
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
