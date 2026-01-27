"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RecentActivity = require("./RecentActivity.view");
Object.keys(_RecentActivity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecentActivity[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecentActivity[key];
    }
  });
});
var _RecentActivityView = require("./RecentActivity.view.interface");
Object.keys(_RecentActivityView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecentActivityView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecentActivityView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
