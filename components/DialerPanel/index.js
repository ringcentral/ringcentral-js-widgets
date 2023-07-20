"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Dialer = require("./Dialer");
Object.keys(_Dialer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Dialer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Dialer[key];
    }
  });
});
var _DialerPanel = require("./DialerPanel");
Object.keys(_DialerPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialerPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialerPanel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
