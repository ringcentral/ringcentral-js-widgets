import ModuleRegistry from './module_registry';
import ProviderRegistry from './provider_registry';
import { getParentClass, assert } from '../utils/utils';
import { isFunction, isArray, isObject } from '../utils/is_type';

export default class Registry {
  static moduleRegistry = new ModuleRegistry();
  static providerRegistry = new ProviderRegistry();

  static registerModule(klass, metadata) {
    assert(
      isFunction(klass),
      'Expected module to be a Class'
    );
    if (metadata) {
      assert(
        isObject(metadata),
        'Expected parameter of @Module() to be an Object'
      );
      if (metadata.deps) {
        assert(
          isArray(metadata.deps),
          `Expected deps to be an Array: [${klass.name}]
          ${JSON.stringify(metadata)}`
        );
      }
    }
    if (!metadata || Object.keys(metadata).length <= 0) {
      metadata = null;
    }
    this.moduleRegistry.set(klass, metadata);
  }

  static registerModuleFactory(klass, metadata) {
    assert(
      klass && isFunction(klass),
      'Expected moduleFactory to be a Class'
    );

    if (metadata) {
      assert(
        isObject(metadata),
        'Expected parameter of @ModuleFactory() to be an Object'
      );
      if (metadata.providers && !isArray(metadata.providers)) {
        assert(
          isArray(metadata.providers),
          'Expected providers in @ModuleFactory() to be an Array'
        );
      }
    } else {
      metadata = null;
    }
    // TODO: validate module providers
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
  static resolveInheritedModuleFactory(currentClass) {
    const parentClass = getParentClass(currentClass);
    if (!this.providerRegistry.has(currentClass)) return [];
    else if (this.providerRegistry.resolved(currentClass)) {
      return this.providerRegistry.get(currentClass).providers;
    }
    const moduleProviderMetadata = this.providerRegistry.get(currentClass);
    const hasProviders = moduleProviderMetadata && isArray(moduleProviderMetadata.providers);
    const providerMetadata = this.mergeProviders(
      hasProviders ? moduleProviderMetadata.providers : [],
      this.resolveInheritedModuleFactory(parentClass)
    );
    this.providerRegistry.resolve(
      currentClass,
      Object.assign({}, moduleProviderMetadata, {
        providers: providerMetadata
      })
    );
    return providerMetadata;
  }

  /**
   * Process the inheritance relationship of Module and Library.
   * Module can inherit from Module and Library.
   * @param {Class} currentClass
   * @return {Array} deps - resolved deps
   */
  static resolveInheritedDependencies(currentClass) {
    const parentClass = getParentClass(currentClass);
    if (!this.moduleRegistry.has(currentClass)) return [];
    else if (this.moduleRegistry.resolved(currentClass)) {
      return this.moduleRegistry.get(currentClass).deps;
    }
    const moduleMetadata = this.moduleRegistry.get(currentClass);
    const hasDeps = moduleMetadata && isArray(moduleMetadata.deps);
    const deps = this.mergeDependencies(
      hasDeps ? moduleMetadata.deps : [],
      this.resolveInheritedDependencies(parentClass)
    );
    // Update parent class metadata
    this.moduleRegistry.resolve(
      currentClass,
      Object.assign({}, moduleMetadata, {
        deps
      })
    );
    return deps;
  }

  /**
   * A helper function for formating class provider metadata.
   * @param {Object|Function} providerMetadata
   */
  static _formatClassProvider(providerMetadata) {
    let formatted = {};
    if (isFunction(providerMetadata)) {
      formatted = { provide: providerMetadata.name, useClass: providerMetadata };
    } else if (isFunction(providerMetadata.provide)) {
      formatted = { provide: providerMetadata.provide.name, useClass: providerMetadata.provide };
    }
    return Object.assign({}, providerMetadata, formatted);
  }

  /**
   * A helper function for merging child and parent providers.
   * @param {Object|Function} baseProvider
   * @param {Object|Function} parentProvider
   */
  static mergeProviders(baseProvider, parentProvider) {
    const merged = new Map();
    for (let pp of parentProvider) {
      pp = this._formatClassProvider(pp);
      merged.set(pp.provide, pp);
    }

    // Merge child providers into parent providers
    // Only support object shallow merge
    for (let p of baseProvider) {
      // useValue and don't overwrite parent values
      const pp = merged.get(p.provide);
      if (pp && p.useValue && p.merge) {
        assert(pp.useValue, `Expected parent provider of [${p.provide}] to be a value provider`);
        assert(isObject(pp.useValue), `Expected parent provider of [${p.provide}] to be an Object`);
        p.useValue = Object.assign({}, pp.useValue, p.useValue);
        merged.set(p.provide, Object.assign({}, pp, p));
      } else {
        // useClass, useExisting, useFactory will always overwrite parent provider
        p = this._formatClassProvider(p);
        merged.set(p.provide, Object.assign({}, pp, p));
      }
    }
    return Array.from(merged.values());
  }

  /**
   * A helper function for merging child and parent module dependencies.
   * @param {Array} baseDeps
   * @param {Array} parentDeps
   */
  static mergeDependencies(baseDeps, parentDeps) {
    const merged = new Map();
    // Deps preprocess
    for (const parent of parentDeps) {
      if (!isObject(parent)) {
        merged.set(parent, { dep: parent, optional: false });
      } else {
        merged.set(parent.dep, parent);
      }
    }

    for (let base of baseDeps) {
      if (!isObject(base)) {
        base = { dep: base, optional: false };
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

    return Array.from(merged.values());
  }
}
