"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ErrorLogger = require("./ErrorLogger");
Object.keys(_ErrorLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ErrorLogger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ErrorLogger[key];
    }
  });
});
var _ErrorLogger2 = require("./ErrorLogger.interface");
Object.keys(_ErrorLogger2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ErrorLogger2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ErrorLogger2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
