"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MergeCallConfirmation = require("./MergeCallConfirmation.interface");
Object.keys(_MergeCallConfirmation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MergeCallConfirmation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MergeCallConfirmation[key];
    }
  });
});
var _MergeCallConfirmation2 = require("./MergeCallConfirmation");
Object.keys(_MergeCallConfirmation2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MergeCallConfirmation2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MergeCallConfirmation2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
