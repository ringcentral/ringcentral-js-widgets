"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvCallDataSource = require("./EvCallDataSource.interface");
Object.keys(_EvCallDataSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvCallDataSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvCallDataSource[key];
    }
  });
});
var _EvCallDataSource2 = require("./EvCallDataSource");
Object.keys(_EvCallDataSource2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvCallDataSource2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvCallDataSource2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
