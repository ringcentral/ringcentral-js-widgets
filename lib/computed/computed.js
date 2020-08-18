"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computed = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * **Description:**
 *
 * You can use `@computed` to decorate a getter function for derived data,
 * which quickly solves performance problems for computing Derived Data.
 *
 * **Example:**
 *
 * ```ts
 * class Shop {
 *   @state
 *   fruits = [];
 *
 *   @state
 *   vegetables = [];
 *
 *   @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
 *   get sum() {
 *     return this.fruits.length + this.vegetables.length;
 *   }
 * }
 * ```
 */
var computed = function computed(depsCallback) {
  return function (target, key, descriptor) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof descriptor.get !== 'function') {
        throw new Error("'@computed' should decorate a getter.");
      }

      if (typeof depsCallback !== 'function') {
        throw new Error("@computed() parameter should be a selector function for dependencies collection.");
      }
    }

    var depsCallbackSelector = (0, _utils.createSelectorWithArray)(function (that) {
      return [that._store.getState()];
    }, // eslint-disable-next-line func-names
    function () {
      return depsCallback(this);
    });
    var selector = (0, _utils.createSelectorWithArray)(function (that) {
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
