"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvAuth = require("./EvAuth");
Object.keys(_EvAuth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAuth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAuth[key];
    }
  });
});
var _EvAuth2 = require("./EvAuth.interface");
Object.keys(_EvAuth2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAuth2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAuth2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
