"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  applyPatches: true
};
Object.defineProperty(exports, "applyPatches", {
  enumerable: true,
  get: function get() {
    return _immer.applyPatches;
  }
});

var _immer = require("immer");

var _RcModule = require("./RcModule");

Object.keys(_RcModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RcModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcModule[key];
    }
  });
});

var _RcUIModule = require("./RcUIModule");

Object.keys(_RcUIModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RcUIModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcUIModule[key];
    }
  });
});

var _computed = require("./computed");

Object.keys(_computed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _computed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _computed[key];
    }
  });
});

var _subscribe = require("./subscribe");

Object.keys(_subscribe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _subscribe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _subscribe[key];
    }
  });
});
//# sourceMappingURL=index.js.map
