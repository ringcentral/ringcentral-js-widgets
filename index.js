"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "consolidateLocale", {
  enumerable: true,
  get: function get() {
    return _consolidateLocale["default"];
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _localeLoader["default"];
  }
});
Object.defineProperty(exports, "exportLocale", {
  enumerable: true,
  get: function get() {
    return _exportLocale["default"];
  }
});
Object.defineProperty(exports, "importLocale", {
  enumerable: true,
  get: function get() {
    return _importLocale["default"];
  }
});
Object.defineProperty(exports, "transformLoader", {
  enumerable: true,
  get: function get() {
    return _transformLoader["default"];
  }
});

var _localeLoader = _interopRequireDefault(require("./lib/localeLoader"));

var _exportLocale = _interopRequireDefault(require("./lib/exportLocale"));

var _importLocale = _interopRequireDefault(require("./lib/importLocale"));

var _consolidateLocale = _interopRequireDefault(require("./lib/consolidateLocale"));

var _transformLoader = _interopRequireDefault(require("./lib/transformLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//# sourceMappingURL=index.js.map
