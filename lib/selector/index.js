"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selector = selector;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _reselect = require("reselect");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SELECTORS = Symbol('selectors');
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

      if (!this[SELECTORS]) {
        this[SELECTORS] = new Map();
      }

      if (!this[SELECTORS].has(prototype)) {
        this[SELECTORS].set(prototype, new Map());
      }

      var proto = this[SELECTORS].get(prototype);

      if (!proto.has(property)) {
        var targetSymbol = Symbol("".concat(property, "-target"));
        this[targetSymbol] = _reselect.createSelector.apply(void 0, _toConsumableArray(initializer.call(this)));
        proto.set(property, function () {
          return _this[targetSymbol]();
        });
      }

      return proto.get(property)();
    }
  };
}
//# sourceMappingURL=index.js.map
