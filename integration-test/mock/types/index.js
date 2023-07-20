"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _features = require("./features.interface");
Object.keys(_features).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _features[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _features[key];
    }
  });
});
//# sourceMappingURL=index.js.map
