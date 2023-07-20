"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DataMatcher = require("./DataMatcher");
Object.keys(_DataMatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataMatcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataMatcher[key];
    }
  });
});
var _DataMatcher2 = require("./DataMatcher.interface");
Object.keys(_DataMatcher2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataMatcher2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataMatcher2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
