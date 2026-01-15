"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvSettingsUI = require("./EvSettingsUI");
Object.keys(_EvSettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSettingsUI[key];
    }
  });
});
var _EvSettingsUI2 = require("./EvSettingsUI.interface");
Object.keys(_EvSettingsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSettingsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSettingsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
