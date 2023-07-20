"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _callLogPanel = require("./callLogPanel.sample");
Object.keys(_callLogPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callLogPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callLogPanel[key];
    }
  });
});
var _currentCall = require("./currentCall.sample");
Object.keys(_currentCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _currentCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _currentCall[key];
    }
  });
});
//# sourceMappingURL=index.js.map
