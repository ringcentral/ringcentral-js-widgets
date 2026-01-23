"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetModalContentStyle = exports.resetContentProps = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var resetModalContentStyle = exports.resetModalContentStyle = (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-left: -", ";\n  margin-bottom: -", ";\n  width: calc(100% + ", ");\n  height: calc(100% + ", ");\n"])), (0, _spacing.spacing)(6), (0, _spacing.spacing)(3), (0, _spacing.spacing)(12), (0, _spacing.spacing)(3));
var resetContentProps = exports.resetContentProps = {
  style: {
    overflow: 'hidden'
  }
};
//# sourceMappingURL=resetModalContentStyle.js.map
