"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SubmitButton;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
function SubmitButton(_ref) {
  var uiSchema = _ref.uiSchema;
  var _getSubmitButtonOptio = (0, _utils.getSubmitButtonOptions)(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    _getSubmitButtonOptio2 = _getSubmitButtonOptio.props,
    submitButtonProps = _getSubmitButtonOptio2 === void 0 ? {} : _getSubmitButtonOptio2;
  if (norender) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_springUi.Button, _extends({
    type: "submit",
    variant: "contained",
    color: "primary"
  }, submitButtonProps), submitText);
}
//# sourceMappingURL=SubmitButton.js.map
