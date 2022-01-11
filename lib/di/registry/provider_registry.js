"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _error = require("../utils/error");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
