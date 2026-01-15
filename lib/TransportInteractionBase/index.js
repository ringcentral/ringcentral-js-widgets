"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TransportInteractionBase = require("./TransportInteractionBase");
Object.keys(_TransportInteractionBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TransportInteractionBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TransportInteractionBase[key];
    }
  });
});
var _TransportInteractionBase2 = require("./TransportInteractionBase.interface");
Object.keys(_TransportInteractionBase2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TransportInteractionBase2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TransportInteractionBase2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
