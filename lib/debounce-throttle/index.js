"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _debounce = require("./debounce");
Object.keys(_debounce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _debounce[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _debounce[key];
    }
  });
});
var _throttle = require("./throttle");
Object.keys(_throttle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _throttle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _throttle[key];
    }
  });
});
var _promisedDebounce = require("./promisedDebounce");
Object.keys(_promisedDebounce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _promisedDebounce[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promisedDebounce[key];
    }
  });
});
var _promisedThrottle = require("./promisedThrottle");
Object.keys(_promisedThrottle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _promisedThrottle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promisedThrottle[key];
    }
  });
});
//# sourceMappingURL=index.js.map
