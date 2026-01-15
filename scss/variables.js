"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageSpace = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var lightningPageSpace = (0, _juno.spacing)(4);
var classicPageSpace = (0, _juno.spacing)(3);
var pageSpace = exports.pageSpace = function pageSpace() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'margin';
  return type === 'margin' ? (0, _juno.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        margin-left: ", ";\n        margin-right: ", ";\n\n        [sf-classic] & {\n          margin-left: ", ";\n          margin-right: ", ";\n        }\n      "])), lightningPageSpace, lightningPageSpace, classicPageSpace, classicPageSpace) : (0, _juno.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        padding-left: ", ";\n        padding-right: ", ";\n\n        [sf-classic] & {\n          padding-left: ", ";\n          padding-right: ", ";\n        }\n      "])), lightningPageSpace, lightningPageSpace, classicPageSpace, classicPageSpace);
};
//# sourceMappingURL=variables.js.map
