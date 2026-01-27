"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getCssVariablesFromObject = require("./getCssVariablesFromObject");
Object.keys(_getCssVariablesFromObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getCssVariablesFromObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getCssVariablesFromObject[key];
    }
  });
});
var _getThemeColor = require("./getThemeColor");
Object.keys(_getThemeColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getThemeColor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getThemeColor[key];
    }
  });
});
//# sourceMappingURL=index.js.map
