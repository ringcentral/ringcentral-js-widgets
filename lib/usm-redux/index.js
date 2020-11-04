"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = state;
exports.action = action;
exports.reducer = reducer;
exports.computed = computed;
Object.defineProperty(exports, "event", {
  enumerable: true,
  get: function get() {
    return _usm.event;
  }
});
Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function get() {
    return _usm.Event;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _module["default"];
  }
});

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _immer = require("immer");

var _reselect = require("reselect");

var _usm = require("../usm");

var _module = _interopRequireDefault(require("./core/module"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * `@state` is used to decorate a module state, which is based on the Redux reducer.
 */
function state(target, name, descriptor) {
  target._actionTypes = [].concat(_toConsumableArray(target._actionTypes || []), [name]);
  target._reducersMaps = _objectSpread({}, target._reducersMaps || {});
  target._initialValue = _objectSpread({}, target._initialValue || {});
  target._initialValue[name] = descriptor && descriptor.initializer ? descriptor.initializer.call(target) : undefined;

  var get = function get() {
    return this._store ? this.state[name] : this._initialValue[name];
  };

  var set = function set(value) {
    if (this._store) {
      this.state[name] = value;
    } else {
      // Support for synchronous updating of initialized state values while in the constructor.
      this._initialValue[name] = value;
    }
  };

  return {
    enumerable: true,
    configurable: true,
    get: get,
    set: set
  };
}
/**
 * `@action` is used to decorate a method that changes the state of the module (Executing it will dispatch a Redux action),
 * and it does **NOT** support asynchronous methods.
 */


function action(target, name, descriptor) {
  var fn = descriptor.value;

  descriptor.value = function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var originalState = this.state;

    var _produceWithPatches = (0, _immer.produceWithPatches)(originalState, function (state) {
      _this.__$$state$$__ = state;
      fn.call.apply(fn, [_this].concat(args));
    }),
        _produceWithPatches2 = _slicedToArray(_produceWithPatches, 2),
        states = _produceWithPatches2[0],
        patches = _produceWithPatches2[1];

    this.__$$state$$__ = undefined;

    this._dispatch({
      type: Object.keys(this.state).map(function (key) {
        return _this.actionTypes[key];
      }),
      states: states,
      patches: patches,
      __name__: this.__name__
    });
  };

  return descriptor;
}

function reducer(target, name, descriptor) {
  var fn = descriptor.value;

  descriptor.value = function () {
    var _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var states = fn.apply(this, [].concat(args, [this.state]));

    this._dispatch({
      type: Object.keys(this.state).map(function (key) {
        return _this2.actionTypes[key];
      }),
      states: states
    });
  };

  return descriptor;
}

var WRAPPER = '__selectors__';
/**
 * Use `@computed(callback)`, you should make sure that the return value of its callback function is an `Array` of dependency collections.
 */

function computed(target, name, descriptor) {
  if (descriptor && typeof descriptor.initializer !== 'function') {
    throw new Error("".concat(name, " must be used in properties setter value with Array type"));
  }

  return {
    configurable: true,
    enumerable: true,
    get: function get() {
      var _this3 = this;

      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }

      if (!this[WRAPPER][name] && descriptor) {
        var _selector = descriptor.initializer.call(this);

        var selector = (0, _reselect.createSelector)(_selector.slice(0, -1), _selector.slice(-1)[0]);

        this[WRAPPER][name] = function () {
          return selector(_this3.state);
        };
      }

      return this[WRAPPER][name]();
    }
  };
}
//# sourceMappingURL=index.js.map
