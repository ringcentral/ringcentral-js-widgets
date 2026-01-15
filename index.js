"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//# sourceMappingURL=index.js.map
