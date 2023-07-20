"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BlockUI = require("./BlockUI.interface");
Object.keys(_BlockUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BlockUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BlockUI[key];
    }
  });
});
var _BlockUI2 = require("./BlockUI");
Object.keys(_BlockUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BlockUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BlockUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
