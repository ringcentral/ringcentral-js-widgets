"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _HeaderView = require("./HeaderView.interface");
Object.keys(_HeaderView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HeaderView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HeaderView[key];
    }
  });
});
var _HeaderView2 = require("./HeaderView");
Object.keys(_HeaderView2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HeaderView2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HeaderView2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
