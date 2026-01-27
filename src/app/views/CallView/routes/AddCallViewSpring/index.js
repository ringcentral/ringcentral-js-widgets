"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AddCallView = require("./AddCall.view.interface");
Object.keys(_AddCallView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AddCallView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AddCallView[key];
    }
  });
});
var _AddCall = require("./AddCall.view");
Object.keys(_AddCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AddCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AddCall[key];
    }
  });
});
//# sourceMappingURL=index.js.map
