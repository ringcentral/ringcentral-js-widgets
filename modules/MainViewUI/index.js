"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MainViewUI = require("./MainViewUI");
Object.keys(_MainViewUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MainViewUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MainViewUI[key];
    }
  });
});
var _MainViewUI2 = require("./MainViewUI.interface");
Object.keys(_MainViewUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MainViewUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MainViewUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
