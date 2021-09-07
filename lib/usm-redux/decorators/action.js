"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.date.now");

var _immer = require("immer");

var _constant = require("../constant");

var _createStore = require("../createStore");

var _index = require("../utils/index");

var _checkPatches = require("../checkPatches");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var action = function action(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error("".concat(String(key), " can only be decorated by '@action' as a class method."));
  }

  var value = function value() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var time;

    if (process.env.NODE_ENV === 'development') {
      time = Date.now();
    }

    if (typeof (0, _index.getStagedState)() === 'undefined') {
      try {
        var lastState = this[_constant.storeKey].getState();

        var state;
        var patches = [];
        var inversePatches = [];

        var recipe = function recipe(draftState) {
          (0, _index.setStagedState)(draftState);
          fn.apply(_this, args);
        };

        var enablePatches = (0, _createStore.getPatchesToggle)();

        if (enablePatches) {
          var _produceWithPatches = (0, _immer.produceWithPatches)(lastState, recipe);

          var _produceWithPatches2 = _slicedToArray(_produceWithPatches, 3);

          state = _produceWithPatches2[0];
          patches = _produceWithPatches2[1];
          inversePatches = _produceWithPatches2[2];
        } else {
          state = (0, _immer.produce)(lastState, recipe);
        }

        (0, _index.setStagedState)(undefined);
        var changed = lastState !== state;

        if (process.env.NODE_ENV === 'development') {
          if (!changed) {
            var _console;

            (_console = console).warn.apply(_console, ["There are no state updates to method '".concat(this[_constant.identifierKey], ".").concat(key.toString(), "' with arguments:")].concat(args));
          } // performance checking


          var executionTime = Date.now() - time;
          if (executionTime > 100) console.warn("The execution time of method '".concat(this[_constant.identifierKey], ".").concat(key.toString(), "' is ").concat(executionTime, " ms, it's recommended to use 'dispatch' API.")); // performance detail: https://immerjs.github.io/immer/docs/performance
        }

        if (changed) {
          var _action = _objectSpread({
            type: this[_constant.identifierKey],
            method: key,
            params: args,
            _state: state,
            _usm: _constant.usm
          }, enablePatches ? {
            _patches: patches,
            _inversePatches: inversePatches
          } : {});

          if (process.env.NODE_ENV === 'development') {
            var requiredWarning = (0, _checkPatches.checkPatches)(lastState, _action);

            if (requiredWarning) {
              console.warn("The state update operation in the method '".concat(this[_constant.identifierKey].toString(), ".").concat(key.toString(), "'  is a replacement update operation. If there is a performance issue, be sure to use mutation updates to ensure the minimum set of update patches."));
            }
          }

          this[_constant.storeKey].dispatch(_action);
        }
      } finally {
        (0, _index.setStagedState)(undefined);
      }
    } else {
      // enable staged state mode.
      fn.apply(this, args);
    }
  };

  return _objectSpread(_objectSpread({}, descriptor), {}, {
    value: value
  });
};

exports.action = action;
//# sourceMappingURL=action.js.map
