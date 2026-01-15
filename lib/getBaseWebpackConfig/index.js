"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getBaseWebpackConfig = require("./getBaseWebpackConfig");
Object.keys(_getBaseWebpackConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getBaseWebpackConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getBaseWebpackConfig[key];
    }
  });
});
var _WebpackCommandPlugin = require("./WebpackCommandPlugin");
Object.keys(_WebpackCommandPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WebpackCommandPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WebpackCommandPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map
