"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrandThemeWithJupiterBlue = exports.getBrandTheme = exports.brandThemeMapping = void 0;

var _theme = _interopRequireDefault(require("./brands/attRich/theme.json"));

var _theme2 = _interopRequireDefault(require("./brands/btRich/theme.json"));

var _theme3 = _interopRequireDefault(require("./brands/rcBlue/theme.json"));

var _theme4 = _interopRequireDefault(require("./brands/rcJupiterBlue/theme.json"));

var _theme5 = _interopRequireDefault(require("./brands/telusRich/theme.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TODO: temporary import all, wait dynamic load way implement
var brandThemeMapping = {
  jupiterBlue: _theme4["default"],
  rcBlue: _theme3["default"],
  att: _theme["default"],
  telus: _theme5["default"],
  bt: _theme2["default"]
};
exports.brandThemeMapping = brandThemeMapping;

var innerGetBrandTheme = function innerGetBrandTheme() {
  var brand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rc';
  var defaultTheme = arguments.length > 1 ? arguments[1] : undefined;

  if (brand === 'rc') {
    return defaultTheme;
  }

  return brandThemeMapping[brand] || defaultTheme;
};

var getBrandTheme = function getBrandTheme() {
  var brand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rc';
  return innerGetBrandTheme(brand, brandThemeMapping.rcBlue);
};

exports.getBrandTheme = getBrandTheme;

var getBrandThemeWithJupiterBlue = function getBrandThemeWithJupiterBlue() {
  var brand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rc';
  return innerGetBrandTheme(brand, brandThemeMapping.jupiterBlue);
};

exports.getBrandThemeWithJupiterBlue = getBrandThemeWithJupiterBlue;
//# sourceMappingURL=theme.js.map
