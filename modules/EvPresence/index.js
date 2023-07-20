"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvPresence = require("./EvPresence");
Object.keys(_EvPresence).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvPresence[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvPresence[key];
    }
  });
});
var _EvPresence2 = require("./EvPresence.interface");
Object.keys(_EvPresence2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvPresence2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvPresence2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
