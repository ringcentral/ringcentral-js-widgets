"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DateTimeFormat = require("./DateTimeFormat");
Object.keys(_DateTimeFormat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DateTimeFormat[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DateTimeFormat[key];
    }
  });
});
var _DateTimeFormat2 = require("./DateTimeFormat.interface");
Object.keys(_DateTimeFormat2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DateTimeFormat2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DateTimeFormat2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
