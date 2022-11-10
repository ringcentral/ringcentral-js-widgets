"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCssVariable = void 0;

var _juno = require("@ringcentral/juno");

var mainColor = (0, _juno.palette2)('nav', 'menuBg');
var defaultCssVariable = {
  rcBlue: mainColor,
  // '#066fac'
  bigRed: (0, _juno.palette2)('danger', 'b03'),
  // '#dc0202'
  darkRed: (0, _juno.palette2)('danger', 'b04'),
  // '#c90213'
  tomato: (0, _juno.palette2)('avatar', 'tomato'),
  // '#f95b5c'
  orange: (0, _juno.palette2)('nav', 'mention'),
  // '#ff8800'
  leaf: (0, _juno.palette2)('success', 'b03'),
  // '#5fb95c'
  dark: (0, _juno.palette2)('neutral', 'f06'),
  // '#333'
  night: (0, _juno.palette2)('neutral', 'f05'),
  // '#2f2f2f'
  ash: (0, _juno.palette2)('neutral', 'f04'),
  // '#666666'
  coin: (0, _juno.palette2)('neutral', 'f03'),
  // '#999999'
  smoke: (0, _juno.palette2)('neutral', 'f02'),
  // '#c7c7c7'
  silver: (0, _juno.palette2)('neutral', 'l02'),
  // '#e2e2e2'
  egg: (0, _juno.palette2)('neutral', 'b02'),
  // '#f9f9f9'
  snow: (0, _juno.palette2)('neutral', 'f01'),
  // '#ffffff'
  rcOrange: (0, _juno.palette2)('label', 'orange01'),
  // '#e07800'
  darkergray: (0, _juno.palette2)('neutral', 'f03'),
  // '#797979'
  darkgray: (0, _juno.palette2)('neutral', 'f03'),
  // '#808080'
  gray: (0, _juno.palette2)('neutral', 'b03'),
  // '#eeeeee'
  bggray: (0, _juno.palette2)('neutral', 'b03'),
  // '#e0e0e0'
  lightgray: (0, _juno.palette2)('neutral', 'b02'),
  // '#fcfcfc'
  greyLight: (0, _juno.palette2)('neutral', 'f04'),
  // '#797979'
  missed: (0, _juno.palette2)('danger', 'b03'),
  // '#d8232a'
  active: (0, _juno.palette2)('success', 'f11'),
  // '#23b23d'
  primaryColor: mainColor,
  // '#066fac'
  primaryColorHighlight: (0, _juno.setOpacity)(mainColor, '40'),
  // 'rgba(6, 132, 189, 0.4)'
  primaryColorHighlightSolid: (0, _juno.lighten)(mainColor, 0.6),
  // 'rgba(173, 210, 227, 1)'
  linePanelBackgroundColor: (0, _juno.palette2)('neutral', 'b02'),
  // '#f6f6f6'
  callBtnColor: (0, _juno.palette2)('success', 'b03'),
  // '#5fb95c'
  extensionBackgroundColor: (0, _juno.palette2)('success', 'f11'),
  // '#66d17b'
  smsBubbleBackgroundColor: (0, _juno.palette2)('interactive', 'b01'),
  // '#d5f3fd'
  brandFontColor: mainColor,
  // '#066fac'
  brandFontColorHighlight: (0, _juno.setOpacity)(mainColor, '40'),
  // 'rgba(6, 132, 189, 0.4)'
  jupiterBackgroundColor: (0, _juno.palette2)('neutral', 'b02'),
  // '#f5f6fb'
  addMeetingBtnColor: mainColor,
  addMeetingBtnTextColor: (0, _juno.palette2)('neutral', 'f01'),
  // '#ffffff'
  extOptionBtnColor: mainColor
};
exports.defaultCssVariable = defaultCssVariable;
//# sourceMappingURL=defaultCssVariable.js.map
