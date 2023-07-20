"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _variables = require("./variables");
Object.keys(_variables).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _variables[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _variables[key];
    }
  });
});
//# sourceMappingURL=index.js.map
