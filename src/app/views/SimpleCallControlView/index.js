"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SimpleCallControl = require("./SimpleCallControl.view");
Object.keys(_SimpleCallControl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SimpleCallControl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SimpleCallControl[key];
    }
  });
});
var _SimpleCallControlView = require("./SimpleCallControl.view.interface");
Object.keys(_SimpleCallControlView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SimpleCallControlView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SimpleCallControlView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
