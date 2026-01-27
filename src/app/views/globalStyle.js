"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyle = void 0;
var _commonStyles = require("@ringcentral-integration/widgets/lib/commonStyles");
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _Presence = require("@ringcentral/juno/es6/components/Presence/Presence.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var GlobalStyle = exports.GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n\n  html,\n  body,\n  ", " {\n    height: 100%;\n    background-color: ", ";\n  }\n\n  ", " {\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n    color: ", ";\n  }\n\n  ", " {\n    box-sizing: content-box;\n  }\n"])), _commonStyles.normalizeStyle, function (_ref) {
  var root = _ref.root;
  return root || '#viewport';
}, (0, _newPalette.palette2)('neutral', 'b01'), function (_ref2) {
  var root = _ref2.root;
  return root || '#viewport';
}, (0, _newPalette.palette2)('neutral', 'f06'), _Presence.RcPresence
// TODO: fix in Juno
);
//# sourceMappingURL=globalStyle.js.map
