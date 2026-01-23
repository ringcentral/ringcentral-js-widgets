"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _isFilesOverSize = require("./isFilesOverSize");
Object.keys(_isFilesOverSize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isFilesOverSize[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isFilesOverSize[key];
    }
  });
});
var _getMiddleSplit = require("./getMiddleSplit");
Object.keys(_getMiddleSplit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getMiddleSplit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getMiddleSplit[key];
    }
  });
});
//# sourceMappingURL=index.js.map
