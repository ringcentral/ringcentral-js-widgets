"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrandTheme = exports.defaultTheme = void 0;
var defaultMainColor = '#0684bd';

function getThemeColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMainColor;
  return {
    palette: {
      primary: {
        main: color,
        '700': color,
        '600': color
      },
      bg: {
        primary: color
      },
      element: {
        primary: color
      },
      border: {
        primary: color
      },
      text: {
        info: color,
        button: color
      },
      icon: {
        primary: color,
        bookmark: color
      },
      label: {
        blue: {
          icon: color,
          text: color
        }
      },
      globalHeader: {
        bgDark: color,
        bgDefault: color
      },
      action: {
        primary: color
      },
      accent: {
        blue: color
      }
    }
  };
}

var defaultTheme = getThemeColor();
exports.defaultTheme = defaultTheme;

var getBrandTheme = function getBrandTheme() {
  var brand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rc';
  var rcMainColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var color = {
    rc: rcMainColor || defaultMainColor,
    bt: '#5514B4',
    att: '#067AB4',
    telus: '#57a708'
  }[brand];
  return getThemeColor(color);
};

exports.getBrandTheme = getBrandTheme;
//# sourceMappingURL=theme.js.map
