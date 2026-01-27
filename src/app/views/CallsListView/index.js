"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallsList = require("./CallsList.view");
Object.keys(_CallsList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallsList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallsList[key];
    }
  });
});
var _CallsListView = require("./CallsList.view.interface");
Object.keys(_CallsListView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallsListView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallsListView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
