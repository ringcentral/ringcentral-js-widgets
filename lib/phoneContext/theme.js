"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrandTheme = exports.defaultTheme = void 0;
var defaultTheme = {
  palette: {
    primary: {
      light: '#05a8f3',
      main: '#0684bd',
      dark: '#045d86',
      '700': '#0684bd',
      '600': '#0684bd'
    }
  }
};
exports.defaultTheme = defaultTheme;

var getBrandTheme = function getBrandTheme() {
  var brand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rc';
  return {
    palette: {
      primary: {
        main: {
          rc: '#0684bd',
          bt: '#5514B4',
          att: '#067AB4',
          telus: '#57a708'
        }[brand]
      }
    }
  };
};

exports.getBrandTheme = getBrandTheme;
//# sourceMappingURL=theme.js.map
