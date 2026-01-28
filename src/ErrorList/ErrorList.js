"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ErrorList;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _Error = _interopRequireDefault(require("@material-ui/icons/Error"));
var _Box = require("@ringcentral/juno/es6/components/Box/Box.js");
var _List = require("@ringcentral/juno/es6/components/List/List/List.js");
var _ListItem = require("@ringcentral/juno/es6/components/List/ListItem/ListItem.js");
var _ListItemIcon = require("@ringcentral/juno/es6/components/List/ListItemIcon/ListItemIcon.js");
var _ListItemText = require("@ringcentral/juno/es6/components/List/ListItemText/ListItemText.js");
var _Paper = require("@ringcentral/juno/es6/components/Paper/Paper.js");
var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
function ErrorList(_ref) {
  var errors = _ref.errors,
    registry = _ref.registry;
  var translateString = registry.translateString;
  return /*#__PURE__*/_react["default"].createElement(_Paper.RcPaper, {
    elevation: 2
  }, /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    mb: 2,
    p: 2
  }, /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "caption1"
  }, translateString(_utils.TranslatableString.ErrorsLabel)), /*#__PURE__*/_react["default"].createElement(_List.RcList, {
    dense: true
  }, errors.map(function (error, i) {
    return /*#__PURE__*/_react["default"].createElement(_ListItem.RcListItem, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_ListItemIcon.RcListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_Error["default"], {
      color: "error"
    })), /*#__PURE__*/_react["default"].createElement(_ListItemText.RcListItemText, {
      primary: error.stack
    }));
  }))));
}
//# sourceMappingURL=ErrorList.js.map
