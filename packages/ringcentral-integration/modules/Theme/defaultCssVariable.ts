import { lighten, palette2, setOpacity } from '@ringcentral/juno';

import { CssModuleVariable } from '../Brand';

const mainColor = palette2('nav', 'menuBg');

export const defaultCssVariable: CssModuleVariable = {
  rcBlue: mainColor, // '#066fac'
  bigRed: palette2('danger', 'b03'), // '#dc0202'
  darkRed: palette2('danger', 'b04'), // '#c90213'
  tomato: palette2('avatar', 'tomato'), // '#f95b5c'
  orange: palette2('nav', 'mention'), // '#ff8800'
  leaf: palette2('success', 'b03'), // '#5fb95c'
  dark: palette2('neutral', 'f06'), // '#333'
  night: palette2('neutral', 'f05'), // '#2f2f2f'
  ash: palette2('neutral', 'f04'), // '#666666'
  coin: palette2('neutral', 'f03'), // '#999999'
  smoke: palette2('neutral', 'f02'), // '#c7c7c7'
  silver: palette2('neutral', 'l02'), // '#e2e2e2'
  egg: palette2('neutral', 'b02'), // '#f9f9f9'
  snow: palette2('neutral', 'f01'), // '#ffffff'
  rcOrange: palette2('label', 'orange01'), // '#e07800'
  darkergray: palette2('neutral', 'f03'), // '#797979'
  darkgray: palette2('neutral', 'f03'), // '#808080'
  gray: palette2('neutral', 'b03'), // '#eeeeee'
  bggray: palette2('neutral', 'b03'), // '#e0e0e0'
  lightgray: palette2('neutral', 'b02'), // '#fcfcfc'
  greyLight: palette2('neutral', 'f04'), // '#797979'
  missed: palette2('danger', 'b03'), // '#d8232a'
  active: palette2('success', 'f11'), // '#23b23d'
  primaryColor: mainColor, // '#066fac'
  primaryColorHighlight: setOpacity(mainColor, '40'), // 'rgba(6, 132, 189, 0.4)'
  primaryColorHighlightSolid: lighten(mainColor, 0.6), // 'rgba(173, 210, 227, 1)'
  linePanelBackgroundColor: palette2('neutral', 'b02'), // '#f6f6f6'
  callBtnColor: palette2('success', 'b03'), // '#5fb95c'
  extensionBackgroundColor: palette2('success', 'f11'), // '#66d17b'
  smsBubbleBackgroundColor: palette2('interactive', 'b01'), // '#d5f3fd'
  brandFontColor: mainColor, // '#066fac'
  brandFontColorHighlight: setOpacity(mainColor, '40'), // 'rgba(6, 132, 189, 0.4)'
  jupiterBackgroundColor: palette2('neutral', 'b02'), // '#f5f6fb'
  addMeetingBtnColor: mainColor,
  addMeetingBtnTextColor: palette2('neutral', 'f01'), // '#ffffff'
  extOptionBtnColor: mainColor,
};
