"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isValidNumber", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.isValidNumber;
  }
});
Object.defineProperty(exports, "parseIncompletePhoneNumber", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.parseIncompletePhoneNumber;
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
Object.defineProperty(exports, "detect", {
  enumerable: true,
  get: function get() {
    return _detect["default"];
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _parse["default"];
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

var _libphonenumberJs = require("libphonenumber-js");

var _format = _interopRequireWildcard(require("./lib/format"));

var _detect = _interopRequireDefault(require("./lib/detect"));

var _parse = _interopRequireDefault(require("./lib/parse"));

var _isE = _interopRequireDefault(require("./lib/isE164"));

var _isSameLocalNumber = _interopRequireDefault(require("./lib/isSameLocalNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=index.js.map
