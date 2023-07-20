"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvAgentScript = require("./EvAgentScript.interface");
Object.keys(_EvAgentScript).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAgentScript[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAgentScript[key];
    }
  });
});
var _EvAgentScript2 = require("./EvAgentScript");
Object.keys(_EvAgentScript2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAgentScript2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAgentScript2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
