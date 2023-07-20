"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _FeedbackUI = require("./FeedbackUI");
Object.keys(_FeedbackUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FeedbackUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FeedbackUI[key];
    }
  });
});
var _FeedbackUI2 = require("./FeedbackUI.interface");
Object.keys(_FeedbackUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FeedbackUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FeedbackUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
