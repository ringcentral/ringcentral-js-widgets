"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _HeaderViewUI = require("./HeaderViewUI");
Object.keys(_HeaderViewUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HeaderViewUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HeaderViewUI[key];
    }
  });
});
var _HeaderViewUI2 = require("./HeaderViewUI.interface");
Object.keys(_HeaderViewUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HeaderViewUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HeaderViewUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
