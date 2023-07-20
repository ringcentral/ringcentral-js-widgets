"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _GlobalStorage = require("./GlobalStorage");
Object.keys(_GlobalStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GlobalStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GlobalStorage[key];
    }
  });
});
var _GlobalStorage2 = require("./GlobalStorage.interface");
Object.keys(_GlobalStorage2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GlobalStorage2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GlobalStorage2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
