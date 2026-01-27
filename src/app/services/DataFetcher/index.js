"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DataFetcher = require("./DataFetcher");
Object.keys(_DataFetcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataFetcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataFetcher[key];
    }
  });
});
var _DataSource = require("./DataSource");
Object.keys(_DataSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataSource[key];
    }
  });
});
var _sourceStatus = require("./sourceStatus");
Object.keys(_sourceStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sourceStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sourceStatus[key];
    }
  });
});
var _DataFetcher2 = require("./DataFetcher.interface");
Object.keys(_DataFetcher2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataFetcher2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataFetcher2[key];
    }
  });
});
var _DataFetcherConsumer = require("./DataFetcherConsumer");
Object.keys(_DataFetcherConsumer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataFetcherConsumer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataFetcherConsumer[key];
    }
  });
});
var _DataFetcherConsumer2 = require("./DataFetcherConsumer.interface");
Object.keys(_DataFetcherConsumer2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataFetcherConsumer2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataFetcherConsumer2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
