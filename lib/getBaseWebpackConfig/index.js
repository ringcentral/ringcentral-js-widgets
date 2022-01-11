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
