"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _NumberFormatter = require("./NumberFormatter");
Object.keys(_NumberFormatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NumberFormatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NumberFormatter[key];
    }
  });
});
var _NumberFormatter2 = require("./NumberFormatter.interface");
Object.keys(_NumberFormatter2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NumberFormatter2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NumberFormatter2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
