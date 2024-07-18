"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MigrateToPluginAlert = require("./MigrateToPluginAlert");
Object.keys(_MigrateToPluginAlert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MigrateToPluginAlert[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MigrateToPluginAlert[key];
    }
  });
});
var _RemoveMeetingWarn = require("./RemoveMeetingWarn");
Object.keys(_RemoveMeetingWarn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RemoveMeetingWarn[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RemoveMeetingWarn[key];
    }
  });
});
//# sourceMappingURL=index.js.map
