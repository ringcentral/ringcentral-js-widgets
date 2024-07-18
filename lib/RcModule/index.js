"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@ringcentral-integration/core");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _proxyStatuses = _interopRequireDefault(require("../../enums/proxyStatuses"));
var _di = require("../di");
var _once = _interopRequireDefault(require("../once"));
var _required = _interopRequireDefault(require("../required"));
var _dec, _dec2, _class, _class2; // @ts-nocheck
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
/**
 * @function
 * @param {Object} state
 * @return {Object}
 * @description Default reducer if module does not has its own reducer.
 */
function defaultReducer() {
  return null;
}

/**
 * @function
 * @return any
 * @description Default getState function
 */
function defaultGetState() {
  return this.store.getState();
}
function defaultGetProxyState() {
  return {};
}
/**
 * @class
 * @default
 * @description Base module class.
 */
var RcModule = (_dec = (0, _di.Library)({
  deps: [{
    dep: 'Prefix',
    optional: true
  }]
}), _dec2 = _required["default"].warn, _dec(_class = (_class2 = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Function} options.getState
   * @param {String} options.prefix
   * @param {Enum} options.actionTypes
   */
  function RcModule() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, RcModule);
    this._getState = void 0;
    this._getProxyState = void 0;
    this._prefix = void 0;
    this._prefixedActionTypes = void 0;
    // TODO: refactor with usm
    this._reducer = void 0;
    // TODO: refactor with usm
    this._proxyReducer = void 0;
    // TODO: refactor with usm
    this._modulePath = 'root';
    this._store = void 0;
    this._suppressInit = void 0;
    this._initialized = void 0;
    var _options$getState = options.getState,
      getState = _options$getState === void 0 ? defaultGetState : _options$getState,
      _options$getProxyStat = options.getProxyState,
      getProxyState = _options$getProxyStat === void 0 ? defaultGetProxyState : _options$getProxyStat,
      prefix = options.prefix,
      actionTypes = options.actionTypes;
    var _actionTypes = typeof actionTypes === 'undefined' ? this._actionTypes : actionTypes;
    if (typeof getState !== 'function') {
      throw new Error('The `getState` options property must be of type function');
    }
    this._getState = getState;
    this._getProxyState = getProxyState;
    if (prefix && typeof prefix !== 'string') {
      throw new Error('The `prefix` options property must be null, undefined, or a string');
    }
    this._prefix = prefix;
    this._prefixedActionTypes = _actionTypes && _ObjectMap.ObjectMap.prefixValues(_actionTypes, prefix);
    this._reducer = defaultReducer;
    this._proxyReducer = defaultReducer;
  }
  _createClass(RcModule, [{
    key: "addModule",
    /**
     * @function addModule
     * @param {String} name - Name of the module. Also used for the property name.
     * @param {any} module - The module to be attached, can be any type.
     * @description Add the desired module to the
     */
    value: function addModule(name, module) {
      if (Object.prototype.hasOwnProperty.call(this, name)) {
        throw new Error("Property '".concat(name, "' already exists..."));
      }
      Object.defineProperty(this, name, {
        get: function get() {
          return module;
        },
        enumerable: true
      });
      // tag submodule with a modulePath for proxying function calls
      // do nothing if module is already tagged
      var subRcModule = this[name];
      if (subRcModule._modulePath === 'root') {
        subRcModule._modulePath = "".concat(this.modulePath, ".").concat(name);
      }
    }
    /**
     * @function
     * @param {Object} store
     * @description Set the store to the modules and initialize the modules.
     *   This should only be called once.
     */
  }, {
    key: "setStore",
    value: function setStore(store) {
      if (this._modulePath !== 'root') {
        throw new Error('setStore should only be called on root module');
      }
      if (!store) {
        throw new Error('setStore must accept a store object');
      }
      if (this._store) {
        throw new Error('setStore should only be called once');
      }
      this._setStore(store);
      this._initModule();
    }
  }, {
    key: "_setStore",
    value: function _setStore(store) {
      this._store = store;
      for (var subModule in this) {
        if (Object.prototype.hasOwnProperty.call(this, subModule) && this[subModule] instanceof RcModule) {
          var subRcModule = this[subModule];
          subRcModule._setStore(store);
        }
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;
      this.store.subscribe(function () {
        return _this._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      //
    }
  }, {
    key: "_initModule",
    value: function _initModule() {
      if (!this._suppressInit) {
        if (!this._initialized) {
          this._initialized = true;
          this.initialize();
        }
        for (var subModule in this) {
          if (Object.prototype.hasOwnProperty.call(this, subModule) && this[subModule] instanceof RcModule) {
            var subRcModule = this[subModule];
            subRcModule._initModule();
          } else if (Object.prototype.hasOwnProperty.call(this, subModule) && this[subModule] instanceof _core.RcModuleV2 && !this[subModule]._initialized && !this[subModule]._suppressInit) {
            var _subRcModule = this[subModule];
            _subRcModule._initialized = true;
            _subRcModule._initModule();
          }
        }
      }
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      /* should be implemented by descendant */
      return null;
    }
    /**
     * @property
     * @type any
     * @description The state of the module
     */
  }, {
    key: "state",
    get: function get() {
      return this._getState();
    }
  }, {
    key: "proxyState",
    get: function get() {
      return this._getProxyState();
    }
    /**
     * @property
     * @type Function
     * @description The reducer function of the module
     */
  }, {
    key: "reducer",
    get: function get() {
      return this._reducer;
    }
  }, {
    key: "proxyReducer",
    get: function get() {
      return this._proxyReducer;
    }
    /**
     * @property
     * @type Object
     * @description The store object of the module
     */
  }, {
    key: "store",
    get: function get() {
      if (!this._store) {
        throw new Error('module has not been initialized...');
      }
      return this._store;
    }
    /**
     * @property
     * @type String
     * @description The prefix string of this module
     */
  }, {
    key: "prefix",
    get: function get() {
      return this._prefix;
    }
    /**
     * @property
     * @type Enum
     * @description The actionTypes used by the module
     */
  }, {
    key: "actionTypes",
    get: function get() {
      return this._prefixedActionTypes;
    }
    /**
     * @property
     * @type String
     * @description The canonical path of the module from the root module
     */
  }, {
    key: "modulePath",
    get: function get() {
      return this._modulePath;
    }
  }, {
    key: _core.storeKey,
    get: function get() {
      return this._store;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "proxyStatus",
    get: function get() {
      return _proxyStatuses["default"].ready;
    }
  }, {
    key: "proxyReady",
    get: function get() {
      return this.proxyStatus === _proxyStatuses["default"].ready;
    }
  }, {
    key: "proxyPending",
    get: function get() {
      return this.proxyStatus === _proxyStatuses["default"].pending;
    }
  }], [{
    key: "create",
    value: function create() {
      var instance = _di.Injector.bootstrap(this);
      for (var key in instance) {
        if (instance[key] instanceof _core.RcModuleV2) {
          var _Object$definePropert;
          Object.defineProperties(instance[key], (_Object$definePropert = {}, _defineProperty(_Object$definePropert, _core.identifierKey, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: key
          }), _defineProperty(_Object$definePropert, _core.storeKey, {
            configurable: false,
            enumerable: false,
            get: function get() {
              return this.parentModule._store;
            }
          }), _Object$definePropert));
        }
      }
      return instance;
    }
  }]);
  return RcModule;
}(), (_applyDecoratedDescriptor(_class2.prototype, "_onStateChange", [_once["default"], _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_onStateChange"), _class2.prototype)), _class2)) || _class);
exports["default"] = RcModule;
//# sourceMappingURL=index.js.map
