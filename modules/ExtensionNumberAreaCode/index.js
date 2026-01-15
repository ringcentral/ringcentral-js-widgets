"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ExtensionNumberAreaCode = require("./ExtensionNumberAreaCode.interface");
Object.keys(_ExtensionNumberAreaCode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionNumberAreaCode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionNumberAreaCode[key];
    }
  });
});
var _ExtensionNumberAreaCode2 = require("./ExtensionNumberAreaCode");
Object.keys(_ExtensionNumberAreaCode2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionNumberAreaCode2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionNumberAreaCode2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
