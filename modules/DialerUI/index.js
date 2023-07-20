"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _DialerUI2.DialerUI;
  }
});
var _DialerUI = require("./DialerUI.interface");
Object.keys(_DialerUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DialerUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialerUI[key];
    }
  });
});
var _DialerUI2 = require("./DialerUI");
Object.keys(_DialerUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DialerUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialerUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
