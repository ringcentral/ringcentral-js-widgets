"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computed = void 0;

var _index = require("../utils/index");

var _constant = require("../constant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var computed = function computed(depsCallback) {
  return function (target, key, descriptor) {
    if (process.env.NODE_ENV === 'development') {
      if (typeof descriptor.get !== 'function') {
        throw new Error("'@computed' should decorate a getter.");
      }

      if (typeof depsCallback !== 'function') {
        throw new Error("@computed() parameter should be a selector function for dependencies collection.");
      }
    }

    var depsCallbackSelector = (0, _index.createSelectorWithArray)( // This check will be skipped if the store has not been created yet.
    function (that) {
      var _that$storeKey$getSta, _that$storeKey;

      return [(_that$storeKey$getSta = (_that$storeKey = that[_constant.storeKey]) === null || _that$storeKey === void 0 ? void 0 : _that$storeKey.getState()) !== null && _that$storeKey$getSta !== void 0 ? _that$storeKey$getSta : {}];
    }, // eslint-disable-next-line func-names
    function () {
      return depsCallback(this);
    });
    var selector = (0, _index.createSelectorWithArray)(function (that) {
      return depsCallbackSelector.call(that);
    }, descriptor.get);
    return _objectSpread(_objectSpread({}, descriptor), {}, {
      get: function get() {
        return selector.call(this);
      }
    });
  };
};

exports.computed = computed;
//# sourceMappingURL=computed.js.map
