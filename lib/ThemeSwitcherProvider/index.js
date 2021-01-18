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

var _ThemeSwitcherProvider = require("./ThemeSwitcherProvider");

Object.keys(_ThemeSwitcherProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeSwitcherProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ThemeSwitcherProvider[key];
    }
  });
});

var _ThemeSwitcher = require("./ThemeSwitcher");

Object.keys(_ThemeSwitcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeSwitcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ThemeSwitcher[key];
    }
  });
});
//# sourceMappingURL=index.js.map
