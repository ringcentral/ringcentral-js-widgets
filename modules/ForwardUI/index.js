"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ForwardUI = require("./ForwardUI.interface");
Object.keys(_ForwardUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ForwardUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ForwardUI[key];
    }
  });
});
var _ForwardUI2 = require("./ForwardUI");
Object.keys(_ForwardUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ForwardUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ForwardUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
