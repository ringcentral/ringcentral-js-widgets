"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FieldHelpTemplate;
var _FormHelperText = require("@ringcentral/juno/es6/components/Forms/FormHelperText/FormHelperText.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
function FieldHelpTemplate(props) {
  var idSchema = props.idSchema,
    help = props.help;
  if (!help) {
    return null;
  }
  var id = (0, _utils.helpId)(idSchema);
  return /*#__PURE__*/_react["default"].createElement(_FormHelperText.RcFormHelperText, {
    id: id
  }, help);
}
//# sourceMappingURL=FieldHelpTemplate.js.map
