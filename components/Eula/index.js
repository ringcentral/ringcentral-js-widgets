"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Eula = require("./Eula");
Object.keys(_Eula).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Eula[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Eula[key];
    }
  });
});
var _Eula2 = require("./Eula.interface");
Object.keys(_Eula2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Eula2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Eula2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
