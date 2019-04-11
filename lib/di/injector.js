"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Injector = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.set");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _redux = require("redux");

var _container = _interopRequireDefault(require("./container"));

var _registry = _interopRequireDefault(require("./registry/registry"));

var _provider2 = require("./provider");

var _utils = require("./utils/utils");

var _error = require("./utils/error");

var _is_type = require("./utils/is_type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var REDUCER_LITERAL = '_reducer';
var PROXY_REDUCER_LITERAL = '_proxyReducer';
var STATE_FUNC_LITERAL = '_getState';
var PROXY_STATE_FUNC_LITERAL = '_getProxyState';
/**
 * Injector is used for injecting providers to modules.
 * Hierarchical provider injection is supported.
 */

var Injector =
/*#__PURE__*/
function () {
  function Injector() {
    _classCallCheck(this, Injector);

    this.targetClass = null;
    this.parentInjector = null;
    this.moduleRegistry = _registry.default.moduleRegistry;
    this.providerRegistry = _registry.default.providerRegistry;
    this.container = new _container.default();
    this.universalProviders = new Map();
  }
  /**
   * Resolve module providers recursively.
   * May search for providers in parent injector.
   * @param {Provider} provider
   * @param {Set} pending - process record
   */


  _createClass(Injector, [{
    key: "resolveModuleProvider",
    value: function resolveModuleProvider(provider) {
      var pending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Injector.pending;
      var container = this.container;
      (0, _utils.assert)(provider, 'Expected valid provider', provider); // Provider has already been resolved

      if (container.localHas(provider.token)) return; // useExisting provider needs to resolve existing providers instead of itself

      if (provider instanceof _provider2.ExistingProvider) {
        if (pending.has(provider)) {
          throw (0, _error.CircularDependencyError)(pending, provider.token);
        }

        if (this.universalProviders.has(provider.useExisting)) {
          pending.add(provider);
          this.resolveModuleProvider(this.universalProviders.get(provider.useExisting));
          pending.delete(provider);
        }

        if (container.localHas(provider.useExisting)) {
          container.set(provider.token, container.localGet(provider.useExisting));
        } else {
          throw (0, _error.DIError)("ExistingProvider [".concat(provider.useExisting, "] is not found"));
        }

        return;
      } // If provider exists in ancestor injectors,
      // then it should create a reference to that provider locally.


      if (container.has(provider.token)) {
        container.set(provider.token, container.get(provider.token));
        return;
      }

      if (!this.universalProviders.has(provider.token)) {
        if (this.parentInjector) {
          this.parentInjector.resolveModuleProvider(provider);
        }
      }

      if (provider instanceof _provider2.ValueProvider) {
        container.set(provider.token, provider);
      } else if (provider instanceof _provider2.FactoryProvider) {
        pending.add(provider.token); // eslint-disable-next-line

        var deps = provider.deps.map(function (dep) {
          return (0, _is_type.isObject)(dep) ? dep : {
            dep: dep,
            optional: false
          };
        });
        var dependencies = this.resolveDependencies(deps, pending);
        var factoryProvider = provider.func.call(null, dependencies);
        provider.setInstance(factoryProvider);
        container.set(provider.token, provider);
        pending.delete(provider.token);
      } else if (provider instanceof _provider2.ClassProvider) {
        if (this.moduleRegistry.has(provider.klass)) {
          var _deps = _registry.default.resolveInheritedDependencies(provider.klass) || [];

          var Klass = provider.klass;
          pending.add(provider.token);

          var _dependencies = this.resolveDependencies(_deps, pending);

          var instance = new Klass(_dependencies);
          provider.setInstance(instance);
          container.set(provider.token, provider);
          pending.delete(provider.token);
        } else if (provider instanceof _provider2.ClassProvider && this.providerRegistry.has(provider.klass)) {
          // Depends on moduleFactory provider
          this.resolveModuleFactoryProvider(provider);
        } else {
          throw (0, _error.DIError)("Provider [".concat(provider.token, "] can not be resolved, module is not found"));
        }
      }
    }
    /**
     * Resolve module dependencies recursively.
     * If module is not optional and can not be resolved, then DIError will be thrown
     * @param {Array} deps - module dependencies
     * @param {Set} pending - process record
     */

  }, {
    key: "resolveDependencies",
    value: function resolveDependencies(deps, pending) {
      var dependencies = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref2 = _step.value;
          var dep = _ref2.dep,
              optional = _ref2.optional;

          if (pending.has(dep)) {
            throw (0, _error.CircularDependencyError)(pending, dep);
          }

          if (!this.container.has(dep)) {
            if (this.universalProviders.has(dep)) {
              var dependentModuleProvider = this.universalProviders.get(dep);
              this.resolveModuleProvider(dependentModuleProvider);
            } else if (this.parentInjector) {
              // Dependent module provider can not be found locally,
              // try to resolve provider in ancestor injectors.
              this.parentInjector.resolveModuleProviderForChildren(dep);
            }
          } // If the dependency is optional but Provider is found, then try to inject the dependency.
          // Otherwise, if provider is not found, then just ignore.
          // If the dependency is not optional and Provider is found, then try to inject the dependency.
          // Otherwise, if the Provider is not found, then an Error should be thrown.


          if (!optional || this.container.has(dep)) {
            var dependentProvider = this.container.get(dep);
            var dependentInstance = dependentProvider.getInstance(); // Value dependency and use spread, in this case, value object needs to be spreaded

            if (dependentProvider instanceof _provider2.ValueProvider) {
              if (dependentProvider.spread) {
                Object.assign(dependencies, dependentInstance.value);
              } else {
                dependencies[(0, _utils.camelize)(dep)] = dependentInstance.value;
              }
            } else if (dependentProvider instanceof _provider2.FactoryProvider && dependentProvider.spread) {
              Object.assign(dependencies, dependentInstance);
            } else {
              dependencies[(0, _utils.camelize)(dep)] = dependentProvider.getInstance();
            }
          } else if (!optional) {
            throw (0, _error.DIError)("Dependency Module [".concat(dep, "] can not be resolved"));
          }
        } // Injector instance will be injected into each module

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      dependencies.injector = this;
      return dependencies;
    }
    /**
     * Resolve a module provider needed by its child providers.
     * It's a wrapper function only for child injectors.
     * @param {String} providerToken
     */

  }, {
    key: "resolveModuleProviderForChildren",
    value: function resolveModuleProviderForChildren(providerToken) {
      if (this.universalProviders.has(providerToken)) {
        this.resolveModuleProvider(this.universalProviders.get(providerToken));
      } else if (this.parentInjector) {
        this.parentInjector.resolveModuleProviderForChildren(providerToken);
      }
    }
    /**
     * Used for resolving ModuleFactory provider specifically.
     * @param {Provider} providerInstance
     */

  }, {
    key: "resolveModuleFactoryProvider",
    value: function resolveModuleFactoryProvider(providerInstance) {
      if (!this.container.has(providerInstance.token)) {
        Injector.pending.add(providerInstance.token); // Prevent referencing to itself

        if (providerInstance.klass === this.targetClass) {
          throw (0, _error.CircularDependencyError)(Injector.pending, this.targetClass.name);
        }

        var instance = Injector.bootstrap(providerInstance.klass, this);
        providerInstance.setInstance(instance);
        this.container.set(providerInstance.token, providerInstance);
        Injector.pending.delete(providerInstance.token);
      }
    }
    /**
     * A static wrapper function for supporting hierarchical bootstrap.
     * @param {Class} RootClas
     * @param {Injector} parentInjector
     */

  }, {
    key: "_bootstrap",

    /**
     * To bootstrap module factory and resolve all providers.
     * @param {Class} RootClass
     */
    value: function _bootstrap(RootClass) {
      this.targetClass = RootClass; // TODO: how to cache root class?

      if (this.container.localHas(RootClass.name)) {
        return this.container.localGet(RootClass.name).getInstance();
      } // Implement inheritance for ModuleFactory


      var providersMetadata = _registry.default.resolveInheritedModuleFactory(RootClass); // Iterate through all provider metadata
      // Discard providers in parent class overwritten by children


      var universalProviders = this.universalProviders;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = providersMetadata[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var provider = _step2.value;

          if ((0, _is_type.isValueProvider)(provider)) {
            universalProviders.set(provider.provide, new _provider2.ValueProvider(provider.provide, provider.useValue, provider.spread, provider.private));
          } else if ((0, _is_type.isStaticClassProvider)(provider)) {
            universalProviders.set(provider.provide, new _provider2.ClassProvider(provider.provide, provider.useClass, provider.deps, provider.private));
          } else if ((0, _is_type.isExistingProvider)(provider)) {
            universalProviders.set(provider.provide, new _provider2.ExistingProvider(provider.provide, provider.useExisting, provider.private));
          } else if ((0, _is_type.isFactoryProvider)(provider)) {
            universalProviders.set(provider.provide, // eslint-disable-next-line
            new _provider2.FactoryProvider(provider.provide, provider.useFactory, provider.deps, provider.spread, provider.private));
          } else {
            throw (0, _error.DIError)('Expected valid provider', provider);
          }
        } // Resolve dependencies and create instances of provides

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var container = this.container;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.universalProviders.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _provider = _step3.value;

          if (!container.has(_provider.provide)) {
            // Provider is a module factory
            if (_provider instanceof _provider2.ClassProvider && this.providerRegistry.has(_provider.klass)) {
              this.resolveModuleFactoryProvider(_provider);
            } else {
              this.resolveModuleProvider(_provider);
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var moduleProviders = {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = container.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              token = _step4$value[0],
              moduleProvider = _step4$value[1];

          if (!moduleProvider.private) {
            var instance = moduleProvider.getInstance();

            if (moduleProvider instanceof _provider2.ValueProvider) {
              moduleProviders[(0, _utils.camelize)(token)] = instance.value;
            } else {
              moduleProviders[(0, _utils.camelize)(token)] = instance;
            }
          }
        } // Instantiate root module

      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var reducers = {};
      var proxyReducers = {};
      var rootClassInstance = new RootClass(moduleProviders); // Register all module providers to root instance

      var _arr = Object.keys(moduleProviders);

      var _loop = function _loop() {
        var name = _arr[_i];
        var module = moduleProviders[name];

        if (rootClassInstance.addModule) {
          rootClassInstance.addModule(name, module);
        }

        if (module.reducer) {
          reducers[name] = module.reducer;
        }

        if (module.proxyReducer) {
          proxyReducers[name] = module.proxyReducer;
        } // Additional module configurations


        if (module._reducer) {
          Object.defineProperty(module, STATE_FUNC_LITERAL, {
            value: function value() {
              return rootClassInstance.state[name];
            }
          });
          Object.defineProperty(rootClassInstance, REDUCER_LITERAL, {
            value: (0, _redux.combineReducers)(_objectSpread({}, reducers, {
              // eslint-disable-next-line
              lastAction: function lastAction() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var action = arguments.length > 1 ? arguments[1] : undefined;
                return action;
              }
            }))
          });
        }

        if (module._proxyReducer) {
          Object.defineProperty(module, PROXY_STATE_FUNC_LITERAL, {
            value: function value() {
              return rootClassInstance.proxyState[name];
            }
          });
          Object.defineProperty(rootClassInstance, PROXY_REDUCER_LITERAL, {
            value: (0, _redux.combineReducers)(_objectSpread({}, proxyReducers))
          });
        }
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
      }

      return rootClassInstance;
    }
    /**
     * Get specific provider by injector.
     * Will search for providers from parentInjector.
     * @param {String} token
     */

  }, {
    key: "get",
    value: function get(token) {
      var provider = this.container.get(token);
      var instance = provider.getInstance();

      if (provider instanceof _provider2.ValueProvider) {
        return instance.value;
      }

      return instance;
    }
    /**
     * Set parent injector and parent container.
     * Construct a tree-like structure for hierarchical injector.
     * @param {Injector} parentInjector
     */

  }, {
    key: "setParent",
    value: function setParent(parentInjector) {
      if (parentInjector) {
        this.container.setParent(parentInjector.container);
        this.parentInjector = parentInjector;
      }
    } // TODO: support hierachical reset

  }], [{
    key: "bootstrap",
    value: function bootstrap(RootClass) {
      var parentInjector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var injector = new Injector();
      if (parentInjector) injector.setParent(parentInjector);
      return injector._bootstrap(RootClass);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pending.clear();

      _registry.default.moduleRegistry.reset();

      _registry.default.providerRegistry.reset();
    }
  }]);

  return Injector;
}();

exports.Injector = Injector;
Injector.pending = new Set();
//# sourceMappingURL=injector.js.map
