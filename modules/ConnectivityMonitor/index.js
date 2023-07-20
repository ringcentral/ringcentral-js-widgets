"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConnectivityMonitor = require("./ConnectivityMonitor");
Object.keys(_ConnectivityMonitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityMonitor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityMonitor[key];
    }
  });
});
var _ConnectivityMonitor2 = require("./ConnectivityMonitor.interface");
Object.keys(_ConnectivityMonitor2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityMonitor2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityMonitor2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
