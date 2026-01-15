"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _fullSize = require("./full-size");
Object.keys(_fullSize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fullSize[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fullSize[key];
    }
  });
});
var _noSelect = require("./no-select");
Object.keys(_noSelect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _noSelect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _noSelect[key];
    }
  });
});
var _reset = require("./reset");
Object.keys(_reset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _reset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reset[key];
    }
  });
});
var _normalize = require("./normalize");
Object.keys(_normalize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _normalize[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _normalize[key];
    }
  });
});
//# sourceMappingURL=index.js.map
