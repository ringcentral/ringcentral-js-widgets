"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitButtonWrapper = exports.StyledAgentScriptIcon = void 0;
var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo");
var _juno = require("@ringcentral/juno");
var _variables = require("../../scss/variables");
var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledAgentScriptIcon = exports.StyledAgentScriptIcon = (0, _juno.styled)(_juno.RcIconButton)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 16px;\n  top: 50px;\n  z-index: 2;\n"])));
var SubmitButtonWrapper = exports.SubmitButtonWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  height: ", ";\n  display: flex;\n  align-items: center;\n  ", ";\n  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);\n"])), (0, _juno.px)(_BasicCallInfo.SubmitButtonHeight), (0, _variables.pageSpace)('padding'));
//# sourceMappingURL=ActivityCallLogWrapper.js.map
