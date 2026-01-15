"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcTextWrapper = exports.RcLinkWrapper = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var RcTextWrapper = exports.RcTextWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  font-size: 13px;\n  width: 219px;\n  [sf-classic] & {\n    font-size: 12px;\n    width: 175px;\n  }\n  & p {\n    margin-bottom: 25px;\n  }\n"])));
var RcLinkWrapper = exports.RcLinkWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 13px;\n"])));
//# sourceMappingURL=DialerPanelWrapper.js.map
