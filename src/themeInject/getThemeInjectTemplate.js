"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeInjectTemplate = getThemeInjectTemplate;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _template = _interopRequireDefault(require("lodash/template"));
var _path = _interopRequireDefault(require("path"));
var _themeMap = require("./themeMap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var getSuiPrimary = function getSuiPrimary(obj) {
  var theme = Object.entries(obj)[0][1];
  return {
    foreground: "rgb(".concat(theme['--s-primary-b'], ")"),
    background: "rgb(".concat(theme['--s-neutral-base'], ")"),
    loadingRing: "rgb(".concat(theme['--s-neutral-b4'], ")")
  };
};
// node_modules/@ringcentral/spring-theme/tailwind/themes
function getThemeInjectTemplate(code) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    renderAs: 'inlineScript'
  };
  var renderAs = options.renderAs;
  // brandConfig.code
  var mainSource = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, './inline/themeInject.js')).toString();
  var theme = code && _themeMap.themeMap[code];
  if (!theme) throw new Error('theme not found, please add the brand code into themeMap');
  var primaryColor = getSuiPrimary(theme);
  var darkColors = getSuiPrimary(_themeMap.themeMap['rc_dark']);
  var contrastColors = getSuiPrimary(_themeMap.themeMap['rc_contrast']);
  var scriptContent = (0, _template["default"])(mainSource)({
    primaryColor: primaryColor.foreground,
    bgColor: primaryColor.background,
    loadingRing: primaryColor.loadingRing,
    darkPrimaryColor: darkColors.foreground,
    darkBgColor: darkColors.background,
    darkLoadingRing: darkColors.loadingRing,
    contrastPrimaryColor: contrastColors.foreground,
    contrastBgColor: contrastColors.background,
    contrastLoadingRing: contrastColors.loadingRing
  });
  if (renderAs === 'inlineScript') {
    return /*html*/"<script>".concat(scriptContent, "</script>");
  }
  return scriptContent;
}
//# sourceMappingURL=getThemeInjectTemplate.js.map
