"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Block = require("./Block.interface");
Object.keys(_Block).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Block[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Block[key];
    }
  });
});
var _Block2 = require("./Block");
Object.keys(_Block2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Block2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Block2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
