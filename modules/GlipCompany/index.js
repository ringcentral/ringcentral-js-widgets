"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _GlipCompany = require("./GlipCompany");
Object.keys(_GlipCompany).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GlipCompany[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GlipCompany[key];
    }
  });
});
var _GlipCompany2 = require("./GlipCompany.interface");
Object.keys(_GlipCompany2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GlipCompany2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GlipCompany2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
