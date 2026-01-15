"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _StorageBase = require("./StorageBase");
Object.keys(_StorageBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _StorageBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StorageBase[key];
    }
  });
});
var _StorageBase2 = require("./StorageBase.interface");
Object.keys(_StorageBase2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _StorageBase2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StorageBase2[key];
    }
  });
});
var _actionTypesBase = require("./actionTypesBase");
Object.keys(_actionTypesBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _actionTypesBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actionTypesBase[key];
    }
  });
});
var _getStorageReducer = require("./getStorageReducer");
Object.keys(_getStorageReducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getStorageReducer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getStorageReducer[key];
    }
  });
});
//# sourceMappingURL=index.js.map
