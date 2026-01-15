"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvCallDisposition = require("./EvCallDisposition");
Object.keys(_EvCallDisposition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvCallDisposition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvCallDisposition[key];
    }
  });
});
var _EvCallDisposition2 = require("./EvCallDisposition.interface");
Object.keys(_EvCallDisposition2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvCallDisposition2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvCallDisposition2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
