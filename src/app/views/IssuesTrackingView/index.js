"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _IssuesTracking = require("./IssuesTracking.view");
Object.keys(_IssuesTracking).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IssuesTracking[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IssuesTracking[key];
    }
  });
});
var _IssuesTrackingView = require("./IssuesTracking.view.interface");
Object.keys(_IssuesTrackingView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IssuesTrackingView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IssuesTrackingView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
