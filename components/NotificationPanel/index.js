"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _NotificationPanel = require("./NotificationPanel");
Object.keys(_NotificationPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NotificationPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NotificationPanel[key];
    }
  });
});
var _NotificationPanel2 = require("./NotificationPanel.interface");
Object.keys(_NotificationPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NotificationPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NotificationPanel2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
