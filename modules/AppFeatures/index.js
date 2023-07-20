"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AppFeatures = require("./AppFeatures");
Object.keys(_AppFeatures).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppFeatures[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AppFeatures[key];
    }
  });
});
var _AppFeatures2 = require("./AppFeatures.interface");
Object.keys(_AppFeatures2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppFeatures2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AppFeatures2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
