"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ErrorList;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
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
  return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    padding: true
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-mainText"
  }, translateString(_utils.TranslatableString.ErrorsLabel)), /*#__PURE__*/_react["default"].createElement(_springUi.List, null, errors.map(function (error, i) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.Xsm,
      size: "small"
    }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      primary: error.stack
    }));
  })));
}
//# sourceMappingURL=ErrorList.js.map
