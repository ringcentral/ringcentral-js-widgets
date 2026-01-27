"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MessageStoreEventSubscriber = require("./MessageStoreEventSubscriber");
Object.keys(_MessageStoreEventSubscriber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MessageStoreEventSubscriber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MessageStoreEventSubscriber[key];
    }
  });
});
var _MessageStoreEventSubscriber2 = require("./MessageStoreEventSubscriber.interface");
Object.keys(_MessageStoreEventSubscriber2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MessageStoreEventSubscriber2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MessageStoreEventSubscriber2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
