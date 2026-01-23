"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBarStyle = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _TextField = require("@ringcentral/juno/es6/components/Forms/TextField/TextField.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var SearchBarStyle = exports.SearchBarStyle = function SearchBarStyle(props) {
  return (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    ", ";\n    padding: ", ";\n\n    ", " {\n    }\n\n    ", " {\n      flex-shrink: 0;\n    }\n  "])), _flexCenter.flexCenterStyle, (0, _spacing.spacing)(1, 4), _TextField.RcTextField, _IconButton.RcIconButton);
};
//# sourceMappingURL=SearchBarStyle.js.map
