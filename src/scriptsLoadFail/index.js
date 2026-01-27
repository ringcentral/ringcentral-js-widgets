"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getLoadWorkerTemplate = require("./getLoadWorkerTemplate");
Object.keys(_getLoadWorkerTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getLoadWorkerTemplate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getLoadWorkerTemplate[key];
    }
  });
});
var _getScriptsLoadFailTemplate = require("./getScriptsLoadFailTemplate");
Object.keys(_getScriptsLoadFailTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getScriptsLoadFailTemplate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getScriptsLoadFailTemplate[key];
    }
  });
});
var _workerScriptsErrorBannerPlugin = require("./workerScriptsErrorBannerPlugin");
Object.keys(_workerScriptsErrorBannerPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _workerScriptsErrorBannerPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _workerScriptsErrorBannerPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map
