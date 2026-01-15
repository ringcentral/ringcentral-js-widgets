"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadLocale;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function loadLocale(locale) {
  return locale === 'en' || locale === 'en-US' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "en-US" */'./en-US'));
  }) : locale === 'en-GB' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "en-GB" */'./en-GB'));
  }) : locale === 'en-AU' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "en-AU" */'./en-AU'));
  }) : locale === 'fr' || locale === 'fr-FR' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "fr-FR" */'./fr-FR'));
  }) : locale === 'fr-CA' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "fr-CA" */'./fr-CA'));
  }) : locale === 'de' || locale === 'de-DE' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "de-DE" */'./de-DE'));
  }) : locale === 'it' || locale === 'it-IT' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "it-IT" */'./it-IT'));
  }) : locale === 'es' || locale === 'es-419' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "es-419" */'./es-419'));
  }) : locale === 'es-ES' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "es-ES" */'./es-ES'));
  }) : locale === 'ja' || locale === 'ja-JP' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "ja-JP" */'./ja-JP'));
  }) : locale === 'pt' || locale === 'pt-BR' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "pt-BR" */'./pt-BR'));
  }) : locale === 'zh' || locale === 'zh-CN' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "zh-CN" */'./zh-CN'));
  }) : locale === 'zh-TW' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "zh-TW" */'./zh-TW'));
  }) : locale === 'zh-HK' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require(/* webpackChunkName: "zh-HK" */'./zh-HK'));
  }) : null;
}
//# sourceMappingURL=loadLocale.js.map
