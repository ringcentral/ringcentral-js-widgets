"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallLogCallCtrlUI = require("./CallLogCallCtrlUI");
Object.keys(_CallLogCallCtrlUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlUI[key];
    }
  });
});
var _CallLogCallCtrlUI2 = require("./CallLogCallCtrlUI.interface");
Object.keys(_CallLogCallCtrlUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
