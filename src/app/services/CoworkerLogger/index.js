"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CoworkerLogger = require("./CoworkerLogger");
Object.keys(_CoworkerLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CoworkerLogger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CoworkerLogger[key];
    }
  });
});
var _CoworkerLogger2 = require("./CoworkerLogger.interface");
Object.keys(_CoworkerLogger2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CoworkerLogger2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CoworkerLogger2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
