"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Storage = require("./Storage");
Object.keys(_Storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Storage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Storage[key];
    }
  });
});
var _Storage2 = require("./Storage.interface");
Object.keys(_Storage2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Storage2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Storage2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
