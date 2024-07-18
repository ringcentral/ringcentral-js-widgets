"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AsYouType", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.AsYouType;
  }
});
Object.defineProperty(exports, "customFormat", {
  enumerable: true,
  get: function get() {
    return _customFormat.customFormat;
  }
});
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
Object.defineProperty(exports, "formatNumber", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.formatNumber;
  }
});
Object.defineProperty(exports, "formatTypes", {
  enumerable: true,
  get: function get() {
    return _format.formatTypes;
  }
});
Object.defineProperty(exports, "getCountryCallingCode", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.getCountryCallingCode;
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
Object.defineProperty(exports, "isUSOrCAOrPR", {
  enumerable: true,
  get: function get() {
    return _format.isUSOrCAOrPR;
  }
});
Object.defineProperty(exports, "isValidNumber", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.isValidNumber;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _parse["default"];
  }
});
Object.defineProperty(exports, "parseIncompletePhoneNumber", {
  enumerable: true,
  get: function get() {
    return _libphonenumberJs.parseIncompletePhoneNumber;
  }
});
var _libphonenumberJs = require("libphonenumber-js");
var _customFormat = require("./lib/customFormat/customFormat");
var _detect = _interopRequireDefault(require("./lib/detect"));
var _format = _interopRequireWildcard(require("./lib/format"));
var _isE = _interopRequireDefault(require("./lib/isE164"));
var _isSameLocalNumber = _interopRequireDefault(require("./lib/isSameLocalNumber"));
var _parse = _interopRequireDefault(require("./lib/parse"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//# sourceMappingURL=index.js.map
