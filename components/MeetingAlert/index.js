"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
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
