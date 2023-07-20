"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _phoneSources = require("@ringcentral-integration/commons/enums/phoneSources");
Object.keys(_phoneSources).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _phoneSources[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _phoneSources[key];
    }
  });
});
//# sourceMappingURL=phoneSources.js.map
