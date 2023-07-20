"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoNotCallWrapper = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  border-radius: 50%;\n  vertical-align: middle;\n  font-size: 0;\n  margin: -2px 0 0 5px;\n  height: 12px;\n  width: 12px;\n  &:hover {\n    background-color: rgba(101, 108, 128, 0.08);\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var DoNotCallWrapper = _juno.styled.div(_templateObject());
exports.DoNotCallWrapper = DoNotCallWrapper;
//# sourceMappingURL=DoNotCallIndicator.js.map
