"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _action = require("./action");
Object.keys(_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _action[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _action[key];
    }
  });
});
var _computed = require("./computed");
Object.keys(_computed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _computed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _computed[key];
    }
  });
});
var _state = require("./state");
Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _state[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _state[key];
    }
  });
});
//# sourceMappingURL=index.js.map
