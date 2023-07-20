"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AppView = require("./AppView");
Object.keys(_AppView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AppView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
