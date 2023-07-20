"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _NavigationBar = require("./NavigationBar");
Object.keys(_NavigationBar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NavigationBar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NavigationBar[key];
    }
  });
});
var _NavigationBar2 = require("./NavigationBar.interface");
Object.keys(_NavigationBar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NavigationBar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NavigationBar2[key];
    }
  });
});
var _default = _NavigationBar.NavigationBar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
