"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallLogForm = require("./CallLogForm.view");
Object.keys(_CallLogForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogForm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogForm[key];
    }
  });
});
var _CallLogFormView = require("./CallLogForm.view.interface");
Object.keys(_CallLogFormView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogFormView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogFormView[key];
    }
  });
});
var _CallLogFormEvents = require("./CallLogFormEvents");
Object.keys(_CallLogFormEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogFormEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogFormEvents[key];
    }
  });
});
//# sourceMappingURL=index.js.map
