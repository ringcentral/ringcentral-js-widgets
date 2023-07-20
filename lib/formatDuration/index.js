"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _formatDuration = require("./formatDuration");
Object.keys(_formatDuration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _formatDuration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formatDuration[key];
    }
  });
});
//# sourceMappingURL=index.js.map
