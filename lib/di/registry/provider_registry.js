"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.map");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _error = require("../utils/error");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // @ts-nocheck
/**
 * ProviderRegistry is a centralized structure for storing provider metadata.
 * It's a map data structure mapping Token to Provider.
 */
var ProviderRegistry = /*#__PURE__*/function () {
  function ProviderRegistry() {
    _classCallCheck(this, ProviderRegistry);
    this._map = new Map();
  }
  _createClass(ProviderRegistry, [{
    key: "get",
    value: function get(token) {
      if (!this._map.has(token)) {
        throw (0, _error.DIError)("Can not find token [".concat(token, "] in ProviderRegistry"));
      }
      return this._map.get(token).providers;
    }
  }, {
    key: "set",
    value: function set(token, providers) {
      if (this._map.has(token)) {
        throw (0, _error.DIError)("Can only register [".concat(token, "] once"));
      }
      return this._map.set(token, {
        providers: providers,
        resolved: false
      });
    }
  }, {
    key: "resolved",
    value: function resolved(token) {
      return !!this._map.get(token).resolved;
    }
  }, {
    key: "resolve",
    value: function resolve(token, providers) {
      if (!this._map.has(token)) {
        throw (0, _error.DIError)("Cannot resolve provider metadata [".concat(token, "]: providers is not found"));
      }
      this._map.set(token, {
        providers: providers,
        resolved: true
      });
    }
  }, {
    key: "has",
    value: function has(token) {
      return this._map.has(token);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._map.clear();
    }
  }]);
  return ProviderRegistry;
}();
exports["default"] = ProviderRegistry;
//# sourceMappingURL=provider_registry.js.map
