"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ObjectProxy = require("./ObjectProxy");
Object.keys(_ObjectProxy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ObjectProxy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ObjectProxy[key];
    }
  });
});
var _proxyChrome = require("./proxyChrome");
Object.keys(_proxyChrome).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _proxyChrome[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _proxyChrome[key];
    }
  });
});
//# sourceMappingURL=index.js.map
