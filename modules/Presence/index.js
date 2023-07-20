"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Presence = require("./Presence.interface");
Object.keys(_Presence).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Presence[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Presence[key];
    }
  });
});
var _Presence2 = require("./Presence");
Object.keys(_Presence2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Presence2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Presence2[key];
    }
  });
});
var _dndStatus = require("./dndStatus");
Object.keys(_dndStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dndStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dndStatus[key];
    }
  });
});
var _removeIntermediateCall = require("./removeIntermediateCall");
Object.keys(_removeIntermediateCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _removeIntermediateCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _removeIntermediateCall[key];
    }
  });
});
//# sourceMappingURL=index.js.map
