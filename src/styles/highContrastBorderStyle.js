"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highContrastBorderStyle = void 0;
require("core-js/modules/es.array.concat.js");
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var highContrastBorderStyle = exports.highContrastBorderStyle = function highContrastBorderStyle(direction) {
  return (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    ", "\n  "])), function (_ref) {
    var theme = _ref.theme;
    var isHighContrast = theme.palette.highContrast !== 'transparent';
    if (isHighContrast) {
      var border = direction ? "border-".concat(direction) : 'border';
      return "".concat(border, ": 1px solid ").concat((0, _newPalette.palette2)('highContrast')({
        theme: theme
      }));
    }
    return '';
  });
};
//# sourceMappingURL=highContrastBorderStyle.js.map
