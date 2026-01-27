"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallAction = require("./CallAction");
Object.keys(_CallAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallAction[key];
    }
  });
});
var _CallAction2 = require("./CallAction.interface");
Object.keys(_CallAction2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallAction2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallAction2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
