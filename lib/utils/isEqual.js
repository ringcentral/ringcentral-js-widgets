"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areShallowEqualWithArray = areShallowEqualWithArray;
exports.areShallowEqualWithObject = exports.isEqualExceptFunction = exports.isEqual = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isEqual = function isEqual(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } // eslint-disable-next-line no-self-compare


  return x !== x && y !== y;
};

exports.isEqual = isEqual;

var isEqualExceptFunction = function isEqualExceptFunction(x, y) {
  if (typeof x === 'function' && typeof y === 'function') return true;
  return isEqual(x, y);
};

exports.isEqualExceptFunction = isEqualExceptFunction;

var areShallowEqualWithObject = function areShallowEqualWithObject(objA, objB) {
  if (isEqualExceptFunction(objA, objB)) return true;

  if (_typeof(objA) !== 'object' || objA === null || _typeof(objB) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !isEqualExceptFunction(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
};

exports.areShallowEqualWithObject = areShallowEqualWithObject;

function areShallowEqualWithArray(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  var length = prev.length;

  for (var i = 0; i < length; i += 1) {
    if (!isEqual(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}
//# sourceMappingURL=isEqual.js.map
