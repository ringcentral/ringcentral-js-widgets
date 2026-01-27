"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SettingsView = require("./Settings.view.interface");
Object.keys(_SettingsView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsView[key];
    }
  });
});
var _Settings = require("./Settings.view");
Object.keys(_Settings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Settings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Settings[key];
    }
  });
});
var _AutoCallLoggingSwitchView = require("./AutoCallLoggingSwitchView");
Object.keys(_AutoCallLoggingSwitchView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutoCallLoggingSwitchView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AutoCallLoggingSwitchView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
