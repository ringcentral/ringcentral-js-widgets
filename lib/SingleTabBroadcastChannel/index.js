"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SingleTabBroadcastChannel = require("./SingleTabBroadcastChannel");
Object.keys(_SingleTabBroadcastChannel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SingleTabBroadcastChannel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SingleTabBroadcastChannel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
