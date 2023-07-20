"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Injector = void 0;
var _redux = require("redux");
var _core = require("@ringcentral-integration/core");
var _container = _interopRequireDefault(require("./container"));
var _provider2 = require("./provider");
var _registry = _interopRequireDefault(require("./registry/registry"));
var _error = require("./utils/error");
var _is_type = require("./utils/is_type");
var _utils = require("./utils/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-nocheck
var REDUCER_LITERAL = '_reducer';
var PROXY_REDUCER_LITERAL = '_proxyReducer';
var STATE_FUNC_LITERAL = '_getState';
var PROXY_STATE_FUNC_LITERAL = '_getProxyState';

/**
 * Injector is used for injecting providers to modules.
 * Hierarchical provider injection is supported.
 */
var Injector = /*#__PURE__*/function () {
  function Injector() {
    _classCallCheck(this, Injector);
    this.targetClass = null;
    this.parentInjector = null;
    this.moduleRegistry = _registry["default"].moduleRegistry;
    this.providerRegistry = _registry["default"].providerRegistry;
    this.container = new _container["default"]();
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
      (0, _utils.assert)(provider, 'Expected valid provider', provider);

      // Provider has already been resolved
      if (container.localHas(provider.token)) return;

      // useExisting provider needs to resolve existing providers instead of itself
      if (provider instanceof _provider2.ExistingProvider) {
        if (pending.has(provider)) {
          throw (0, _error.CircularDependencyError)(pending, provider.token);
        }
        if (this.universalProviders.has(provider.useExisting)) {
          pending.add(provider);
          this.resolveModuleProvider(this.universalProviders.get(provider.useExisting));
          pending["delete"](provider);
        }
        if (container.localHas(provider.useExisting)) {
          container.set(provider.token, container.localGet(provider.useExisting));
        } else {
          throw (0, _error.DIError)("ExistingProvider [".concat(provider.useExisting, "] is not found"));
        }
        return;
      }

      // If provider exists in ancestor injectors,
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
        pending.add(provider.token);
        // eslint-disable-next-line
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
        pending["delete"](provider.token);
      } else if (provider instanceof _provider2.ClassProvider) {
        if (this.moduleRegistry.has(provider.klass)) {
          var _deps = _registry["default"].resolveInheritedDependencies(provider.klass) || [];
          var Klass = provider.klass;
          pending.add(provider.token);
          var _dependencies = this.resolveDependencies(_deps, pending);
          var instance = new Klass(_dependencies);
          provider.setInstance(instance);
          container.set(provider.token, provider);
          pending["delete"](provider.token);
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
      var _iterator = _createForOfIteratorHelper(deps),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
            dep = _step$value.dep,
            optional = _step$value.optional;
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
          }
          // If the dependency is optional but Provider is found, then try to inject the dependency.
          // Otherwise, if provider is not found, then just ignore.
          // If the dependency is not optional and Provider is found, then try to inject the dependency.
          // Otherwise, if the Provider is not found, then an Error should be thrown.
          if (!optional || this.container.has(dep)) {
            var dependentProvider = this.container.get(dep);
            var dependentInstance = dependentProvider.getInstance();

            // Value dependency and use spread, in this case, value object needs to be spreaded
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
        }
        // Injector instance will be injected into each module
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
        Injector.pending.add(providerInstance.token);
        // Prevent referencing to itself
        if (providerInstance.klass === this.targetClass) {
          throw (0, _error.CircularDependencyError)(Injector.pending, this.targetClass.name);
        }
        var instance = Injector.bootstrap(providerInstance.klass, this);
        providerInstance.setInstance(instance);
        this.container.set(providerInstance.token, providerInstance);
        Injector.pending["delete"](providerInstance.token);
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
      this.targetClass = RootClass;
      // TODO: how to cache root class?
      if (this.container.localHas(RootClass.name)) {
        return this.container.localGet(RootClass.name).getInstance();
      }

      // Implement inheritance for ModuleFactory
      var providersMetadata = _registry["default"].resolveInheritedModuleFactory(RootClass);

      // Iterate through all provider metadata
      // Discard providers in parent class overwritten by children
      var universalProviders = this.universalProviders;
      var _iterator2 = _createForOfIteratorHelper(providersMetadata),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var provider = _step2.value;
          if ((0, _is_type.isValueProvider)(provider)) {
            universalProviders.set(provider.provide, new _provider2.ValueProvider(provider.provide, provider.useValue, provider.spread, provider["private"]));
          } else if ((0, _is_type.isStaticClassProvider)(provider)) {
            universalProviders.set(provider.provide, new _provider2.ClassProvider(provider.provide, provider.useClass, provider.deps, provider["private"]));
          } else if ((0, _is_type.isExistingProvider)(provider)) {
            universalProviders.set(provider.provide, new _provider2.ExistingProvider(provider.provide, provider.useExisting, provider["private"]));
          } else if ((0, _is_type.isFactoryProvider)(provider)) {
            universalProviders.set(provider.provide,
            // eslint-disable-next-line
            new _provider2.FactoryProvider(provider.provide, provider.useFactory, provider.deps, provider.spread, provider["private"]));
          } else {
            throw (0, _error.DIError)('Expected valid provider', provider);
          }
        }

        // Resolve dependencies and create instances of provides
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var container = this.container;
      var _iterator3 = _createForOfIteratorHelper(this.universalProviders.values()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
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
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var moduleProviders = {};
      var _iterator4 = _createForOfIteratorHelper(container.entries()),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
            token = _step4$value[0],
            moduleProvider = _step4$value[1];
          if (!moduleProvider["private"]) {
            var instance = moduleProvider.getInstance();
            if (moduleProvider instanceof _provider2.ValueProvider) {
              moduleProviders[(0, _utils.camelize)(token)] = instance.value;
            } else {
              moduleProviders[(0, _utils.camelize)(token)] = instance;
            }
          }
        }

        // Instantiate root module
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var reducers = {};
      var proxyReducers = {};
      var rootClassInstance = new RootClass(moduleProviders);

      // Register all module providers to root instance
      var _loop = function _loop() {
        var name = _Object$keys[_i];
        var module = moduleProviders[name];
        if (rootClassInstance.addModule) {
          rootClassInstance.addModule(name, module);
          if (module instanceof _core.RcModuleV2) {
            module.parentModule = rootClassInstance;
            module[_core.identifierKey] = name;
          }
        }
        if (!(rootClassInstance instanceof _core.RcModuleV2)) {
          if (module.reducer) {
            reducers[name] = module.reducer;
          }
          if (module.proxyReducer) {
            proxyReducers[name] = module.proxyReducer;
          }

          // Additional module configurations
          if (module._reducer) {
            Object.defineProperty(module, STATE_FUNC_LITERAL, {
              value: function value() {
                return rootClassInstance.state[name];
              }
            });
          }
          if (module._proxyReducer) {
            Object.defineProperty(module, PROXY_STATE_FUNC_LITERAL, {
              value: function value() {
                return rootClassInstance.proxyState[name];
              }
            });
          }
        }
      };
      for (var _i = 0, _Object$keys = Object.keys(moduleProviders); _i < _Object$keys.length; _i++) {
        _loop();
      }
      if (!(rootClassInstance instanceof _core.RcModuleV2)) {
        Object.defineProperty(rootClassInstance, REDUCER_LITERAL, {
          value: (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
            // eslint-disable-next-line
            lastAction: function lastAction() {
              var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
              var action = arguments.length > 1 ? arguments[1] : undefined;
              return action._usm === _core.usmAction ? {} : action;
            }
          }))
        });
        if (rootClassInstance._proxyReducer) {
          Object.defineProperty(rootClassInstance, PROXY_REDUCER_LITERAL, {
            value: (0, _redux.combineReducers)(_objectSpread({}, proxyReducers))
          });
        }
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
      _registry["default"].moduleRegistry.reset();
      _registry["default"].providerRegistry.reset();
    }
  }]);
  return Injector;
}();
exports.Injector = Injector;
Injector.pending = new Set();
//# sourceMappingURL=injector.js.map
