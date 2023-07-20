"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Brand = require("./Brand");
Object.keys(_Brand).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Brand[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Brand[key];
    }
  });
});
var _Brand2 = require("./Brand.interface");
Object.keys(_Brand2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Brand2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Brand2[key];
    }
  });
});
var _BrandConfig = require("./BrandConfig.interface");
Object.keys(_BrandConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BrandConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BrandConfig[key];
    }
  });
});
var _createBrandConfig = require("./createBrandConfig");
Object.keys(_createBrandConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createBrandConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createBrandConfig[key];
    }
  });
});
var _defaultBrandConfig = require("./defaultBrandConfig");
Object.keys(_defaultBrandConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _defaultBrandConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaultBrandConfig[key];
    }
  });
});
//# sourceMappingURL=index.js.map
