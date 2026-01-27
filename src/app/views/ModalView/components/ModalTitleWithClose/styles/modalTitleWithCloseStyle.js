"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalTitleWithCloseStyle = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var modalTitleWithCloseStyle = exports.modalTitleWithCloseStyle = function modalTitleWithCloseStyle(props) {
  return (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 64px;\n  "])));
};
//# sourceMappingURL=modalTitleWithCloseStyle.js.map
