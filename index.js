"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  format: true,
  formatTypes: true,
  detect: true,
  parse: true,
  isE164: true,
  isSameLocalNumber: true
};
Object.defineProperty(exports, "detect", {
  enumerable: true,
  get: function get() {
    return _detect["default"];
  }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function get() {
    return _format["default"];
  }
});
Object.defineProperty(exports, "formatTypes", {
  enumerable: true,
  get: function get() {
    return _format.formatTypes;
  }
});
Object.defineProperty(exports, "isE164", {
  enumerable: true,
  get: function get() {
    return _isE["default"];
  }
});
Object.defineProperty(exports, "isSameLocalNumber", {
  enumerable: true,
  get: function get() {
    return _isSameLocalNumber["default"];
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _parse["default"];
  }
});

var _format = _interopRequireWildcard(require("./lib/format"));

var _detect = _interopRequireDefault(require("./lib/detect"));

var _parse = _interopRequireDefault(require("./lib/parse"));

var _isE = _interopRequireDefault(require("./lib/isE164"));

var _isSameLocalNumber = _interopRequireDefault(require("./lib/isSameLocalNumber"));

var _libphonenumberJs = require("libphonenumber-js");

Object.keys(_libphonenumberJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _libphonenumberJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _libphonenumberJs[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=index.js.map
