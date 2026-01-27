"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _UIFCallLogForm = require("./UIFCallLogForm");
Object.keys(_UIFCallLogForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UIFCallLogForm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UIFCallLogForm[key];
    }
  });
});
var _UIFCallLogForm2 = require("./UIFCallLogForm.interface");
Object.keys(_UIFCallLogForm2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UIFCallLogForm2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UIFCallLogForm2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
