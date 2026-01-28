"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FieldErrorTemplate;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
function FieldErrorTemplate(props) {
  var _props$errors = props.errors,
    errors = _props$errors === void 0 ? [] : _props$errors,
    idSchema = props.idSchema;
  if (errors.length === 0) {
    return null;
  }
  var id = (0, _utils.errorId)(idSchema);
  return /*#__PURE__*/_react["default"].createElement(_springUi.List, null, errors.map(function (error, i) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      primary: error,
      id: id
    }));
  }));
}
//# sourceMappingURL=FieldErrorTemplate.js.map
