"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _mapping = require("./mapping");
Object.keys(_mapping).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mapping[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapping[key];
    }
  });
});
var _TupleUtility = require("./TupleUtility");
Object.keys(_TupleUtility).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TupleUtility[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TupleUtility[key];
    }
  });
});
//# sourceMappingURL=index.js.map
