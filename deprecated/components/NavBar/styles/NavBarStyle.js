"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavBarStyle = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _px = require("@ringcentral/juno/es6/foundation/styles/px.js");
var _styles = require("../../../styles");
var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var NavBarStyle = exports.NavBarStyle = function NavBarStyle(props) {
  var direction = props.direction;
  var isVertical = direction === 'vertical';
  return (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    box-sizing: border-box;\n    overflow: visible;\n    height: ", ";\n    flex-shrink: 0;\n    background-color: ", ";\n    display: flex;\n\n    ", "\n  "])), (0, _px.px)(_styles.navBarHeight), (0, _newPalette.palette2)('nav', 'menuBg'), isVertical && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      flex-direction: column;\n      height: 100%;\n    "]))));
};
//# sourceMappingURL=NavBarStyle.js.map
