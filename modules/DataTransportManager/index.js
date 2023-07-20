"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DataTransportManager = require("./DataTransportManager.interface");
Object.keys(_DataTransportManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataTransportManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataTransportManager[key];
    }
  });
});
var _DataTransportManager2 = require("./DataTransportManager");
Object.keys(_DataTransportManager2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataTransportManager2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataTransportManager2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
