"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrimaryColor = void 0;
var _rcBlue = _interopRequireDefault(require("@ringcentral-integration/next-core/themes/juno/rcBlue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * get default theme primary color value from brandConfig
 */

var getPrimaryColor = exports.getPrimaryColor = function getPrimaryColor(brandConfig) {
  var _brandConfig$theme, _brandConfig$theme$th, _palette$content$bran, _palette$content, _palette$neutral$b, _palette$neutral;
  var palette = (_brandConfig$theme = brandConfig.theme) === null || _brandConfig$theme === void 0 ? void 0 : (_brandConfig$theme$th = _brandConfig$theme.themeMap) === null || _brandConfig$theme$th === void 0 ? void 0 : _brandConfig$theme$th['light'].palette;
  return {
    foreground: (_palette$content$bran = palette === null || palette === void 0 ? void 0 : (_palette$content = palette.content) === null || _palette$content === void 0 ? void 0 : _palette$content.brand) !== null && _palette$content$bran !== void 0 ? _palette$content$bran : _rcBlue["default"].palette.content.brand,
    background: (_palette$neutral$b = palette === null || palette === void 0 ? void 0 : (_palette$neutral = palette.neutral) === null || _palette$neutral === void 0 ? void 0 : _palette$neutral.b01) !== null && _palette$neutral$b !== void 0 ? _palette$neutral$b : _rcBlue["default"].palette.neutral.b01
  };
};
//# sourceMappingURL=getPrimaryColor.js.map
