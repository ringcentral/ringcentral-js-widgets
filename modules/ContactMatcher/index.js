"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ContactMatcher = require("./ContactMatcher");
Object.keys(_ContactMatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactMatcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactMatcher[key];
    }
  });
});
var _ContactMatcher2 = require("./ContactMatcher.interface");
Object.keys(_ContactMatcher2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactMatcher2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactMatcher2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
