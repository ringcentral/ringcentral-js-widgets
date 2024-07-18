"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AlertUI = require("./AlertUI");
Object.keys(_AlertUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AlertUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AlertUI[key];
    }
  });
});
var _AlertUI2 = require("./AlertUI.interface");
Object.keys(_AlertUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AlertUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AlertUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
