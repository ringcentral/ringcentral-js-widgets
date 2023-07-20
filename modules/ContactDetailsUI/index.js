"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ContactDetailsUI = require("./ContactDetailsUI.interface");
Object.keys(_ContactDetailsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactDetailsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactDetailsUI[key];
    }
  });
});
var _ContactDetailsUI2 = require("./ContactDetailsUI");
Object.keys(_ContactDetailsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactDetailsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactDetailsUI2[key];
    }
  });
});
var _helper = require("./helper");
Object.keys(_helper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _helper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helper[key];
    }
  });
});
//# sourceMappingURL=index.js.map
