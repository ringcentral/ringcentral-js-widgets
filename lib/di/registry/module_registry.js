"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

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
 * Module registry is used to store module metadata.
 */
var ModuleRegistry = /*#__PURE__*/function () {
  function ModuleRegistry() {
    _classCallCheck(this, ModuleRegistry);

    // class reference -> metadata
    this._map = new Map();
  }

  _createClass(ModuleRegistry, [{
    key: "get",
    value: function get(moduleRef) {
      if (!this._map.has(moduleRef)) {
        throw (0, _error.DIError)("Cannot find module [".concat(moduleRef.name, "] in ModuleRegistry"));
      }

      return this._map.get(moduleRef).metadata;
    }
  }, {
    key: "resolved",
    value: function resolved(moduleRef) {
      return this._map.get(moduleRef).resolved;
    }
  }, {
    key: "set",
    value: function set(moduleRef, metadata) {
      if (this._map.has(moduleRef)) {
        throw (0, _error.DIError)("Can only register module [".concat(moduleRef.name, "] once"));
      }

      return this._map.set(moduleRef, {
        metadata: metadata,
        resolved: false
      });
    }
  }, {
    key: "resolve",
    value: function resolve(moduleRef, metadata) {
      if (!this._map.has(moduleRef)) {
        throw (0, _error.DIError)("Cannot resolve module metadata [".concat(moduleRef, "]: module is not found"));
      }

      this._map.set(moduleRef, {
        metadata: metadata,
        resolved: true
      });
    }
  }, {
    key: "has",
    value: function has(moduleRef) {
      return this._map.has(moduleRef);
    }
  }, {
    key: "entries",
    value: function entries() {
      return this._map.entries();
    }
  }, {
    key: "keys",
    value: function keys() {
      return this._map.keys();
    }
  }, {
    key: "reset",
    value: function reset() {
      this._map.clear();
    }
  }]);

  return ModuleRegistry;
}();

exports["default"] = ModuleRegistry;
//# sourceMappingURL=module_registry.js.map
