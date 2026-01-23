"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
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
var _delegate = require("./delegate");
Object.keys(_delegate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _delegate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _delegate[key];
    }
  });
});
var _globalStorage = require("./globalStorage");
Object.keys(_globalStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _globalStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _globalStorage[key];
    }
  });
});
var _injectable = require("./injectable");
Object.keys(_injectable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _injectable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _injectable[key];
    }
  });
});
var _localStorage = require("./localStorage");
Object.keys(_localStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _localStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _localStorage[key];
    }
  });
});
var _storage = require("./storage");
Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _storage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _storage[key];
    }
  });
});
var _userStorage = require("./userStorage");
Object.keys(_userStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _userStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userStorage[key];
    }
  });
});
//# sourceMappingURL=index.js.map
