"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var uuid = _interopRequireWildcard(require("uuid"));

var _global$navigator, _global$navigator$loc, _global$navigator$loc2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
