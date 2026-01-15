"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _IncomingCallUI = require("./IncomingCallUI");
Object.keys(_IncomingCallUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IncomingCallUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IncomingCallUI[key];
    }
  });
});
var _IncomingCallUI2 = require("./IncomingCallUI.interface");
Object.keys(_IncomingCallUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IncomingCallUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IncomingCallUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
