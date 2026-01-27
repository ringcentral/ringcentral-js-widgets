"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Client = require("./Client");
Object.keys(_Client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Client[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Client[key];
    }
  });
});
var _createSDK = require("./createSDK");
Object.keys(_createSDK).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createSDK[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createSDK[key];
    }
  });
});
//# sourceMappingURL=index.js.map
