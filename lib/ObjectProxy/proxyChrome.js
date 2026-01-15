"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxyChrome = void 0;
var _ObjectProxy = require("./ObjectProxy");
var _global$apiProxy;
var chromeObjectProxy = new _ObjectProxy.ObjectProxy(chrome, (_global$apiProxy = global.apiProxy) === null || _global$apiProxy === void 0 ? void 0 : _global$apiProxy.chrome);

/**
 * offscreen cannot access the chrome.tabs./windows. APIs,
 *
 * we should use proxy can help you access the chrome APIs directly.
 */
var proxyChrome = exports.proxyChrome = chromeObjectProxy.create();
//# sourceMappingURL=proxyChrome.js.map
