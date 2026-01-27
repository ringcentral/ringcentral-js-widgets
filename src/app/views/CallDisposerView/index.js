"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallDisposer = require("./CallDisposer.view");
Object.keys(_CallDisposer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallDisposer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallDisposer[key];
    }
  });
});
var _CallDisposerView = require("./CallDisposer.view.interface");
Object.keys(_CallDisposerView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallDisposerView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallDisposerView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
