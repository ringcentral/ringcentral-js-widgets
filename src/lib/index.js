"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./checkModules");
require("./requestAnimationFramePolyfill");
require("./traceModules");
var _rxjs = require("./rxjs");
Object.keys(_rxjs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _rxjs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rxjs[key];
    }
  });
});
var _RcModule = require("./RcModule");
Object.keys(_RcModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RcModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcModule[key];
    }
  });
});
var _RcViewModule = require("./RcViewModule");
Object.keys(_RcViewModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RcViewModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcViewModule[key];
    }
  });
});
var _applyMethod = require("./applyMethod");
Object.keys(_applyMethod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _applyMethod[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _applyMethod[key];
    }
  });
});
var _decorators = require("./decorators");
Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _decorators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _decorators[key];
    }
  });
});
var _isSharedWorker = require("./isSharedWorker");
Object.keys(_isSharedWorker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isSharedWorker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isSharedWorker[key];
    }
  });
});
var _isWebWorker = require("./isWebWorker");
Object.keys(_isWebWorker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isWebWorker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isWebWorker[key];
    }
  });
});
var _logger = require("./logger");
Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _logger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logger[key];
    }
  });
});
//# sourceMappingURL=index.js.map
