"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvTabManager = require("./EvTabManager");
Object.keys(_EvTabManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvTabManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvTabManager[key];
    }
  });
});
//# sourceMappingURL=index.js.map
