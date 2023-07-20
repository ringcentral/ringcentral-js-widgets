"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Timezone = require("./Timezone");
Object.keys(_Timezone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Timezone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Timezone[key];
    }
  });
});
var _Timezone2 = require("./Timezone.interface");
Object.keys(_Timezone2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Timezone2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Timezone2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
