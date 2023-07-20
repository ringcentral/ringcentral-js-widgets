"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _OAuth2.OAuth;
  }
});
var _OAuth = require("./OAuth.interface");
Object.keys(_OAuth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _OAuth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OAuth[key];
    }
  });
});
var _OAuth2 = require("./OAuth");
Object.keys(_OAuth2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _OAuth2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OAuth2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
