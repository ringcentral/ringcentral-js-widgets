"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Softphone = require("./Softphone");
Object.keys(_Softphone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Softphone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Softphone[key];
    }
  });
});
var _Softphone2 = require("./Softphone.interface");
Object.keys(_Softphone2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Softphone2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Softphone2[key];
    }
  });
});
var _softphoneStatus = require("./softphoneStatus");
Object.keys(_softphoneStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _softphoneStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _softphoneStatus[key];
    }
  });
});
//# sourceMappingURL=index.js.map
