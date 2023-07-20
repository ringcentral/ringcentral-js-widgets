"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Feedback = require("./Feedback");
Object.keys(_Feedback).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Feedback[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Feedback[key];
    }
  });
});
var _Feedback2 = require("./Feedback.interface");
Object.keys(_Feedback2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Feedback2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Feedback2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
