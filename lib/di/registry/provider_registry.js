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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-nocheck
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
