"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _IncomingCallPage = require("./IncomingCallPage");
Object.keys(_IncomingCallPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IncomingCallPage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IncomingCallPage[key];
    }
  });
});
//# sourceMappingURL=index.js.map
