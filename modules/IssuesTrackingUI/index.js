"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _IssuesTrackingUI = require("./IssuesTrackingUI");
Object.keys(_IssuesTrackingUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IssuesTrackingUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IssuesTrackingUI[key];
    }
  });
});
var _IssuesTrackingUI2 = require("./IssuesTrackingUI.interface");
Object.keys(_IssuesTrackingUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IssuesTrackingUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IssuesTrackingUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
