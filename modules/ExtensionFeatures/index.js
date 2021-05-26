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

var _ExtensionFeatures = require("./ExtensionFeatures");

Object.keys(_ExtensionFeatures).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionFeatures[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionFeatures[key];
    }
  });
});

var _ExtensionFeatures2 = require("./ExtensionFeatures.interface");

Object.keys(_ExtensionFeatures2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionFeatures2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionFeatures2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
