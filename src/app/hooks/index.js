"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useLocale = require("./useLocale");
Object.keys(_useLocale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useLocale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useLocale[key];
    }
  });
});
var _usePerfTrack = require("./usePerfTrack");
Object.keys(_usePerfTrack).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _usePerfTrack[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _usePerfTrack[key];
    }
  });
});
//# sourceMappingURL=index.js.map
