"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledTitle = void 0;
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _utils = require("../utils");
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledTitle = exports.StyledTitle = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  max-width: ", ";\n\n  [sf-classic] & {\n    max-width: ", ";\n  }\n"])), _utils.lightningWidth, _utils.classicWidth);
//# sourceMappingURL=StyledTitle.js.map
