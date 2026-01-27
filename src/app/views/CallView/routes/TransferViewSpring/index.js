"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TransferView = require("./Transfer.view.interface");
Object.keys(_TransferView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TransferView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TransferView[key];
    }
  });
});
var _Transfer = require("./Transfer.view");
Object.keys(_Transfer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Transfer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Transfer[key];
    }
  });
});
//# sourceMappingURL=index.js.map
