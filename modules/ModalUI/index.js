"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ModalUI = require("./ModalUI");
Object.keys(_ModalUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ModalUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ModalUI[key];
    }
  });
});
var _utils = require("./utils");
Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});
//# sourceMappingURL=index.js.map
