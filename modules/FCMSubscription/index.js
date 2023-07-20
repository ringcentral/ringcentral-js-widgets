"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _FCMSubscription = require("./FCMSubscription");
Object.keys(_FCMSubscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FCMSubscription[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FCMSubscription[key];
    }
  });
});
var _FCMSubscription2 = require("./FCMSubscription.interface");
Object.keys(_FCMSubscription2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FCMSubscription2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FCMSubscription2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
