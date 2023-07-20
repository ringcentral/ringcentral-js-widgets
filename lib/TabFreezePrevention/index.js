"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TabFreezePrevention = require("./TabFreezePrevention");
Object.keys(_TabFreezePrevention).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TabFreezePrevention[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TabFreezePrevention[key];
    }
  });
});
//# sourceMappingURL=index.js.map
