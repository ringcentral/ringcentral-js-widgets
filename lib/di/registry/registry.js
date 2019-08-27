"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

var _module_registry = _interopRequireDefault(require("./module_registry"));

var _provider_registry = _interopRequireDefault(require("./provider_registry"));

var _utils = require("../utils/utils");

var _is_type = require("../utils/is_type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Registry =
/*#__PURE__*/
function () {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parentProvider[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pp = _step.value;
          pp = this._formatClassProvider(pp);
          merged.set(pp.provide, pp);
        } // Merge child providers into parent providers
        // Only support object shallow merge

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = baseProvider[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = parentDeps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = baseDeps[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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
