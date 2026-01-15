"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../../lib/commonStyles");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var Root = exports.Root = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  box-sizing: border-box;\n  background: ", ";\n"])), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'b01'));
//# sourceMappingURL=ComposeTextPanel.js.map
