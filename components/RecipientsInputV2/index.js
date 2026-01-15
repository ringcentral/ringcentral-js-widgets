"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RecipientsInputV = require("./RecipientsInputV2");
Object.keys(_RecipientsInputV).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecipientsInputV[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecipientsInputV[key];
    }
  });
});
var _RecipientsInputV2 = require("./RecipientsInputV2.interface");
Object.keys(_RecipientsInputV2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecipientsInputV2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecipientsInputV2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
