"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.globalStorage = void 0;

var _RcModule = require("./RcModule");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * decorate global storage state with `GlobalStorage` Module
 */
var globalStorage = function globalStorage(target, key, descriptor) {
  var _target$globalStorage;

  if (!(key in target[_RcModule.stateKey])) {
    throw new Error("The ".concat(key, " must be decorated with '@state' first, and it must be a Redux state to be a persistent state"));
  }

  target[_RcModule.globalStorageStateKey] = [].concat(_toConsumableArray((_target$globalStorage = target[_RcModule.globalStorageStateKey]) !== null && _target$globalStorage !== void 0 ? _target$globalStorage : []), [key]);
};
/**
 * decorate storage state with `Storage` Module
 */


exports.globalStorage = globalStorage;

var storage = function storage(target, key, descriptor) {
  var _target$storageStateK;

  if (!(key in target[_RcModule.stateKey])) {
    throw new Error("The ".concat(key, " must be decorated with '@state' first, and it must be a Redux state to be a persistent state"));
  }

  target[_RcModule.storageStateKey] = [].concat(_toConsumableArray((_target$storageStateK = target[_RcModule.storageStateKey]) !== null && _target$storageStateK !== void 0 ? _target$storageStateK : []), [key]);
};

exports.storage = storage;
//# sourceMappingURL=decorators.js.map
