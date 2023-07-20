"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvDialerUI = require("./EvDialerUI");
Object.keys(_EvDialerUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvDialerUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvDialerUI[key];
    }
  });
});
var _EvDialerUI2 = require("./EvDialerUI.interface");
Object.keys(_EvDialerUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvDialerUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvDialerUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
