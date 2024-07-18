"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.iterator");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.weak-map");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadLocale;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function loadLocale(locale) {
  return locale === 'en' || locale === 'en-US' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./en-US'));
  }) : locale === 'en-GB' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./en-GB'));
  }) : locale === 'en-AU' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./en-AU'));
  }) : locale === 'fr' || locale === 'fr-FR' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./fr-FR'));
  }) : locale === 'fr-CA' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./fr-CA'));
  }) : locale === 'de' || locale === 'de-DE' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./de-DE'));
  }) : locale === 'it' || locale === 'it-IT' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./it-IT'));
  }) : locale === 'es' || locale === 'es-419' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./es-419'));
  }) : locale === 'es-ES' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./es-ES'));
  }) : locale === 'ja' || locale === 'ja-JP' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./ja-JP'));
  }) : locale === 'pt' || locale === 'pt-PT' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./pt-PT'));
  }) : locale === 'pt-BR' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./pt-BR'));
  }) : locale === 'zh' || locale === 'zh-CN' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./zh-CN'));
  }) : locale === 'zh-TW' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./zh-TW'));
  }) : locale === 'zh-HK' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./zh-HK'));
  }) : locale === 'nl' || locale === 'nl-NL' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./nl-NL'));
  }) : locale === 'ko' || locale === 'ko-KR' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./ko-KR'));
  }) : locale === 'fi' || locale === 'fi-FI' ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./fi-FI'));
  }) : null;
}
//# sourceMappingURL=loadLocale.js.map
