"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvAnalytics = require("./EvAnalytics");
Object.keys(_EvAnalytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAnalytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAnalytics[key];
    }
  });
});
var _EvAnalytics2 = require("./EvAnalytics.interface");
Object.keys(_EvAnalytics2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvAnalytics2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvAnalytics2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
