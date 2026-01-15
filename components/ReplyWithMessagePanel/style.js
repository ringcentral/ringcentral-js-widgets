"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSendIcon = exports.TimeOptionItem = exports.StyledCustomMessage = exports.SendIcon = exports.ReplyWithMessagePage = exports.ReplyOptionsList = exports.ReplyOptionItem = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ReplyWithMessagePage = exports.ReplyWithMessagePage = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  z-index: 21;\n  height: 100%;\n  background-color: ", ";\n"])), (0, _juno.palette2)('neutral', 'b01'));
var ReplyOptionsList = exports.ReplyOptionsList = (0, _juno.styled)(_juno.RcList)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-top: ", ";\n"])), (0, _juno.spacing)(8));
var SendIcon = exports.SendIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: none;\n"])));
var ReplyOptionItem = exports.ReplyOptionItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  padding-top: ", ";\n  padding-bottom: ", ";\n  &:hover {\n    ", " {\n      display: flex;\n    }\n  }\n"])), (0, _juno.spacing)(2), (0, _juno.spacing)(2), SendIcon);
var StyledCustomMessage = exports.StyledCustomMessage = (0, _juno.styled)(_juno.RcTextarea)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  padding: ", ";\n  margin-top: ", ";\n  position: absolute;\n  bottom: 0;\n  label {\n    padding-left: ", ";\n  }\n"])), (0, _juno.spacing)(0, 4, 8, 4), (0, _juno.spacing)(14), (0, _juno.spacing)(4));
var TimeSendIcon = exports.TimeSendIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  visibility: hidden;\n"])));
var TimeOptionItem = exports.TimeOptionItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  padding-top: ", ";\n  padding-bottom: ", ";\n  &:hover {\n    ", " {\n      visibility: visible;\n    }\n  }\n"])), (0, _juno.spacing)(2), (0, _juno.spacing)(2), TimeSendIcon);
//# sourceMappingURL=style.js.map
