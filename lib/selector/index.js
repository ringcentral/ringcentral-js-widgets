"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selector = selector;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _reselect = require("reselect");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var WRAPPER = Symbol('wrapper');
/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */

function selector(prototype, property, _ref) {
  var initializer = _ref.initializer;
  return {
    configurable: true,
    enumerable: true,
    get: function get() {
      var _this = this;

      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }

      if (!this[WRAPPER][property]) {
        var targetSymbol = Symbol("".concat(property, "-target"));
        this[targetSymbol] = _reselect.createSelector.apply(void 0, _toConsumableArray(initializer.call(this)));

        this[WRAPPER][property] = function () {
          return _this[targetSymbol]();
        };
      }

      return this[WRAPPER][property]();
    }
  };
}
//# sourceMappingURL=index.js.map
