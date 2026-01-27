"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallLogCallCtrl = require("./CallLogCallCtrl.view");
Object.keys(_CallLogCallCtrl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrl[key];
    }
  });
});
var _CallLogCallCtrlView = require("./CallLogCallCtrl.view.interface");
Object.keys(_CallLogCallCtrlView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
