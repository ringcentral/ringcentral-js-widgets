"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SearchPanel = require("./SearchPanel");
Object.keys(_SearchPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SearchPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SearchPanel[key];
    }
  });
});
var _SearchResult = require("./SearchResult");
Object.keys(_SearchResult).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SearchResult[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SearchResult[key];
    }
  });
});
//# sourceMappingURL=index.js.map
