"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DialingPlan = require("./DialingPlan");
Object.keys(_DialingPlan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialingPlan[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialingPlan[key];
    }
  });
});
var _DialingPlan2 = require("./DialingPlan.interface");
Object.keys(_DialingPlan2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialingPlan2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialingPlan2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
