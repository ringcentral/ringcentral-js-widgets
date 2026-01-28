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
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form2["default"];
  }
});
Object.defineProperty(exports, "Templates", {
  enumerable: true,
  get: function get() {
    return _Templates["default"];
  }
});
Object.defineProperty(exports, "Theme", {
  enumerable: true,
  get: function get() {
    return _Theme["default"];
  }
});
Object.defineProperty(exports, "Widgets", {
  enumerable: true,
  get: function get() {
    return _Widgets["default"];
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "generateForm", {
  enumerable: true,
  get: function get() {
    return _Form2.generateForm;
  }
});
Object.defineProperty(exports, "generateTemplates", {
  enumerable: true,
  get: function get() {
    return _Templates.generateTemplates;
  }
});
Object.defineProperty(exports, "generateTheme", {
  enumerable: true,
  get: function get() {
    return _Theme.generateTheme;
  }
});
Object.defineProperty(exports, "generateWidgets", {
  enumerable: true,
  get: function get() {
    return _Widgets.generateWidgets;
  }
});
var _Form = _interopRequireDefault(require("./Form/Form"));
var _Form2 = _interopRequireWildcard(require("./Form"));
var _Templates = _interopRequireWildcard(require("./Templates"));
var _Theme = _interopRequireWildcard(require("./Theme"));
var _Widgets = _interopRequireWildcard(require("./Widgets"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = _Form["default"];
//# sourceMappingURL=index.js.map
