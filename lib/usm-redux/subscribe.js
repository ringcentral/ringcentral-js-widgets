"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchEffect = exports.watch = exports.subscribe = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

var _constant = require("./constant");

var _index = require("./utils/index");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

exports.subscribe = subscribe;

var watch = function watch(module, selector, watcher) {
  if (typeof watcher !== 'function') {
    var className = Object.getPrototypeOf(module).constructor.name;
    throw new Error("The 'watcher' should be a function in the class '".concat(className, "'."));
  }

  var oldValue = selector();
  return subscribe(module, function () {
    var newValue = selector();

    if (!(0, _index.isEqual)(newValue, oldValue)) {
      var lastValue = oldValue;
      oldValue = newValue;
      watcher(newValue, lastValue);
    }
  });
};

exports.watch = watch;

var watchEffect = function watchEffect(module, selector, watcher) {
  if (typeof watcher !== 'function') {
    var className = Object.getPrototypeOf(module).constructor.name;
    throw new Error("The 'watcher' should be a function in the class '".concat(className, "'."));
  }

  var oldValues = selector();

  if (!Array.isArray(oldValues)) {
    var _className = Object.getPrototypeOf(module).constructor.name;
    throw new Error("The 'selector' should be a function that returns an array in the class '".concat(_className, "'."));
  }

  return subscribe(module, function () {
    var newValues = selector();
    var length = oldValues.length;

    for (var i = 0; i < length; i++) {
      if (!(0, _index.isEqual)(newValues[i], oldValues[i])) {
        var lastValues = oldValues;
        oldValues = newValues;
        watcher(newValues, lastValues);
        break;
      }
    }
  });
};

exports.watchEffect = watchEffect;
//# sourceMappingURL=subscribe.js.map
