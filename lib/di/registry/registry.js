"use strict";

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

var _is_type = require("../utils/is_type");

var _utils = require("../utils/utils");

var _module_registry = _interopRequireDefault(require("./module_registry"));

var _provider_registry = _interopRequireDefault(require("./provider_registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Registry = /*#__PURE__*/function () {
  function Registry() {
    _classCallCheck(this, Registry);
  }

  _createClass(Registry, null, [{
    key: "registerModule",
    value: function registerModule(klass, metadata) {
      (0, _utils.assert)((0, _is_type.isFunction)(klass), 'Expected module to be a Class');

      if (metadata) {
        (0, _utils.assert)((0, _is_type.isObject)(metadata), 'Expected parameter of @Module() to be an Object');

        if (metadata.deps) {
          (0, _utils.assert)((0, _is_type.isArray)(metadata.deps), "Expected deps to be an Array: [".concat(klass.name, "]\n          ").concat(JSON.stringify(metadata)));
        }
      }

      if (!metadata || Object.keys(metadata).length <= 0) {
        metadata = null;
      }

      this.moduleRegistry.set(klass, metadata);
    }
  }, {
    key: "registerModuleFactory",
    value: function registerModuleFactory(klass, metadata) {
      (0, _utils.assert)(klass && (0, _is_type.isFunction)(klass), 'Expected moduleFactory to be a Class');

      if (metadata) {
        (0, _utils.assert)((0, _is_type.isObject)(metadata), 'Expected parameter of @ModuleFactory() to be an Object');

        if (metadata.providers && !(0, _is_type.isArray)(metadata.providers)) {
          (0, _utils.assert)((0, _is_type.isArray)(metadata.providers), 'Expected providers in @ModuleFactory() to be an Array');
        }
      } else {
        metadata = null;
      } // TODO: validate module providers
      // useValue should be object or number or string, etc.
      // spread can only be used if useValue is an object.
      // Not to check it for now, maybe cause performance issue


      this.providerRegistry.set(klass, metadata);
    }
    /**
     * Process the inheritance relationship of ModuleFactory.
     * Support some inheritance options such as overwrite, merge, etc.
     * ModuleFactory can only inherit from ModuleFactory.
     * @param {Class} currentClass
     */

  }, {
    key: "resolveInheritedModuleFactory",
    value: function resolveInheritedModuleFactory(currentClass) {
      var parentClass = (0, _utils.getParentClass)(currentClass);
      if (!this.providerRegistry.has(currentClass)) return [];

      if (this.providerRegistry.resolved(currentClass)) {
        return this.providerRegistry.get(currentClass).providers;
      }

      var moduleProviderMetadata = this.providerRegistry.get(currentClass);
      var hasProviders = moduleProviderMetadata && (0, _is_type.isArray)(moduleProviderMetadata.providers);
      var providerMetadata = this.mergeProviders(hasProviders ? moduleProviderMetadata.providers : [], this.resolveInheritedModuleFactory(parentClass));
      this.providerRegistry.resolve(currentClass, Object.assign({}, moduleProviderMetadata, {
        providers: providerMetadata
      }));
      return providerMetadata;
    }
    /**
     * Process the inheritance relationship of Module and Library.
     * Module can inherit from Module and Library.
     * @param {Class} currentClass
     * @return {Array} deps - resolved deps
     */

  }, {
    key: "resolveInheritedDependencies",
    value: function resolveInheritedDependencies(currentClass) {
      var parentClass = (0, _utils.getParentClass)(currentClass);
      if (!this.moduleRegistry.has(currentClass)) return [];

      if (this.moduleRegistry.resolved(currentClass)) {
        return this.moduleRegistry.get(currentClass).deps;
      }

      var moduleMetadata = this.moduleRegistry.get(currentClass);
      var hasDeps = moduleMetadata && (0, _is_type.isArray)(moduleMetadata.deps);
      var deps = this.mergeDependencies(hasDeps ? moduleMetadata.deps : [], this.resolveInheritedDependencies(parentClass)); // Update parent class metadata

      this.moduleRegistry.resolve(currentClass, Object.assign({}, moduleMetadata, {
        deps: deps
      }));
      return deps;
    }
    /**
     * A helper function for formating class provider metadata.
     * @param {Object|Function} providerMetadata
     */

  }, {
    key: "_formatClassProvider",
    value: function _formatClassProvider(providerMetadata) {
      var formatted = {};

      if ((0, _is_type.isFunction)(providerMetadata)) {
        formatted = {
          provide: providerMetadata.name,
          useClass: providerMetadata
        };
      } else if ((0, _is_type.isFunction)(providerMetadata.provide)) {
        formatted = {
          provide: providerMetadata.provide.name,
          useClass: providerMetadata.provide
        };
      }

      return Object.assign({}, providerMetadata, formatted);
    }
    /**
     * A helper function for merging child and parent providers.
     * @param {Object|Function} baseProvider
     * @param {Object|Function} parentProvider
     */

  }, {
    key: "mergeProviders",
    value: function mergeProviders(baseProvider, parentProvider) {
      var merged = new Map();

      var _iterator = _createForOfIteratorHelper(parentProvider),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pp = _step.value;
          pp = this._formatClassProvider(pp);
          merged.set(pp.provide, pp);
        } // Merge child providers into parent providers
        // Only support object shallow merge

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(baseProvider),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var p = _step2.value;

          // useValue and don't overwrite parent values
          var _pp = merged.get(p.provide);

          if (_pp && p.useValue && p.merge) {
            (0, _utils.assert)(_pp.useValue, "Expected parent provider of [".concat(p.provide, "] to be a value provider"));
            (0, _utils.assert)((0, _is_type.isObject)(_pp.useValue), "Expected parent provider of [".concat(p.provide, "] to be an Object"));
            p.useValue = Object.assign({}, _pp.useValue, p.useValue);
            merged.set(p.provide, Object.assign({}, _pp, p));
          } else {
            // useClass, useExisting, useFactory will always overwrite parent provider
            p = this._formatClassProvider(p);
            merged.set(p.provide, Object.assign({}, _pp, p));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return Array.from(merged.values());
    }
    /**
     * A helper function for merging child and parent module dependencies.
     * @param {Array} baseDeps
     * @param {Array} parentDeps
     */

  }, {
    key: "mergeDependencies",
    value: function mergeDependencies(baseDeps, parentDeps) {
      var merged = new Map(); // Deps preprocess

      var _iterator3 = _createForOfIteratorHelper(parentDeps),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var parent = _step3.value;

          if (!(0, _is_type.isObject)(parent)) {
            merged.set(parent, {
              dep: parent,
              optional: false
            });
          } else {
            merged.set(parent.dep, parent);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(baseDeps),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var base = _step4.value;

          if (!(0, _is_type.isObject)(base)) {
            base = {
              dep: base,
              optional: false
            };
          }

          if (merged.has(base.dep)) {
            merged.set(base.dep, {
              dep: base.dep,
              optional: base.optional && merged.get(base.dep).optional
            });
          } else {
            merged.set(base.dep, base);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return Array.from(merged.values());
    }
  }]);

  return Registry;
}();

exports["default"] = Registry;
Registry.moduleRegistry = new _module_registry["default"]();
Registry.providerRegistry = new _provider_registry["default"]();
//# sourceMappingURL=registry.js.map
