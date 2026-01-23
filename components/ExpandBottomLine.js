"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandBottomLine = void 0;
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ExpandBottomLine = exports.ExpandBottomLine = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 1px;\n  width: 100%;\n  background-color: ", ";\n\n  ", " {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 1;\n    background-color: ", ";\n    height: 17px;\n  }\n"])), (0, _newPalette.palette2)('neutral', 'l02'), _IconButton.RcIconButton, (0, _newPalette.palette2)('neutral', 'b01'));
//# sourceMappingURL=ExpandBottomLine.js.map
