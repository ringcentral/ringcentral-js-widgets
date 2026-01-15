"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallsOnholdUI = require("./CallsOnholdUI");
Object.keys(_CallsOnholdUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallsOnholdUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallsOnholdUI[key];
    }
  });
});
var _CallsOnholdUI2 = require("./CallsOnholdUI.interface");
Object.keys(_CallsOnholdUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallsOnholdUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallsOnholdUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
