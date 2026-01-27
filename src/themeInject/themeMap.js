"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeMap = void 0;
var _highContrast = _interopRequireDefault(require("@ringcentral/spring-theme/tailwind/themes/highContrast"));
var _junoLight = _interopRequireDefault(require("@ringcentral/spring-theme/tailwind/themes/junoLight"));
var _dark = _interopRequireDefault(require("@ringcentral/spring-theme/tailwind/themes/dark"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-ignore

// @ts-ignore

// @ts-ignore

var themeMap = exports.themeMap = {
  rc: _junoLight["default"],
  rc_dark: _dark["default"],
  rc_contrast: _highContrast["default"],
  sharedConfig: _junoLight["default"]
};
//# sourceMappingURL=themeMap.js.map
