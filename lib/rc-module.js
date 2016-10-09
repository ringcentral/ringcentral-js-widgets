'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.addModule = addModule;
exports.initFunction = initFunction;
exports.suppressInit = suppressInit;
exports.initializeModule = initializeModule;

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _reduxHelper = require('./redux-helper');

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['store', 'getState', 'prefix', 'actions', 'emitter', 'modulePath', 'oldState', 'initFunction', 'isInitialized', 'suppressInit']);

/**
 * @function
 * @param {Object} state
 * @return {Object}
 * @description Default reducer if module does not has its own reducer.
 */
function defaultReducer(state) {
  if (typeof state === 'undefined') return {};
  return state;
}

function defaultGetState() {
  return this.store.getState();
}

/**
 * @class
 * @default
 * @description Base module class.
 */

var RcModule = function (_Emitter) {
  (0, _inherits3.default)(RcModule, _Emitter);

  /**
   * @constructor
   */
  function RcModule() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, RcModule);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RcModule.__proto__ || (0, _getPrototypeOf2.default)(RcModule)).call(this));

    var _options$getState = options.getState;
    var getState = _options$getState === undefined ? defaultGetState : _options$getState;
    var prefix = options.prefix;
    var actions = options.actions;

    if (typeof getState !== 'function') {
      throw new Error('The `getState` options property must be of type function');
    }
    _this[symbols.getState] = getState;
    if (prefix && typeof prefix !== 'string') {
      throw new Error('The `prefix` options property must be null, undefined, or a string');
    }
    _this[symbols.prefix] = prefix;
    _this[symbols.actions] = actions && (0, _reduxHelper.prefixActions)(actions, prefix);
    return _this;
  }

  (0, _createClass3.default)(RcModule, [{
    key: 'state',
    get: function get() {
      return this[symbols.getState].call(this);
    }
  }, {
    key: 'reducer',
    get: function get() {
      return defaultReducer;
    }
  }, {
    key: 'store',
    get: function get() {
      if (!this[symbols.store]) {
        throw new Error('module has not been initialized...');
      }
      return this[symbols.store];
    }
  }, {
    key: 'prefix',
    get: function get() {
      return this[symbols.prefix];
    }
  }, {
    key: 'actions',
    get: function get() {
      return this[symbols.actions];
    }
  }, {
    key: 'modulePath',
    get: function get() {
      return this[symbols.modulePath] || 'root';
    }
  }]);
  return RcModule;
}(_emitter2.default);

/**
 * @function addModule
 * @param {String} name - Name of the module. Also used for the property name.
 * @param {any} module - The module to be attached, can be any type.
 * @description Intended to be used as an instance function. Either use
 *  the bind operator (target::addModule('testmodule', {})), or
 *  use call/apply (addModule.call(target, 'testmodule', {})).
 */


exports.default = RcModule;
function addModule(name, module) {
  if (!this || !(this instanceof RcModule)) {
    throw new Error('addModule should be called with scope binding to target module');
  }
  if (Object.prototype.hasOwnProperty.call(this, name)) {
    throw new Error('module \'' + name + '\' already exists...');
  }
  (0, _defineProperty2.default)(this, name, {
    get: function get() {
      return module;
    },

    enumerable: true
  });

  // tag submodule with a modulePath for proxying function calls
  // do nothing if module is already tagged
  if (!this[name][symbols.modulePath]) {
    this[name][symbols.modulePath] = this.modulePath + '.' + name;
  }
}

/**
 * @function
 * @decorator
 * @param {Object} prototype
 * @param {String} property
 * @param {Object} descriptor
 * @description Decorator function to decorate initialize functions for RcModules
 */
function initFunction(prototype, property, descriptor) {
  var value = descriptor.value;

  if (typeof value !== 'function') {
    throw new Error('initFunction must be a function');
  }
  var proto = prototype;
  proto[symbols.initFunction] = value;

  function proxyFunction() {
    throw new Error('initFunction cannot be called directly');
  }
  // eslint-disable-next-line
  proxyFunction.toString = function () {
    return value.toString();
  };

  return {
    enumerable: true,
    configurable: false,
    get: function get() {
      return proxyFunction;
    }
  };
}

/**
 * @function
 * @description Helper function used to suppress the call of initFunction
 */
function suppressInit() {
  this[symbols.suppressInit] = true;
}

function setStore(store) {
  var _this2 = this;

  if (!this[symbols.store]) {
    this[symbols.store] = store;

    // state change event for state tracking
    store.subscribe(function () {
      var oldState = _this2[symbols.oldState];
      var newState = _this2.state;
      if (newState !== oldState) {
        _this2[symbols.oldState] = newState;
        _this2.emit('state-change', {
          oldState: oldState,
          newState: newState
        });
      }
    });
    for (var subModule in this) {
      if (this.hasOwnProperty(subModule) && this[subModule] instanceof RcModule) {
        var _context;

        (_context = this[subModule], setStore).call(_context, store);
      }
    }
  }
}

function callInit() {
  if (!this[symbols.suppressInit] && !this[symbols.isInitialized] && typeof this[symbols.initFunction] === 'function') {
    this[symbols.isInitialized] = true;
    this[symbols.initFunction]();
  }
  for (var subModule in this) {
    if (this.hasOwnProperty(subModule) && this[subModule] instanceof RcModule) {
      var _context2;

      (_context2 = this[subModule], callInit).call(_context2);
    }
  }
}

function initializeModule(store) {
  if (!(this instanceof RcModule)) {
    throw new Error('initializeModule should be scope-bound to a RcModule instance');
  }
  if (this[symbols.store]) {
    throw new Error('Module has already been initialized');
  }
  setStore.call(this, store);
  callInit.call(this);
}
//# sourceMappingURL=rc-module.js.map
