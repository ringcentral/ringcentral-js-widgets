"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Call = require("./Call.view");
Object.keys(_Call).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Call[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Call[key];
    }
  });
});
var _CallView = require("./Call.view.interface");
Object.keys(_CallView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallView[key];
    }
  });
});
var _services = require("./services");
Object.keys(_services).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _services[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _services[key];
    }
  });
});
//# sourceMappingURL=index.js.map
