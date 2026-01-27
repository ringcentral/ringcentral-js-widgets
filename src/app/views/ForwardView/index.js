"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ForwardView = require("./Forward.view.interface");
Object.keys(_ForwardView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ForwardView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ForwardView[key];
    }
  });
});
var _Forward = require("./Forward.view");
Object.keys(_Forward).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Forward[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Forward[key];
    }
  });
});
//# sourceMappingURL=index.js.map
