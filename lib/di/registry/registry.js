"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _is_type = require("../utils/is_type");
var _utils = require("../utils/utils");
var _module_registry = _interopRequireDefault(require("./module_registry"));
var _provider_registry = _interopRequireDefault(require("./provider_registry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // @ts-nocheck
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
      this.providerRegistry.resolve(currentClass, _objectSpread(_objectSpread({}, moduleProviderMetadata), {}, {
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
      var deps = this.mergeDependencies(hasDeps ? moduleMetadata.deps : [], this.resolveInheritedDependencies(parentClass));
      // Update parent class metadata
      this.moduleRegistry.resolve(currentClass, _objectSpread(_objectSpread({}, moduleMetadata), {}, {
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
      return _objectSpread(_objectSpread({}, providerMetadata), formatted);
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
        }

        // Merge child providers into parent providers
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
            p.useValue = _objectSpread(_objectSpread({}, _pp.useValue), p.useValue);
            merged.set(p.provide, _objectSpread(_objectSpread({}, _pp), p));
          } else {
            // useClass, useExisting, useFactory will always overwrite parent provider
            p = this._formatClassProvider(p);
            merged.set(p.provide, _objectSpread(_objectSpread({}, _pp), p));
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
      var merged = new Map();
      // Deps preprocess
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
