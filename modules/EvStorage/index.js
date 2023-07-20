"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvStorage = require("./EvStorage");
Object.keys(_EvStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvStorage[key];
    }
  });
});
var _EvStorage2 = require("./EvStorage.interface");
Object.keys(_EvStorage2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvStorage2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvStorage2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
