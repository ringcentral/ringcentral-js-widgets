"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ActiveCallItem = require("./ActiveCallItem");
Object.keys(_ActiveCallItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActiveCallItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActiveCallItem[key];
    }
  });
});
//# sourceMappingURL=index.js.map
