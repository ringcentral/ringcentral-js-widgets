'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reselect = require('reselect');

var _Enum = require('../Enum');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * @class
 * @default
 * @description Base module class.
 */

var RcModule = function () {
  /**
   * @constructor
   * @param {Function} options.getState
   * @param {String} options.prefix
   * @param {Enum} options.actionTypes,
   */
  function RcModule() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$getState = _ref.getState,
        getState = _ref$getState === undefined ? defaultGetState : _ref$getState,
        prefix = _ref.prefix,
        actionTypes = _ref.actionTypes;

    (0, _classCallCheck3.default)(this, RcModule);

    if (typeof getState !== 'function') {
      throw new Error('The `getState` options property must be of type function');
    }
    this._getState = getState;
    if (prefix && typeof prefix !== 'string') {
      throw new Error('The `prefix` options property must be null, undefined, or a string');
    }
    this._prefix = prefix;
    this._actionTypes = actionTypes && (0, _Enum.prefixEnum)({ enumMap: actionTypes, prefix: prefix });
    this._reducer = defaultReducer;
    this._modulePath = 'root';
    this._selectors = {};
    // add state selector

    this.addSelector('state', function () {
      return _this._getState.call(_this);
    });
  }

  /**
   * @property
   * @type any
   * @description The state of the module
   */


  (0, _createClass3.default)(RcModule, [{
    key: 'addModule',


    /**
     * @function addModule
     * @param {String} name - Name of the module. Also used for the property name.
     * @param {any} module - The module to be attached, can be any type.
     * @description Add the desired module to the
     */
    value: function addModule(name, module) {
      if (Object.prototype.hasOwnProperty.call(this, name)) {
        throw new Error('Property \'' + name + '\' already exists...');
      }
      (0, _defineProperty2.default)(this, name, {
        get: function get() {
          return module;
        },

        enumerable: true
      });
      // tag submodule with a modulePath for proxying function calls
      // do nothing if module is already tagged
      if (this[name]._modulePath === 'root') {
        this[name]._modulePath = this.modulePath + '.' + name;
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
    key: 'addSelector',
    value: function addSelector(name) {
      var _context;

      if ((_context = this._selectors, Object.prototype.hasOwnProperty).call(_context, name)) {
        throw new Error('Selector \'' + name + '\' already exists...');
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var selector = args.pop();
      if (args.length > 0) {
        this._selectors[name] = _reselect.createSelector.apply(undefined, args.concat([selector]));
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
    key: 'getSelector',
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
    key: 'setStore',
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
    key: '_setStore',
    value: function _setStore(store) {
      this._store = store;
      for (var subModule in this) {
        if (Object.prototype.hasOwnProperty.call(this, subModule) && this[subModule] instanceof RcModule) {
          this[subModule]._setStore(store);
        }
      }
    }
  }, {
    key: '_initModule',
    value: function _initModule() {
      if (!this._suppressInit && !this._initialized && typeof this.initialize === 'function') {
        this._initialized = true;
        this.initialize();
      }
      for (var subModule in this) {
        if (Object.prototype.hasOwnProperty.call(this, subModule) && this[subModule] instanceof RcModule) {
          this[subModule]._initModule();
        }
      }
    }
  }, {
    key: 'state',
    get: function get() {
      return this.getSelector('state')();
    }

    /**
     * @property
     * @type Function
     * @description The reducer function of the module
     */

  }, {
    key: 'reducer',
    get: function get() {
      return this._reducer;
    }

    /**
     * @property
     * @type Object
     * @description The store object of the module
     */

  }, {
    key: 'store',
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
    key: 'prefix',
    get: function get() {
      return this._prefix;
    }
    /**
     * @property
     * @type Enum
     * @description The actionTypes used by the module
     */

  }, {
    key: 'actionTypes',
    get: function get() {
      return this._actionTypes;
    }
    /**
     * @property
     * @type String
     * @description The canonical path of the module from the root module
     */

  }, {
    key: 'modulePath',
    get: function get() {
      return this._modulePath;
    }
  }]);
  return RcModule;
}();

exports.default = RcModule;
//# sourceMappingURL=index.js.map
