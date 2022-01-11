"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SettingsPanel = require("./SettingsPanel");

Object.keys(_SettingsPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsPanel[key];
    }
  });
});

var _SettingsPanel2 = require("./SettingsPanel.interface");

Object.keys(_SettingsPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsPanel2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
