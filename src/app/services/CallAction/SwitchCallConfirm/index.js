"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SwitchCallConfirm = require("./SwitchCallConfirm.interface");
Object.keys(_SwitchCallConfirm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SwitchCallConfirm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SwitchCallConfirm[key];
    }
  });
});
var _SwitchCallConfirm2 = require("./SwitchCallConfirm");
Object.keys(_SwitchCallConfirm2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SwitchCallConfirm2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SwitchCallConfirm2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
