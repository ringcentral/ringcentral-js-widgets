"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _VideoConfig = require("./VideoConfig");
Object.keys(_VideoConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VideoConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VideoConfig[key];
    }
  });
});
//# sourceMappingURL=index.js.map
