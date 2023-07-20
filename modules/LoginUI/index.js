"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _LoginUI2.LoginUI;
  }
});
var _LoginUI = require("./LoginUI.interface");
Object.keys(_LoginUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _LoginUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LoginUI[key];
    }
  });
});
var _LoginUI2 = require("./LoginUI");
Object.keys(_LoginUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _LoginUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LoginUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
