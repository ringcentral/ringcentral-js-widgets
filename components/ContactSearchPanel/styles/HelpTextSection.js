"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledListItemText = exports.StyledHintsTitle = exports.HintsWrapper = exports.HelpTextSectionWrapper = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var HelpTextSectionWrapper = exports.HelpTextSectionWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin: ", " 0;\n  text-align: ", ";\n"])), (0, _juno.spacing)(3), function (_ref) {
  var isLoading = _ref.isLoading;
  return isLoading ? 'center' : 'left';
});
var StyledHintsTitle = exports.StyledHintsTitle = (0, _juno.styled)(_juno.RcText)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-bottom: ", ";\n"])), (0, _juno.spacing)(1));
var StyledListItemText = exports.StyledListItemText = (0, _juno.styled)(_juno.RcListItemText)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  line-height: ", ";\n"])), (0, _juno.spacing)(10));
var HintsWrapper = exports.HintsWrapper = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 ", ";\n"])), (0, _juno.spacing)(4));
//# sourceMappingURL=HelpTextSection.js.map
