"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConnectivityBadgeView = require("./ConnectivityBadge.view.interface");
Object.keys(_ConnectivityBadgeView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityBadgeView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityBadgeView[key];
    }
  });
});
var _ConnectivityBadge = require("./ConnectivityBadge.view");
Object.keys(_ConnectivityBadge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityBadge[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityBadge[key];
    }
  });
});
//# sourceMappingURL=index.js.map
