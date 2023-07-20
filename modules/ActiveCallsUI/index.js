"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ActiveCallsUI = require("./ActiveCallsUI");
Object.keys(_ActiveCallsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActiveCallsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActiveCallsUI[key];
    }
  });
});
var _ActiveCallsUI2 = require("./ActiveCallsUI.interface");
Object.keys(_ActiveCallsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActiveCallsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActiveCallsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
