"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Injector = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _core = require("@ringcentral-integration/core");
var _redux = require("redux");
var _container = _interopRequireDefault(require("./container"));
var _provider2 = require("./provider");
var _registry = _interopRequireDefault(require("./registry/registry"));
var _error = require("./utils/error");
var _is_type = require("./utils/is_type");
var _utils = require("./utils/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // @ts-nocheck
var REDUCER_LITERAL = '_reducer';
var PROXY_REDUCER_LITERAL = '_proxyReducer';
var STATE_FUNC_LITERAL = '_getState';
var PROXY_STATE_FUNC_LITERAL = '_getProxyState';

/**
 * Injector is used for injecting providers to modules.
 * Hierarchical provider injection is supported.
 */
var Injector = exports.Injector = /*#__PURE__*/function () {
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
  return _createClass(Injector, [{
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
    value:
    /**
     * To bootstrap module factory and resolve all providers.
     * @param {Class} RootClass
     */
    function _bootstrap(RootClass) {
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
    }

    // TODO: support hierachical reset
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
}();
Injector.pending = new Set();
//# sourceMappingURL=injector.js.map
