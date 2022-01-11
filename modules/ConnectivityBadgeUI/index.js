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

var _ConnectivityBadgeUI = require("./ConnectivityBadgeUI.interface");

Object.keys(_ConnectivityBadgeUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityBadgeUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityBadgeUI[key];
    }
  });
});

var _ConnectivityBadgeUI2 = require("./ConnectivityBadgeUI");

Object.keys(_ConnectivityBadgeUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityBadgeUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityBadgeUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
