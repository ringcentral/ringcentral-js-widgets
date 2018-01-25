'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

var _module_registry = require('./module_registry');

var _module_registry2 = _interopRequireDefault(_module_registry);

var _provider_registry = require('./provider_registry');

var _provider_registry2 = _interopRequireDefault(_provider_registry);

var _utils = require('../utils/utils');

var _is_type = require('../utils/is_type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Registry = (_temp = _class = function () {
  function Registry() {
    (0, _classCallCheck3.default)(this, Registry);
  }

  (0, _createClass3.default)(Registry, null, [{
    key: 'registerModule',
    value: function registerModule(klass, metadata) {
      (0, _utils.assert)((0, _is_type.isFunction)(klass), 'Expected module to be a Class');
      if (metadata) {
        (0, _utils.assert)((0, _is_type.isObject)(metadata), 'Expected parameter of @Module() to be an Object');
        if (metadata.deps) {
          (0, _utils.assert)((0, _is_type.isArray)(metadata.deps), 'Expected deps to be an Array: [' + klass.name + ']\n          ' + (0, _stringify2.default)(metadata));
        }
      }
      if (!metadata || (0, _keys2.default)(metadata).length <= 0) {
        metadata = null;
      }
      this.moduleRegistry.set(klass, metadata);
    }
  }, {
    key: 'registerModuleFactory',
    value: function registerModuleFactory(klass, metadata) {
      (0, _utils.assert)(klass && (0, _is_type.isFunction)(klass), 'Expected moduleFactory to be a Class');

      if (metadata) {
        (0, _utils.assert)((0, _is_type.isObject)(metadata), 'Expected parameter of @ModuleFactory() to be an Object');
        if (metadata.providers && !(0, _is_type.isArray)(metadata.providers)) {
          (0, _utils.assert)((0, _is_type.isArray)(metadata.providers), 'Expected providers in @ModuleFactory() to be an Array');
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

  }, {
    key: 'resolveInheritedModuleFactory',
    value: function resolveInheritedModuleFactory(currentClass) {
      var parentClass = (0, _utils.getParentClass)(currentClass);
      if (!this.providerRegistry.has(currentClass)) return [];else if (this.providerRegistry.resolved(currentClass)) {
        return this.providerRegistry.get(currentClass).providers;
      }
      var moduleProviderMetadata = this.providerRegistry.get(currentClass);
      var hasProviders = moduleProviderMetadata && (0, _is_type.isArray)(moduleProviderMetadata.providers);
      var providerMetadata = this.mergeProviders(hasProviders ? moduleProviderMetadata.providers : [], this.resolveInheritedModuleFactory(parentClass));
      this.providerRegistry.resolve(currentClass, (0, _assign2.default)({}, moduleProviderMetadata, {
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
    key: 'resolveInheritedDependencies',
    value: function resolveInheritedDependencies(currentClass) {
      var parentClass = (0, _utils.getParentClass)(currentClass);
      if (!this.moduleRegistry.has(currentClass)) return [];else if (this.moduleRegistry.resolved(currentClass)) {
        return this.moduleRegistry.get(currentClass).deps;
      }
      var moduleMetadata = this.moduleRegistry.get(currentClass);
      var hasDeps = moduleMetadata && (0, _is_type.isArray)(moduleMetadata.deps);
      var deps = this.mergeDependencies(hasDeps ? moduleMetadata.deps : [], this.resolveInheritedDependencies(parentClass));
      // Update parent class metadata
      this.moduleRegistry.resolve(currentClass, (0, _assign2.default)({}, moduleMetadata, {
        deps: deps
      }));
      return deps;
    }

    /**
     * A helper function for formating class provider metadata.
     * @param {Object|Function} providerMetadata
     */

  }, {
    key: '_formatClassProvider',
    value: function _formatClassProvider(providerMetadata) {
      var formatted = {};
      if ((0, _is_type.isFunction)(providerMetadata)) {
        formatted = { provide: providerMetadata.name, useClass: providerMetadata };
      } else if ((0, _is_type.isFunction)(providerMetadata.provide)) {
        formatted = { provide: providerMetadata.provide.name, useClass: providerMetadata.provide };
      }
      return (0, _assign2.default)({}, providerMetadata, formatted);
    }

    /**
     * A helper function for merging child and parent providers.
     * @param {Object|Function} baseProvider
     * @param {Object|Function} parentProvider
     */

  }, {
    key: 'mergeProviders',
    value: function mergeProviders(baseProvider, parentProvider) {
      var merged = new _map2.default();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(parentProvider), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pp = _step.value;

          pp = this._formatClassProvider(pp);
          merged.set(pp.provide, pp);
        }

        // Merge child providers into parent providers
        // Only support object shallow merge
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
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
        for (var _iterator2 = (0, _getIterator3.default)(baseProvider), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var p = _step2.value;

          // useValue and don't overwrite parent values
          var _pp = merged.get(p.provide);
          if (_pp && p.useValue && p.merge) {
            (0, _utils.assert)(_pp.useValue, 'Expected parent provider of [' + p.provide + '] to be a value provider');
            (0, _utils.assert)((0, _is_type.isObject)(_pp.useValue), 'Expected parent provider of [' + p.provide + '] to be an Object');
            p.useValue = (0, _assign2.default)({}, _pp.useValue, p.useValue);
            merged.set(p.provide, (0, _assign2.default)({}, _pp, p));
          } else {
            // useClass, useExisting, useFactory will always overwrite parent provider
            p = this._formatClassProvider(p);
            merged.set(p.provide, (0, _assign2.default)({}, _pp, p));
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return (0, _from2.default)(merged.values());
    }

    /**
     * A helper function for merging child and parent module dependencies.
     * @param {Array} baseDeps
     * @param {Array} parentDeps
     */

  }, {
    key: 'mergeDependencies',
    value: function mergeDependencies(baseDeps, parentDeps) {
      var merged = new _map2.default();
      // Deps preprocess
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(parentDeps), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var parent = _step3.value;

          if (!(0, _is_type.isObject)(parent)) {
            merged.set(parent, { dep: parent, optional: false });
          } else {
            merged.set(parent.dep, parent);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
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
        for (var _iterator4 = (0, _getIterator3.default)(baseDeps), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var base = _step4.value;

          if (!(0, _is_type.isObject)(base)) {
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
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return (0, _from2.default)(merged.values());
    }
  }]);
  return Registry;
}(), _class.moduleRegistry = new _module_registry2.default(), _class.providerRegistry = new _provider_registry2.default(), _temp);
exports.default = Registry;
//# sourceMappingURL=registry.js.map
