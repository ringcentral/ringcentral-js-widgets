"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleWrapper = exports.StyledVerticalListItem = exports.StyledRcCard = exports.StyledPasswordDescription = exports.StyledListItemText = exports.StyledListItem = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  .RcListItemText-secondary {\n    white-space: break-spaces;\n  }\n"]);
  _templateObject6 = function _templateObject6() {
    return data;
  };
  return data;
}
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: column;\n  align-items: stretch;\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  gap: ", ";\n\n  ", " {\n    margin-left: ", ";\n  }\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " !important;\n\n  ", " {\n    margin-left: ", ";\n  }\n\n  ", " {\n    margin-top: ", ";\n  }\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n  margin-bottom: ", ";\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin-bottom: ", ";\n\n  ", " {\n    margin-bottom: ", ";\n  }\n\n  ", ":last-child {\n    margin-bottom: 0;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var TitleWrapper = _juno.styled.div(_templateObject(), (0, _juno.spacing)(5), _juno.RcTypography, (0, _juno.spacing)(1), _juno.RcTypography);
exports.TitleWrapper = TitleWrapper;
var StyledRcCard = (0, _juno.styled)(_juno.RcCard)(_templateObject2(), (0, _juno.spacing)(0, 3), (0, _juno.spacing)(5));
exports.StyledRcCard = StyledRcCard;
var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject3(), (0, _juno.spacing)(3, 0), _juno.RcSwitch, (0, _juno.spacing)(4), _juno.RcSelect, (0, _juno.spacing)(4));
exports.StyledListItem = StyledListItem;
var StyledPasswordDescription = (0, _juno.styled)(_juno.RcBox)(_templateObject4(), (0, _juno.spacing)(2), _juno.RcLink, (0, _juno.spacing)(2.5));
exports.StyledPasswordDescription = StyledPasswordDescription;
var StyledVerticalListItem = (0, _juno.styled)(StyledListItem)(_templateObject5());
exports.StyledVerticalListItem = StyledVerticalListItem;
var StyledListItemText = (0, _juno.styled)(_juno.RcListItemText)(_templateObject6());
exports.StyledListItemText = StyledListItemText;
//# sourceMappingURL=styled.js.map
