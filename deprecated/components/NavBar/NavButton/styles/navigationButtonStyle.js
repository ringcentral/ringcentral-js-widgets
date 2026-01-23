"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navButtonStyle = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");
var _focusVisible = require("@ringcentral/juno/es6/foundation/styles/focusVisible.js");
var _nonStyleButton = require("@ringcentral/juno/es6/foundation/styles/nonStyleButton.js");
var _nonTouchHoverMedia = require("@ringcentral/juno/es6/foundation/styles/nonTouchHoverMedia.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _palette = require("@ringcentral/juno/es6/foundation/styles/palette.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var iconColor = (0, _newPalette.palette2)('nav', 'menuText');

// TODO: check with designer, is need add that active background color?

var navButtonStyle = exports.navButtonStyle = function navButtonStyle(_ref) {
  var width = _ref.width,
    height = _ref.height,
    active = _ref.active;
  return (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    ", ";\n    ", ";\n    width: ", ";\n    height: ", ";\n    flex: 1 1 auto;\n    color: ", ";\n    background-color: ", ";\n\n    ", " {\n      &:hover {\n        background-color: ", ";\n      }\n    }\n\n    &:active {\n      background-color: ", ";\n    }\n\n    ", " {\n      background-color: ", ";\n    }\n  "])), _nonStyleButton.nonStyleButton, _flexCenter.flexCenterStyle, width, height, iconColor, active && (0, _palette.setOpacity)(iconColor, '12'), _nonTouchHoverMedia.nonTouchHoverMedia, (0, _palette.setOpacity)(iconColor, '08'), (0, _palette.setOpacity)(iconColor, '16'), _focusVisible.focusVisible, (0, _palette.setOpacity)(iconColor, '16'));
};
//# sourceMappingURL=navigationButtonStyle.js.map
