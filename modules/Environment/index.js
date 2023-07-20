"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Environment = require("./Environment");
Object.keys(_Environment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Environment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Environment[key];
    }
  });
});
var _Environment2 = require("./Environment.interface");
Object.keys(_Environment2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Environment2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Environment2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
