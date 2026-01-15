"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoNotCallWrapper = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var DoNotCallWrapper = exports.DoNotCallWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  border-radius: 50%;\n  vertical-align: middle;\n  font-size: 0;\n  margin: -2px 0 0 5px;\n  height: 12px;\n  width: 12px;\n  &:hover {\n    background-color: rgba(101, 108, 128, 0.08);\n  }\n"])));
//# sourceMappingURL=DoNotCallIndicator.js.map
