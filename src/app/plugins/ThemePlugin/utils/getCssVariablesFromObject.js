"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCssVariablesFromObject = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.string.includes.js");
var _css = require("culori/css");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // @ts-ignore
// eslint-disable-next-line import/no-unresolved
var cutNumber = function cutNumber(number) {
  if (number) {
    return +number.toFixed(6);
  } else {
    return 0;
  }
};
var getColor = function getColor(color) {
  if (!color) return null;
  try {
    if (typeof color === 'string' && (color.includes('rgba') || color === 'transparent')) return color;
    var input = (0, _css.oklch)(color);
    if (!input) return color;
    var l = input.l,
      c = input.c,
      h = input.h;
    return "".concat(parseFloat((cutNumber(l) * 100).toFixed(6)), "% ").concat(cutNumber(c), " ").concat(cutNumber(h));
  } catch (error) {
    return color;
  }
};

/**
 * Converts a Juno palette object into a string of CSS variables.
 * @param palette - The Juno palette object.
 * @returns A string of CSS variables representing the Juno palette.
 */
var getCssVariablesFromObject = exports.getCssVariablesFromObject = function getCssVariablesFromObject(palette) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var cssVariable = palette && Object.entries(palette).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    if (key === 'type') return acc;
    if (_typeof(value) === 'object') {
      var nestedVariables = Object.entries(value).reduce(function (nestedAcc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          nestedKey = _ref4[0],
          nestedValue = _ref4[1];
        var color = getColor(nestedValue);
        if (!color) return nestedAcc;
        return "".concat(nestedAcc, "--").concat(prefix).concat(key, "-").concat(nestedKey, ": ").concat(color, ";\n");
      }, '');
      return "".concat(acc).concat(nestedVariables);
    } else {
      var color = getColor(value);
      if (!color) return acc;
      return "".concat(acc, "--").concat(prefix).concat(key, ": ").concat(color, ";\n");
    }
  }, '');
  return cssVariable;
};
//# sourceMappingURL=getCssVariablesFromObject.js.map
