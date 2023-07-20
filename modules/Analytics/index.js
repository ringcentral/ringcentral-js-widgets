"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Analytics = require("./Analytics");
Object.keys(_Analytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Analytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Analytics[key];
    }
  });
});
var _trackEvents = require("./trackEvents");
Object.keys(_trackEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _trackEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _trackEvents[key];
    }
  });
});
//# sourceMappingURL=index.js.map
