"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropMask = void 0;
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _palette = require("@ringcentral/juno/es6/foundation/styles/palette.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var DropMask = exports.DropMask = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: ", ";\n  border: 2px dotted ", ";\n  pointer-events: none;\n  display: none;\n"])), (0, _palette.setOpacity)((0, _newPalette.palette2)('neutral', 'b02'), '64'), (0, _newPalette.palette2)('highlight', 'f02'));
//# sourceMappingURL=DropMask.js.map
