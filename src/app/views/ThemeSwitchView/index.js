"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ThemeSwitchView = require("./ThemeSwitch.view.interface");
Object.keys(_ThemeSwitchView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeSwitchView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ThemeSwitchView[key];
    }
  });
});
var _ThemeSwitch = require("./ThemeSwitch.view");
Object.keys(_ThemeSwitch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeSwitch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ThemeSwitch[key];
    }
  });
});
//# sourceMappingURL=index.js.map
