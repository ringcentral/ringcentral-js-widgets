"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetStyle = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var resetStyle = exports.resetStyle = (0, _juno.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font: inherit;\n  line-height: 1;\n"])));
//# sourceMappingURL=reset.js.map
