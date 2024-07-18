"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledReplyIcon = exports.StyledMenuList = exports.StyledArrowIcon = exports.StyledActionIcon = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 8px;\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    width: 124px;\n  }\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  transform: rotateY(180deg);\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin-right: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledActionIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject(), (0, _juno.spacing)(2));
exports.StyledActionIcon = StyledActionIcon;
var StyledReplyIcon = (0, _juno.styled)(StyledActionIcon)(_templateObject2());
exports.StyledReplyIcon = StyledReplyIcon;
var StyledMenuList = (0, _juno.styled)(_juno.RcMenuList)(_templateObject3(), _juno.RcMenuItem);
exports.StyledMenuList = StyledMenuList;
var StyledArrowIcon = (0, _juno.styled)(_juno.RcIconButton)(_templateObject4());
exports.StyledArrowIcon = StyledArrowIcon;
//# sourceMappingURL=StyledMoreAction.js.map
