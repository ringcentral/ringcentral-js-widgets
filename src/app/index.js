"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getCommonAppConfig = require("./getCommonAppConfig");
Object.keys(_getCommonAppConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getCommonAppConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getCommonAppConfig[key];
    }
  });
});
var _AppView = require("./App.view.interface");
Object.keys(_AppView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AppView[key];
    }
  });
});
var _FakeBrowserURL = require("./FakeBrowserURL");
Object.keys(_FakeBrowserURL).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FakeBrowserURL[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FakeBrowserURL[key];
    }
  });
});
//# sourceMappingURL=index.js.map
