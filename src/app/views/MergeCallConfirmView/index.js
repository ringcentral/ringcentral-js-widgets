"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MergeCallConfirm = require("./MergeCallConfirm.view");
Object.keys(_MergeCallConfirm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MergeCallConfirm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MergeCallConfirm[key];
    }
  });
});
var _MergeCallConfirmView = require("./MergeCallConfirm.view.interface");
Object.keys(_MergeCallConfirmView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MergeCallConfirmView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MergeCallConfirmView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
