"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DescriptionField;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
function DescriptionField(props) {
  var id = props.id,
    description = props.description;
  if (description) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
      id: id,
      className: "typography-mainText mt-5"
    }, description);
  }
  return null;
}
//# sourceMappingURL=DescriptionField.js.map
