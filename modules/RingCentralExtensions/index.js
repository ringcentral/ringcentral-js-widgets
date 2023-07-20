"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _webSocketReadyStates = require("./webSocketReadyStates");
Object.keys(_webSocketReadyStates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _webSocketReadyStates[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _webSocketReadyStates[key];
    }
  });
});
var _RingCentralExtensions = require("./RingCentralExtensions.interface");
Object.keys(_RingCentralExtensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingCentralExtensions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingCentralExtensions[key];
    }
  });
});
var _RingCentralExtensions2 = require("./RingCentralExtensions");
Object.keys(_RingCentralExtensions2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingCentralExtensions2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingCentralExtensions2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
