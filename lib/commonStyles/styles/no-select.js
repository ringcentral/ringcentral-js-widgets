"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noSelectStyle = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var noSelectStyle = exports.noSelectStyle = (0, _juno.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  user-select: none;\n  user-drag: none;\n"])));
//# sourceMappingURL=no-select.js.map
