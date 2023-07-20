"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ContactListUI = require("./ContactListUI");
Object.keys(_ContactListUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactListUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactListUI[key];
    }
  });
});
var _ContactListUI2 = require("./ContactListUI.interface");
Object.keys(_ContactListUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactListUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactListUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
