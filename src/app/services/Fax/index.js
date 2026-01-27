"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _FaxMessageStore = require("./FaxMessageStore");
Object.keys(_FaxMessageStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FaxMessageStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FaxMessageStore[key];
    }
  });
});
var _FaxMessageStore2 = require("./FaxMessageStore.interface");
Object.keys(_FaxMessageStore2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FaxMessageStore2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FaxMessageStore2[key];
    }
  });
});
var _FaxConversations = require("./FaxConversations");
Object.keys(_FaxConversations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FaxConversations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FaxConversations[key];
    }
  });
});
var _FaxSender = require("./FaxSender");
Object.keys(_FaxSender).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FaxSender[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FaxSender[key];
    }
  });
});
var _FaxSender2 = require("./FaxSender.interface");
Object.keys(_FaxSender2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FaxSender2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FaxSender2[key];
    }
  });
});
var _FaxFilter = require("./FaxFilter.interface");
Object.keys(_FaxFilter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FaxFilter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FaxFilter[key];
    }
  });
});
//# sourceMappingURL=index.js.map
