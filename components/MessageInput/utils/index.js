"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getTextFieldInsertResult = require("./getTextFieldInsertResult");
Object.keys(_getTextFieldInsertResult).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getTextFieldInsertResult[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getTextFieldInsertResult[key];
    }
  });
});
var _setNativeValue = require("./setNativeValue");
Object.keys(_setNativeValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setNativeValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setNativeValue[key];
    }
  });
});
//# sourceMappingURL=index.js.map
