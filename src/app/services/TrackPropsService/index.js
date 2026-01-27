"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TrackPropsService = require("./TrackPropsService");
Object.keys(_TrackPropsService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TrackPropsService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TrackPropsService[key];
    }
  });
});
var _TrackPropsService2 = require("./TrackPropsService.interface");
Object.keys(_TrackPropsService2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TrackPropsService2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TrackPropsService2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
