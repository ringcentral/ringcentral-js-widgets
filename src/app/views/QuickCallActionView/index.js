"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _QuickCallActionView = require("./QuickCallAction.view.interface");
Object.keys(_QuickCallActionView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _QuickCallActionView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _QuickCallActionView[key];
    }
  });
});
var _QuickCallAction = require("./QuickCallAction.view");
Object.keys(_QuickCallAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _QuickCallAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _QuickCallAction[key];
    }
  });
});
//# sourceMappingURL=index.js.map
