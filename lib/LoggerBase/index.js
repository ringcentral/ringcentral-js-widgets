"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _LoggerBase = require("./LoggerBase");
Object.keys(_LoggerBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LoggerBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LoggerBase[key];
    }
  });
});
var _LoggerBase2 = require("./LoggerBase.interface");
Object.keys(_LoggerBase2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LoggerBase2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LoggerBase2[key];
    }
  });
});
var _loggerBaseHelper = require("./loggerBaseHelper");
Object.keys(_loggerBaseHelper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _loggerBaseHelper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loggerBaseHelper[key];
    }
  });
});
//# sourceMappingURL=index.js.map
