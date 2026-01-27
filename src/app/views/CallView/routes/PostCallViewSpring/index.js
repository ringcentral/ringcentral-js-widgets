"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PostCallView = require("./PostCall.view.interface");
Object.keys(_PostCallView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PostCallView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PostCallView[key];
    }
  });
});
var _PostCall = require("./PostCall.view");
Object.keys(_PostCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PostCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PostCall[key];
    }
  });
});
//# sourceMappingURL=index.js.map
