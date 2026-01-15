"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AudioSettingsUI = require("./AudioSettingsUI");
Object.keys(_AudioSettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettingsUI[key];
    }
  });
});
var _AudioSettingsUI2 = require("./AudioSettingsUI.interface");
Object.keys(_AudioSettingsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettingsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettingsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
