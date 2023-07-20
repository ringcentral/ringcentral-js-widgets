"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RcUIModule = require("./RcUIModule");
Object.keys(_RcUIModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RcUIModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcUIModule[key];
    }
  });
});
var _RcUIModuleType = require("./RcUIModuleType");
Object.keys(_RcUIModuleType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RcUIModuleType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcUIModuleType[key];
    }
  });
});
//# sourceMappingURL=index.js.map
