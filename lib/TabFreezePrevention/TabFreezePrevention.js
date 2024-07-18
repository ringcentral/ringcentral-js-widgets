"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
var uuid = _interopRequireWildcard(require("uuid"));
var _global$navigator, _global$navigator$loc, _global$navigator$loc2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
/**
 * If the browser supports web lock api, obtain a web lock indefinitely.
 * This will prevent chrome's proactive tab freeze feature from freezing
 * our app.
 *
 * https://www.chromestatus.com/feature/5193677469122560
 * https://developer.mozilla.org/en-US/docs/Web/API/Lock
 *
 * Use randomly generated uuid to prevent lock collision. While it should not
 * have any affect if multiple tabs uses the same name for the lock, we want to
 * avoid this since the api is still experimental and might have strange results.
 */

(_global$navigator = global.navigator) === null || _global$navigator === void 0 ? void 0 : (_global$navigator$loc = _global$navigator.locks) === null || _global$navigator$loc === void 0 ? void 0 : (_global$navigator$loc2 = _global$navigator$loc.request) === null || _global$navigator$loc2 === void 0 ? void 0 : _global$navigator$loc2.call(_global$navigator$loc, uuid.v4(), function () {
  return new Promise(function () {});
});
//# sourceMappingURL=TabFreezePrevention.js.map
