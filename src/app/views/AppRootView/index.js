"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AppRoot = require("./AppRoot.view");
Object.keys(_AppRoot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppRoot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AppRoot[key];
    }
  });
});
var _SpringAppRoot = require("./SpringAppRoot.view");
Object.keys(_SpringAppRoot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SpringAppRoot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SpringAppRoot[key];
    }
  });
});
var _viewTransition = require("./viewTransition");
Object.keys(_viewTransition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _viewTransition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _viewTransition[key];
    }
  });
});
//# sourceMappingURL=index.js.map
