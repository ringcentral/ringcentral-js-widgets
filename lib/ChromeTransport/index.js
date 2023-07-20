"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ClientTransport = require("./ClientTransport");
Object.keys(_ClientTransport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ClientTransport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ClientTransport[key];
    }
  });
});
var _ServerTransport = require("./ServerTransport");
Object.keys(_ServerTransport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ServerTransport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ServerTransport[key];
    }
  });
});
//# sourceMappingURL=index.js.map
