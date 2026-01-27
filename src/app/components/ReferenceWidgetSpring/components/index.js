"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ReferencePopper = require("./ReferencePopper");
Object.keys(_ReferencePopper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ReferencePopper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReferencePopper[key];
    }
  });
});
var _ReferenceSearchPanel = require("./ReferenceSearchPanel");
Object.keys(_ReferenceSearchPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ReferenceSearchPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReferenceSearchPanel[key];
    }
  });
});
var _ReferenceList = require("./ReferenceList");
Object.keys(_ReferenceList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ReferenceList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReferenceList[key];
    }
  });
});
//# sourceMappingURL=index.js.map
