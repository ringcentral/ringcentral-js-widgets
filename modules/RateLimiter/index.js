"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RateLimiter = require("./RateLimiter");
Object.keys(_RateLimiter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RateLimiter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RateLimiter[key];
    }
  });
});
var _RateLimiter2 = require("./RateLimiter.interface");
Object.keys(_RateLimiter2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RateLimiter2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RateLimiter2[key];
    }
  });
});
var _errorMessages = require("./errorMessages");
Object.keys(_errorMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _errorMessages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errorMessages[key];
    }
  });
});
//# sourceMappingURL=index.js.map
