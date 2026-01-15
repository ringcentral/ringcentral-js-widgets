"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleWrapper = exports.StyledVerticalListItem = exports.StyledRcCard = exports.StyledPasswordDescription = exports.StyledListItemText = exports.StyledListItem = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var TitleWrapper = exports.TitleWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-bottom: ", ";\n\n  ", " {\n    margin-bottom: ", ";\n  }\n\n  ", ":last-child {\n    margin-bottom: 0;\n  }\n"])), (0, _juno.spacing)(5), _juno.RcTypography, (0, _juno.spacing)(1), _juno.RcTypography);
var StyledRcCard = exports.StyledRcCard = (0, _juno.styled)(_juno.RcCard)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: ", ";\n  margin-bottom: ", ";\n"])), (0, _juno.spacing)(0, 3), (0, _juno.spacing)(5));
var StyledListItem = exports.StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding: ", " !important;\n\n  ", " {\n    margin-left: ", ";\n  }\n\n  ", " {\n    margin-top: ", ";\n  }\n"])), (0, _juno.spacing)(3, 0), _juno.RcSwitch, (0, _juno.spacing)(4), _juno.RcSelect, (0, _juno.spacing)(4));
var StyledPasswordDescription = exports.StyledPasswordDescription = (0, _juno.styled)(_juno.RcBox)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  gap: ", ";\n\n  ", " {\n    margin-left: ", ";\n  }\n"])), (0, _juno.spacing)(2), _juno.RcLink, (0, _juno.spacing)(2.5));
var StyledVerticalListItem = exports.StyledVerticalListItem = (0, _juno.styled)(StyledListItem)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  flex-direction: column;\n  align-items: stretch;\n"])));
var StyledListItemText = exports.StyledListItemText = (0, _juno.styled)(_juno.RcListItemText)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  .RcListItemText-secondary {\n    white-space: break-spaces;\n  }\n"])));
//# sourceMappingURL=styled.js.map
