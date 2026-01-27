"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useCallActionButtons = require("./useCallActionButtons");
Object.keys(_useCallActionButtons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCallActionButtons[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCallActionButtons[key];
    }
  });
});
var _useContactRenderInfo = require("./useContactRenderInfo");
Object.keys(_useContactRenderInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useContactRenderInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useContactRenderInfo[key];
    }
  });
});
//# sourceMappingURL=index.js.map
