"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _src = require("./src");
Object.keys(_src).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _src[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _src[key];
    }
  });
});
var _replaceI18nInlineObject = require("./scripts/replaceI18nInlineObject");
Object.keys(_replaceI18nInlineObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _replaceI18nInlineObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _replaceI18nInlineObject[key];
    }
  });
});
var _downloadFileToPath = require("./scripts/downloadFileToPath");
Object.keys(_downloadFileToPath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _downloadFileToPath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _downloadFileToPath[key];
    }
  });
});
var _loadingAnimate = require("./scripts/loadingAnimate");
Object.keys(_loadingAnimate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _loadingAnimate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loadingAnimate[key];
    }
  });
});
//# sourceMappingURL=index.js.map
