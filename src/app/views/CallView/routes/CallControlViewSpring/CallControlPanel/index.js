"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallControlPanel = require("./CallControlPanel");
Object.keys(_CallControlPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallControlPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallControlPanel[key];
    }
  });
});
var _useCallControlLayout = require("./useCallControlLayout");
Object.keys(_useCallControlLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCallControlLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCallControlLayout[key];
    }
  });
});
//# sourceMappingURL=index.js.map
