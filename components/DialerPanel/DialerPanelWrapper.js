"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcTextWrapper = exports.RcLinkWrapper = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 13px;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 13px;\n  width: 219px;\n  [sf-classic] & {\n    font-size: 12px;\n    width: 175px;\n  }\n  & p {\n    margin-bottom: 25px;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var RcTextWrapper = _juno.styled.div(_templateObject());
exports.RcTextWrapper = RcTextWrapper;
var RcLinkWrapper = _juno.styled.div(_templateObject2());
exports.RcLinkWrapper = RcLinkWrapper;
//# sourceMappingURL=DialerPanelWrapper.js.map
