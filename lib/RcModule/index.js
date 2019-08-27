"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.define-property");

var _reselect = require("reselect");

var _di = require("../di");

var _Enum = require("../Enum");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _proxyStatuses = _interopRequireDefault(require("../../enums/proxyStatuses"));

var _once = _interopRequireDefault(require("../once"));

var _required = _interopRequireDefault(require("../required"));

var _deprecated = _interopRequireDefault(require("../deprecated"));

var _dec, _dec2, _dec3, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
    dep: 'ModuleOptions',
    optional: true
  }]
}), _dec2 = _required["default"].warn, _dec3 = _required["default"].warn, _dec(_class = (_class2 =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param {Function} options.getState
   * @param {String} options.prefix
   * @param {Enum} options.actionTypes,
   */
  function RcModule() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$getState = _ref.getState,
        getState = _ref$getState === void 0 ? defaultGetState : _ref$getState,
        _ref$getProxyState = _ref.getProxyState,
        getProxyState = _ref$getProxyState === void 0 ? defaultGetProxyState : _ref$getProxyState,
        prefix = _ref.prefix,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === void 0 ? this._actionTypes : _ref$actionTypes;

    _classCallCheck(this, RcModule);

    if (typeof getState !== 'function') {
      throw new Error('The `getState` options property must be of type function');
    }

    this._getState = getState;
    this._getProxyState = getProxyState;

    if (prefix && typeof prefix !== 'string') {
      throw new Error('The `prefix` options property must be null, undefined, or a string');
    }

    this._prefix = prefix;
    this._prefixedActionTypes = actionTypes && (0, _Enum.prefixEnum)({
      enumMap: actionTypes,
      prefix: prefix
    });
    this._reducer = defaultReducer;
    this._proxyReducer = defaultReducer;
    this._modulePath = 'root';
    this._selectors = {};
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
      }); // tag submodule with a modulePath for proxying function calls
      // do nothing if module is already tagged

      if (this[name]._modulePath === 'root') {
        this[name]._modulePath = "".concat(this.modulePath, ".").concat(name);
      }
    }
    /**
     * @function
     * @param {String} name
     * @description Add the selector to the internal selector object.
     *  This is intended to be called with this.addSelector(name, selectorFn) or
     *  this.addSelector(name, [...dependenciesFns], selectorFn);
     */

  }, {
    key: "addSelector",
    value: function addSelector(name) {
      if (Object.prototype.hasOwnProperty.call(this._selectors, name)) {
        throw new Error("Selector '".concat(name, "' already exists..."));
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var selector = args.pop();

      if (args.length > 0) {
        this._selectors[name] = _reselect.createSelector.apply(void 0, args.concat([selector]));
      } else {
        this._selectors[name] = selector;
      }
    }
    /**
     * @function
     * @param {String} name
     * @return {Function}
     * @description Returns the named selector function
     */

  }, {
    key: "getSelector",
    value: function getSelector(name) {
      return this._selectors[name];
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
          this[subModule]._setStore(store);
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
    value: function _onStateChange() {}
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
            this[subModule]._initModule();
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
    key: "status",

    /**
     * Represents for module status, should be implemented by child class.
     */
    get: function get() {
      throw new Error('status should be implemented.');
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
      return _di.Injector.bootstrap(this);
    }
  }]);

  return RcModule;
}(), (_applyDecoratedDescriptor(_class2.prototype, "_actionTypes", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_actionTypes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addSelector", [_deprecated["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "addSelector"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getSelector", [_deprecated["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getSelector"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onStateChange", [_once["default"], _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_onStateChange"), _class2.prototype)), _class2)) || _class);
exports["default"] = RcModule;
//# sourceMappingURL=index.js.map
