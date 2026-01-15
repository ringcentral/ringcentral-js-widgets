"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeVariableValues = exports.getThemeVariableString = exports.getThemeValue = exports.getCssVariableString = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.assign.js");
var _ramda = require("ramda");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * get value from theme
 * @param value value of getter
 * @param theme current theme
 * @returns target theme value
 */
var _getThemeValue = exports.getThemeValue = function getThemeValue(value, theme) {
  try {
    if (typeof value === 'function') {
      var next = value({
        theme: theme
      });
      return _getThemeValue(next, theme);
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
var getCssVariableString = exports.getCssVariableString = function getCssVariableString(variable) {
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
var getThemeVariableValues = exports.getThemeVariableValues = function getThemeVariableValues(variable, theme) {
  return (0, _ramda.reduce)(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, _getThemeValue(variable[key], theme)));
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
var getThemeVariableString = exports.getThemeVariableString = function getThemeVariableString(variable, theme) {
  var values = getThemeVariableValues(variable, theme);
  return getCssVariableString(values);
};
//# sourceMappingURL=getThemeColor.js.map
