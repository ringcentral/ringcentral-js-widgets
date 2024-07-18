"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BrowserLogger = require("./BrowserLogger");
Object.keys(_BrowserLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BrowserLogger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BrowserLogger[key];
    }
  });
});
var _BrowserLogger2 = require("./BrowserLogger.interface");
Object.keys(_BrowserLogger2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BrowserLogger2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BrowserLogger2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
