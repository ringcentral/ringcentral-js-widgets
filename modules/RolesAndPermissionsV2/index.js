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

var _RolesAndPermissions = require("./RolesAndPermissions");

Object.keys(_RolesAndPermissions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RolesAndPermissions[key];
    }
  });
});

var _RolesAndPermissions2 = require("./RolesAndPermissions.interface");

Object.keys(_RolesAndPermissions2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RolesAndPermissions2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
