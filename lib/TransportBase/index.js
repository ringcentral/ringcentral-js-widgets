"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TransportBase = require("./TransportBase");
Object.keys(_TransportBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TransportBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TransportBase[key];
    }
  });
});
//# sourceMappingURL=index.js.map
