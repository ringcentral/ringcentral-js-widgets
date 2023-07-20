"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvSubscription = require("./EvSubscription");
Object.keys(_EvSubscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSubscription[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSubscription[key];
    }
  });
});
var _EvSubscription2 = require("./EvSubscription.interface");
Object.keys(_EvSubscription2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSubscription2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSubscription2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
