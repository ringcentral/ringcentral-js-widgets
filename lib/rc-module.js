'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _reduxHelper = require('./redux-helper');

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['store', 'getState', 'prefix', 'actions', 'emitter']);

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

var RcModule = function () {
  /**
   * @constructor
   */
  function RcModule(_ref) {
    var _this = this;

    var promiseForStore = _ref.promiseForStore;
    var _ref$getState = _ref.getState;
    var getState = _ref$getState === undefined ? defaultGetState : _ref$getState;
    var prefix = _ref.prefix;
    var actions = _ref.actions;
    (0, _classCallCheck3.default)(this, RcModule);

    // Extending EventEmitter breaks some mechanic, so we wire emitter up like this instead.
    this[symbols.emitter] = new _eventEmitter2.default();
    this[symbols.getState] = getState;
    this[symbols.prefix] = prefix;
    this[symbols.actions] = actions && (0, _reduxHelper.prefixActions)(actions, prefix);
    promiseForStore.then(function (store) {
      _this[symbols.store] = store;
    });
  }

  /**
   * @function
   * @param {String} event
   * @param {Function} handler
   * @return {Function} Unregister function.
   */


  (0, _createClass3.default)(RcModule, [{
    key: 'on',
    value: function on(event, handler) {
      var _this2 = this;

      this[symbols.emitter].on(event, handler);
      return function () {
        _this2[symbols.emitter].off(event, handler);
      };
    }
    /**
     * @function
     * @param {String} event
     * @param {Function)} handler
     * @return {Function} Unregister function.
     */

  }, {
    key: 'once',
    value: function once(event, handler) {
      var _this3 = this;

      this[symbols.emitter].once(event, handler);
      return function () {
        _this3[symbols.emitter].off(event, handler);
      };
    }
    /**
     * @function
     * @param {String} event
     * @param {...args} args
     */

  }, {
    key: 'emit',
    value: function emit(event) {
      var _symbols$emitter;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_symbols$emitter = this[symbols.emitter]).emit.apply(_symbols$emitter, [event].concat(args));
    }
    /**
     * @function
     * @param {String} event
     * @param {Function} handler
     */

  }, {
    key: 'off',
    value: function off(event, handler) {
      this[symbols.emitter].off(event, handler);
    }
  }, {
    key: 'state',
    get: function get() {
      return this[symbols.getState]();
    }
  }, {
    key: 'reducer',
    get: function get() {
      return defaultReducer;
    }
  }, {
    key: 'store',
    get: function get() {
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
  }]);
  return RcModule;
}();

exports.default = RcModule;
//# sourceMappingURL=rc-module.js.map
