import { combineReducers } from 'redux';
import Container from './container';
import Registry from './registry/registry';
import { ValueProvider, ClassProvider, ExistingProvider, FactoryProvider } from './provider';
import { assert, camelize } from './utils/utils';
import { DIError, CircularDependencyError } from './utils/error';
import { isObject, isValueProvider, isStaticClassProvider, isExistingProvider, isFactoryProvider } from './utils/is_type';

const REDUCER_LITERAL = '_reducer';
const PROXY_REDUCER_LITERAL = '_proxyReducer';
const STATE_FUNC_LITERAL = '_getState';
const PROXY_STATE_FUNC_LITERAL = '_getProxyState';

/**
 * Injector is used for injecting providers to modules.
 * Hierarchical provider injection is supported.
 */
export class Injector {
  static pending = new Set();

  constructor() {
    this.targetClass = null;
    this.parentInjector = null;
    this.moduleRegistry = Registry.moduleRegistry;
    this.providerRegistry = Registry.providerRegistry;
    this.container = new Container();
    this.universalProviders = new Map();
  }

  /**
   * Resolve module providers recursively.
   * May search for providers in parent injector.
   * @param {Provider} provider
   * @param {Set} pending - process record
   */
  resolveModuleProvider(provider, pending = Injector.pending) {
    const { container } = this;
    assert(provider, 'Expected valid provider', provider);

    // Provider has already been resolved
    if (container.localHas(provider.token)) return;

    // useExisting provider needs to resolve existing providers instead of itself
    if (provider instanceof ExistingProvider) {
      if (pending.has(provider)) {
        throw CircularDependencyError(pending, provider.token);
      }
      if (this.universalProviders.has(provider.useExisting)) {
        pending.add(provider);
        this.resolveModuleProvider(this.universalProviders.get(provider.useExisting));
        pending.delete(provider);
      }
      if (container.localHas(provider.useExisting)) {
        container.set(provider.token, container.localGet(provider.useExisting));
      } else {
        throw DIError(`ExistingProvider [${provider.useExisting}] is not found`);
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
    if (provider instanceof ValueProvider) {
      container.set(provider.token, provider);
    } else if (provider instanceof FactoryProvider) {
      pending.add(provider.token);
      // eslint-disable-next-line
      const deps = provider.deps.map(dep => isObject(dep) ? dep : { dep, optional: false });
      const dependencies = this.resolveDependencies(deps, pending);
      const factoryProvider = provider.func.call(null, dependencies);
      provider.setInstance(factoryProvider);
      container.set(provider.token, provider);
      pending.delete(provider.token);
    } else if (provider instanceof ClassProvider) {
      if (this.moduleRegistry.has(provider.klass)) {
        const deps = Registry.resolveInheritedDependencies(provider.klass) || [];
        const Klass = provider.klass;
        pending.add(provider.token);
        const dependencies = this.resolveDependencies(deps, pending);
        const instance = new Klass(dependencies);
        provider.setInstance(instance);
        container.set(provider.token, provider);
        pending.delete(provider.token);
      } else if (
        provider instanceof ClassProvider &&
        this.providerRegistry.has(provider.klass)
      ) {
        // Depends on moduleFactory provider
        this.resolveModuleFactoryProvider(provider);
      } else {
        throw DIError(
          `Provider [${provider.token}] can not be resolved, module is not found`
        );
      }
    }
  }

  /**
   * Resolve module dependencies recursively.
   * If module is not optional and can not be resolved, then DIError will be thrown
   * @param {Array} deps - module dependencies
   * @param {Set} pending - process record
   */
  resolveDependencies(deps, pending) {
    const dependencies = {};
    for (const { dep, optional } of deps) {
      if (pending.has(dep)) {
        throw CircularDependencyError(pending, dep);
      }
      if (!this.container.has(dep)) {
        if (this.universalProviders.has(dep)) {
          const dependentModuleProvider = this.universalProviders.get(dep);
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
        const dependentProvider = this.container.get(dep);
        const dependentInstance = dependentProvider.getInstance();

        // Value dependency and use spread, in this case, value object needs to be spreaded
        if (dependentProvider instanceof ValueProvider) {
          if (dependentProvider.spread) {
            Object.assign(dependencies, dependentInstance.value);
          } else {
            dependencies[camelize(dep)] = dependentInstance.value;
          }
        } else if (
          dependentProvider instanceof FactoryProvider &&
          dependentProvider.spread
        ) {
          Object.assign(dependencies, dependentInstance);
        } else {
          dependencies[camelize(dep)] = dependentProvider.getInstance();
        }
      } else if (!optional) {
        throw DIError(`Dependency Module [${dep}] can not be resolved`);
      }
    }
    // Injector instance will be injected into each module
    dependencies.injector = this;
    return dependencies;
  }

  /**
   * Resolve a module provider needed by its child providers.
   * It's a wrapper function only for child injectors.
   * @param {String} providerToken
   */
  resolveModuleProviderForChildren(providerToken) {
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
  resolveModuleFactoryProvider(providerInstance) {
    if (!this.container.has(providerInstance.token)) {
      Injector.pending.add(providerInstance.token);
      // Prevent referencing to itself
      if (providerInstance.klass === this.targetClass) {
        throw CircularDependencyError(Injector.pending, this.targetClass.name);
      }
      const instance = Injector.bootstrap(providerInstance.klass, this);
      providerInstance.setInstance(instance);
      this.container.set(
        providerInstance.token,
        providerInstance
      );
      Injector.pending.delete(providerInstance.token);
    }
  }

  /**
   * A static wrapper function for supporting hierarchical bootstrap.
   * @param {Class} RootClas
   * @param {Injector} parentInjector
   */
  static bootstrap(RootClass, parentInjector = null) {
    const injector = new Injector();
    if (parentInjector) injector.setParent(parentInjector);
    return injector._bootstrap(RootClass);
  }

  /**
   * To bootstrap module factory and resolve all providers.
   * @param {Class} RootClass
   */
  _bootstrap(RootClass) {
    this.targetClass = RootClass;
    // TODO: how to cache root class?
    if (this.container.localHas(RootClass.name)) {
      return this.container.localGet(RootClass.name).getInstance();
    }

    // Implement inheritance for ModuleFactory
    const providersMetadata = Registry.resolveInheritedModuleFactory(RootClass);

    // Iterate through all provider metadata
    // Discard providers in parent class overwritten by children
    const { universalProviders } = this;
    for (const provider of providersMetadata) {
      if (isValueProvider(provider)) {
        universalProviders.set(
          provider.provide,
          new ValueProvider(provider.provide, provider.useValue, provider.spread, provider.private)
        );
      } else if (isStaticClassProvider(provider)) {
        universalProviders.set(
          provider.provide,
          new ClassProvider(provider.provide, provider.useClass, provider.deps, provider.private)
        );
      } else if (isExistingProvider(provider)) {
        universalProviders.set(
          provider.provide,
          new ExistingProvider(provider.provide, provider.useExisting, provider.private)
        );
      } else if (isFactoryProvider(provider)) {
        universalProviders.set(
          provider.provide,
          // eslint-disable-next-line
          new FactoryProvider(provider.provide, provider.useFactory, provider.deps, provider.spread, provider.private)
        );
      } else {
        throw DIError('Expected valid provider', provider);
      }
    }

    // Resolve dependencies and create instances of provides
    const { container } = this;
    for (const provider of this.universalProviders.values()) {
      if (!container.has(provider.provide)) {
        // Provider is a module factory
        if (
          provider instanceof ClassProvider &&
          this.providerRegistry.has(provider.klass)
        ) {
          this.resolveModuleFactoryProvider(provider);
        } else {
          this.resolveModuleProvider(provider);
        }
      }
    }

    const moduleProviders = {};
    for (const [token, moduleProvider] of container.entries()) {
      if (!moduleProvider.private) {
        const instance = moduleProvider.getInstance();
        if (moduleProvider instanceof ValueProvider) {
          moduleProviders[camelize(token)] = instance.value;
        } else {
          moduleProviders[camelize(token)] = instance;
        }
      }
    }

    // Instantiate root module
    const reducers = {};
    const proxyReducers = {};
    const rootClassInstance = new RootClass(moduleProviders);

    // Register all module providers to root instance
    for (const name of Object.keys(moduleProviders)) {
      const module = moduleProviders[name];
      if (rootClassInstance.addModule) {
        rootClassInstance.addModule(name, module);
      }
      if (module.reducer) {
        reducers[name] = module.reducer;
      }

      if (module.proxyReducer) {
        proxyReducers[name] = module.proxyReducer;
      }

      // Additional module configurations
      if (module._reducer) {
        Object.defineProperty(module, STATE_FUNC_LITERAL, {
          value: () => rootClassInstance.state[name]
        });
        Object.defineProperty(rootClassInstance, REDUCER_LITERAL, {
          value: combineReducers({
            ...reducers,
            // eslint-disable-next-line
            lastAction: (state = null, action) => action
          })
        });
      }
      if (module._proxyReducer) {
        Object.defineProperty(module, PROXY_STATE_FUNC_LITERAL, {
          value: () => rootClassInstance.proxyState[name]
        });
        Object.defineProperty(rootClassInstance, PROXY_REDUCER_LITERAL, {
          value: combineReducers({
            ...proxyReducers,
          })
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
  get(token) {
    const provider = this.container.get(token);
    const instance = provider.getInstance();
    if (provider instanceof ValueProvider) {
      return instance.value;
    }
    return instance;
  }

  /**
   * Set parent injector and parent container.
   * Construct a tree-like structure for hierarchical injector.
   * @param {Injector} parentInjector
   */
  setParent(parentInjector) {
    if (parentInjector) {
      this.container.setParent(parentInjector.container);
      this.parentInjector = parentInjector;
    }
  }

  // TODO: support hierachical reset
  static reset() {
    this.pending.clear();
    Registry.moduleRegistry.reset();
    Registry.providerRegistry.reset();
  }
}
