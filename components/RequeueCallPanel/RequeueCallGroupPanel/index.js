"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RequeueCallGroupPanel = require("./RequeueCallGroupPanel");
Object.keys(_RequeueCallGroupPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RequeueCallGroupPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RequeueCallGroupPanel[key];
    }
  });
});
var _RequeueCallGroupDetailPanel = require("./RequeueCallGroupDetailPanel");
Object.keys(_RequeueCallGroupDetailPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RequeueCallGroupDetailPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RequeueCallGroupDetailPanel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
