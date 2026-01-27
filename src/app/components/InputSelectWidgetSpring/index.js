"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _InputSelectWidget = require("./InputSelectWidget");
Object.keys(_InputSelectWidget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputSelectWidget[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputSelectWidget[key];
    }
  });
});
var _InputSelectWidget2 = require("./InputSelectWidget.interface");
Object.keys(_InputSelectWidget2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputSelectWidget2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputSelectWidget2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
