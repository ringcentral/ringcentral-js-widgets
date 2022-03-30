"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.subscribe = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

var _constant = require("./constant");

var _index = require("./utils/index");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var subscribe = function subscribe(module, listener) {
  if (_typeof(module) !== 'object') {
    throw new Error("The subscription target '".concat(module, "' is not an object."));
  }

  var service = module;
  var className = Object.getPrototypeOf(service).constructor.name;

  if (typeof listener !== 'function') {
    throw new Error("The 'listener' should be a function in the class '".concat(className, "'."));
  }

  var unsubscribe;

  if (service[_constant.storeKey]) {
    unsubscribe = service[_constant.storeKey].subscribe(listener);
  } else {
    // When constructing
    var subscriptions = service[_constant.subscriptionsKey] || [];

    var _unsubscribe;

    subscriptions.push(function () {
      if (_typeof(service[_constant.storeKey]) !== 'object') {
        throw new Error("The subscription target class '".concat(className, "' should be created via 'createStore()'."));
      }

      _unsubscribe = service[_constant.storeKey].subscribe(listener);
    });

    unsubscribe = function unsubscribe() {
      return _unsubscribe();
    };

    Object.assign(service, _defineProperty({}, _constant.subscriptionsKey, subscriptions));
  }

  return unsubscribe;
};
/**
 * watch value change in the store
 *
 * @param module binding module instance
 * @param selector that selector you want to watch
 * @param watcher callback function
 * @param options options for that watcher
 * @returns unsubscribe method
 *
 * @example
 * ```ts
 *
    // watch one variable
    watch(
      this,
      () => this._deps.auth.loggedIn,
      (newValue, oldValue) => {
        // do something
      },
    );

    // watch many variables
    watch(
      this,
      () => [
        this._deps.auth.loggedIn,
        this._deps.routerInteraction.currentPath,
      ],
      (newValue, oldValue) => {
        // do something
      },
      { multiple: true },
    );
 * ```
 * custom equality function
 * ```ts
    export const customEqual = (newValue: unknown, oldValue: unknown) => {
      return x !== y;
    };

    watch(
      this,
      () => this._deps.auth.loggedIn,
      (newValue, oldValue) => {
        // do something
      },
      { isEqual: customEqual },
    );
    ```
 */


exports.subscribe = subscribe;

var watch = function watch(module, selector, watcher) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      _ref$isEqual = _ref.isEqual,
      isEqual = _ref$isEqual === void 0 ? _index.isEqual : _ref$isEqual;

  if (typeof watcher !== 'function') {
    var className = Object.getPrototypeOf(module).constructor.name;
    throw new Error("The 'watcher' should be a function in the class '".concat(className, "'."));
  }

  var oldValue = selector();

  if (multiple) {
    if (!Array.isArray(oldValue)) {
      var _className = Object.getPrototypeOf(module).constructor.name;
      throw new Error("The 'selector' should be a function that returns an array in the class '".concat(_className, "'."));
    }

    return subscribe(module, function () {
      var newValue = selector();
      var length = oldValue.length;

      for (var i = 0; i < length; i++) {
        if (!isEqual(newValue[i], oldValue[i])) {
          var lastValues = oldValue;
          oldValue = newValue;
          watcher(newValue, lastValues);
          break;
        }
      }
    });
  }

  return subscribe(module, function () {
    var newValue = selector();

    if (!isEqual(newValue, oldValue)) {
      var lastValue = oldValue;
      oldValue = newValue;
      watcher(newValue, lastValue);
    }
  });
};

exports.watch = watch;
//# sourceMappingURL=subscribe.js.map
