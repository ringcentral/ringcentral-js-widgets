"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ShinyBar = require("./ShinyBar");
Object.keys(_ShinyBar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ShinyBar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ShinyBar[key];
    }
  });
});
//# sourceMappingURL=index.js.map
