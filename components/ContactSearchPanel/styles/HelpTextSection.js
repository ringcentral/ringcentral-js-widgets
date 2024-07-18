"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledListItemText = exports.StyledHintsTitle = exports.HintsWrapper = exports.HelpTextSectionWrapper = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 ", ";\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  line-height: ", ";\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-bottom: ", ";\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin: ", " 0;\n  text-align: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var HelpTextSectionWrapper = _juno.styled.div(_templateObject(), (0, _juno.spacing)(3), function (_ref) {
  var isLoading = _ref.isLoading;
  return isLoading ? 'center' : 'left';
});
exports.HelpTextSectionWrapper = HelpTextSectionWrapper;
var StyledHintsTitle = (0, _juno.styled)(_juno.RcText)(_templateObject2(), (0, _juno.spacing)(1));
exports.StyledHintsTitle = StyledHintsTitle;
var StyledListItemText = (0, _juno.styled)(_juno.RcListItemText)(_templateObject3(), (0, _juno.spacing)(10));
exports.StyledListItemText = StyledListItemText;
var HintsWrapper = _juno.styled.div(_templateObject4(), (0, _juno.spacing)(4));
exports.HintsWrapper = HintsWrapper;
//# sourceMappingURL=HelpTextSection.js.map
