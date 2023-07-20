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
//# sourceMappingURL=index.js.map
