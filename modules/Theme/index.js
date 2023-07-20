"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Theme = require("./Theme.interface");
Object.keys(_Theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Theme[key];
    }
  });
});
var _Theme2 = require("./Theme");
Object.keys(_Theme2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Theme2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Theme2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
