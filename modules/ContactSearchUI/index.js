"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ContactSearchUI = require("./ContactSearchUI");
Object.keys(_ContactSearchUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactSearchUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactSearchUI[key];
    }
  });
});
var _ContactSearchUI2 = require("./ContactSearchUI.interface");
Object.keys(_ContactSearchUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactSearchUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactSearchUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
