"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TierChecker = require("./TierChecker");
Object.keys(_TierChecker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TierChecker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TierChecker[key];
    }
  });
});
var _TierChecker2 = require("./TierChecker.interface");
Object.keys(_TierChecker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TierChecker2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TierChecker2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
