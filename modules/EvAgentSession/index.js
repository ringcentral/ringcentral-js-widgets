"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvAgentSession = require("./EvAgentSession.interface");
Object.keys(_EvAgentSession).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAgentSession[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAgentSession[key];
    }
  });
});
var _EvAgentSession2 = require("./EvAgentSession");
Object.keys(_EvAgentSession2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAgentSession2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAgentSession2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
