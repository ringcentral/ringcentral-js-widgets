"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MessageStore = require("./MessageStore");
Object.keys(_MessageStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MessageStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MessageStore[key];
    }
  });
});
var _MessageStore2 = require("./MessageStore.interface");
Object.keys(_MessageStore2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MessageStore2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MessageStore2[key];
    }
  });
});
var _messageStoreErrors = require("./messageStoreErrors");
Object.keys(_messageStoreErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _messageStoreErrors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _messageStoreErrors[key];
    }
  });
});
//# sourceMappingURL=index.js.map
