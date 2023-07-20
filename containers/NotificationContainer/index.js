"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _NotificationContainer = require("./NotificationContainer");
Object.keys(_NotificationContainer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NotificationContainer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NotificationContainer[key];
    }
  });
});
//# sourceMappingURL=index.js.map
