"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _WebSocketSubscription = require("./WebSocketSubscription.interface");
Object.keys(_WebSocketSubscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WebSocketSubscription[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WebSocketSubscription[key];
    }
  });
});
var _WebSocketSubscription2 = require("./WebSocketSubscription");
Object.keys(_WebSocketSubscription2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WebSocketSubscription2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WebSocketSubscription2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
