"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeVariableValues = exports.getThemeVariableString = exports.getThemeValue = exports.getCssVariableString = void 0;
var _ramda = require("ramda");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * get value from theme
 * @param value value of getter
 * @param theme current theme
 * @returns target theme value
 */
var getThemeValue = function getThemeValue(value, theme) {
  try {
    if (typeof value === 'function') {
      var next = value({
        theme: theme
      });
      return getThemeValue(next, theme);
    }
    return value;
  } catch (e) {
    return '';
  }
};

/**
 * get variable style string from variable object
 * @param variable
 */
exports.getThemeValue = getThemeValue;
var getCssVariableString = function getCssVariableString(variable) {
  return "\n--rc-blue: ".concat(variable.rcBlue, ";\n--bigRed: ").concat(variable.bigRed, ";\n--darkRed: ").concat(variable.darkRed, ";\n--tomato: ").concat(variable.tomato, ";\n--orange: ").concat(variable.orange, ";\n--leaf: ").concat(variable.leaf, ";\n--dark: ").concat(variable.dark, ";\n--night: ").concat(variable.night, ";\n--ash: ").concat(variable.ash, ";\n--coin: ").concat(variable.coin, ";\n--smoke: ").concat(variable.smoke, ";\n--silver: ").concat(variable.silver, ";\n--egg: ").concat(variable.egg, ";\n--snow: ").concat(variable.snow, ";\n--rc-orange: ").concat(variable.rcOrange, ";\n--darkergray: ").concat(variable.darkergray, ";\n--darkgray: ").concat(variable.darkgray, ";\n--gray: ").concat(variable.gray, ";\n--bggray: ").concat(variable.bggray, ";\n--lightgray: ").concat(variable.lightgray, ";\n--grey-light: ").concat(variable.greyLight, ";\n--missed: ").concat(variable.missed, ";\n--active: ").concat(variable.active, ";\n--primary-color: ").concat(variable.primaryColor, ";\n--primary-color-highlight: ").concat(variable.primaryColorHighlight, ";\n--primary-color-highlight-solid: ").concat(variable.primaryColorHighlightSolid, ";\n--line-panel-background-color: ").concat(variable.linePanelBackgroundColor, ";\n--call-btn-color: ").concat(variable.callBtnColor, ";\n--extension-background-color: ").concat(variable.extensionBackgroundColor, ";\n--sms-bubble-background-color: ").concat(variable.smsBubbleBackgroundColor, ";\n--brand-font-color: ").concat(variable.brandFontColor, ";\n--brand-font-color-highlight: ").concat(variable.brandFontColorHighlight, ";\n--jupiter-background-color: ").concat(variable.jupiterBackgroundColor, ";\n", "\n--c2d-arrow-color: ").concat(variable.c2dArrowColor, ";\n--add-meeting-btn-color: ").concat(variable.addMeetingBtnColor, ";\n--add-meeting-btn-text-color: ").concat(variable.addMeetingBtnTextColor, ";\n--ext-option-btn-color: ").concat(variable.extOptionBtnColor, ";");
};

/**
 * get css variable object
 * @param variable current theme variable
 * @param theme current theme object
 * @returns theme variable value object
 *
 * ```js
 * {
 *   variable: '#FFF',
 *   variable2: '#000',
 *   variable3: '#AAA',
 *   ...
 * }
 * ```
 */
exports.getCssVariableString = getCssVariableString;
var getThemeVariableValues = function getThemeVariableValues(variable, theme) {
  return (0, _ramda.reduce)(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, getThemeValue(variable[key], theme)));
  }, {}, (0, _ramda.keys)(variable));
};

/**
 * get css variable string
 * @param variable current theme variable
 * @param theme current theme object
 * @returns theme variable style string
 *
 * ```css
 * --variable: #FFF
 * --variable2: #000
 * --variable3: #AAA
 * ```
 */
exports.getThemeVariableValues = getThemeVariableValues;
var getThemeVariableString = function getThemeVariableString(variable, theme) {
  var values = getThemeVariableValues(variable, theme);
  return getCssVariableString(values);
};
exports.getThemeVariableString = getThemeVariableString;
//# sourceMappingURL=getThemeColor.js.map
