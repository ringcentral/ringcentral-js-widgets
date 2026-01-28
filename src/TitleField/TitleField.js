"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TitleField;
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title;
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    className: "mb-1 mt-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-title"
  }, title), /*#__PURE__*/_react["default"].createElement(_springUi.Divider, null));
}
//# sourceMappingURL=TitleField.js.map
