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
var _typography = require("@ringcentral/juno/es6/foundation/styles/typography.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var GlobalStyle = exports.GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  html,\n  body,\n  #app {\n    height: 100%;\n    background-color: ", ";\n    color: ", ";\n    ", ";\n  }\n\n  ", "\n"])), (0, _newPalette.palette2)('neutral', 'b01'), (0, _newPalette.palette2)('neutral', 'f06'), (0, _typography.typography)('body1'), _commonStyles.normalizeStyle);
//# sourceMappingURL=styles.js.map
