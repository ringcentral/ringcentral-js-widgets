"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _fileHandler = require("./fileHandler");
Object.keys(_fileHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fileHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fileHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map
