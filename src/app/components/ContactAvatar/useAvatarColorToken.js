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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvatarColorTokenFromId = getAvatarColorTokenFromId;
exports.useAvatarColorToken = void 0;
var _react = require("react");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var avatarStyles = ['bg-extra-scarlet',
// 'avatar.tomato',
'bg-extra-amethyst',
// 'avatar.blueberry',
'bg-extra-denim-high-contrast',
// 'avatar.oasis',
'bg-extra-mango',
// 'avatar.gold',
'bg-extra-tiffany',
// 'avatar.sage',
'bg-neutral-static-b0/40',
// 'avatar.ash',
'bg-extra-tangerine-high-contrast',
// 'avatar.persimmon',
'bg-extra-lime-high-contrast',
// 'avatar.pear',
'bg-extra-mango-high-contrast',
// 'avatar.brass',
'bg-extra-denim' // 'avatar.lake',
];

// just for tailwind static can scan the colors
// const avatarStyles = [
// 'sui-squircle-bg-color-extra-scarlet', // 'avatar.tomato',
// 'sui-squircle-bg-color-extra-amethyst', // 'avatar.blueberry',
// 'sui-squircle-bg-color-extra-denim-high-contrast', // 'avatar.oasis',
// 'sui-squircle-bg-color-extra-mango', // 'avatar.gold',
// 'sui-squircle-bg-color-extra-tiffany', // 'avatar.sage',
// 'sui-squircle-bg-color-neutral-static-b0/40', // 'avatar.ash',
// 'sui-squircle-bg-color-extra-tangerine-high-contrast', // 'avatar.persimmon',
// 'sui-squircle-bg-color-extra-lime-high-contrast', // 'avatar.pear',
// 'sui-squircle-bg-color-extra-mango-high-contrast', // 'avatar.brass',
// 'sui-squircle-bg-color-extra-denim', // 'avatar.lake',
// ];

function getAvatarColorTokenFromId(id) {
  var hash = 0;
  var total = avatarStyles.length;
  var _iterator = _createForOfIteratorHelper("".concat(id !== null && id !== void 0 ? id : '')),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      hash = hash + String(i).charCodeAt(0);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (hash < 0) hash = -hash;
  return avatarStyles[hash % total];
}

/**
 * get color with `id` from buildIn avatar color map
 *
 * this method copy from juno, just do the mapping to spring-ui token
 */
var useAvatarColorToken = exports.useAvatarColorToken = function useAvatarColorToken(id) {
  var result = (0, _react.useMemo)(function () {
    return getAvatarColorTokenFromId(id);
  }, [id]);
  return result;
};
//# sourceMappingURL=useAvatarColorToken.js.map
