"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ForwardingNumber = require("./ForwardingNumber");
Object.keys(_ForwardingNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ForwardingNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ForwardingNumber[key];
    }
  });
});
var _ForwardingNumber2 = require("./ForwardingNumber.interface");
Object.keys(_ForwardingNumber2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ForwardingNumber2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ForwardingNumber2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
