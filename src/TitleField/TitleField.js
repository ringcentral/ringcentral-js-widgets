"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TitleField;
var _Box = require("@ringcentral/juno/es6/components/Box/Box.js");
var _Divider = require("@ringcentral/juno/es6/components/Divider/Divider.js");
var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title;
  return /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    id: id,
    mb: 1,
    mt: 1
  }, /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "title1"
  }, title), /*#__PURE__*/_react["default"].createElement(_Divider.RcDivider, null));
}
//# sourceMappingURL=TitleField.js.map
