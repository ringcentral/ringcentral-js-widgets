"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _OAuthBase2.OAuthBase;
  }
});
var _OAuthBase = require("./OAuthBase.interface");
Object.keys(_OAuthBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _OAuthBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OAuthBase[key];
    }
  });
});
var _OAuthBase2 = require("./OAuthBase");
Object.keys(_OAuthBase2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _OAuthBase2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OAuthBase2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
