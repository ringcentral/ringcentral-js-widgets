"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Subscription = require("./Subscription.interface");
Object.keys(_Subscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Subscription[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Subscription[key];
    }
  });
});
var _Subscription2 = require("./Subscription");
Object.keys(_Subscription2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Subscription2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Subscription2[key];
    }
  });
});
var _normalizeEventFilter = require("./normalizeEventFilter");
Object.keys(_normalizeEventFilter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _normalizeEventFilter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _normalizeEventFilter[key];
    }
  });
});
var _subscriptionStatus = require("./subscriptionStatus");
Object.keys(_subscriptionStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _subscriptionStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _subscriptionStatus[key];
    }
  });
});
//# sourceMappingURL=index.js.map
