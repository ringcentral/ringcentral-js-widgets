"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ExtensionPhoneNumber = require("./ExtensionPhoneNumber");
Object.keys(_ExtensionPhoneNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionPhoneNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionPhoneNumber[key];
    }
  });
});
var _ExtensionPhoneNumber2 = require("./ExtensionPhoneNumber.interface");
Object.keys(_ExtensionPhoneNumber2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionPhoneNumber2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionPhoneNumber2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
