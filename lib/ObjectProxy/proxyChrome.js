"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxyChrome = void 0;
var _ObjectProxy = require("./ObjectProxy");
var _global$apiProxy;
var chromeObjectProxy = new _ObjectProxy.ObjectProxy(chrome, (_global$apiProxy = global.apiProxy) === null || _global$apiProxy === void 0 ? void 0 : _global$apiProxy.chrome);
var proxyChrome = chromeObjectProxy.create();
exports.proxyChrome = proxyChrome;
//# sourceMappingURL=proxyChrome.js.map
