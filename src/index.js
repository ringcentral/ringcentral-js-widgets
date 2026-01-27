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
var _getPrimaryColor = require("./getPrimaryColor");
Object.keys(_getPrimaryColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getPrimaryColor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getPrimaryColor[key];
    }
  });
});
var _getProjectConfig = require("./getProjectConfig");
Object.keys(_getProjectConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getProjectConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getProjectConfig[key];
    }
  });
});
var _scriptsLoadFail = require("./scriptsLoadFail");
Object.keys(_scriptsLoadFail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _scriptsLoadFail[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scriptsLoadFail[key];
    }
  });
});
var _startDevServer = require("./startDevServer");
Object.keys(_startDevServer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _startDevServer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _startDevServer[key];
    }
  });
});
//# sourceMappingURL=index.js.map
