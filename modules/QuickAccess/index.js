"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _QuickAccess = require("./QuickAccess");
Object.keys(_QuickAccess).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _QuickAccess[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _QuickAccess[key];
    }
  });
});
var _QuickAccess2 = require("./QuickAccess.interface");
Object.keys(_QuickAccess2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _QuickAccess2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _QuickAccess2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
