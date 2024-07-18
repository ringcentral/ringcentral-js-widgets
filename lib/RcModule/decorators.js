"use strict";

require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.globalStorage = void 0;
var _RcModule = require("./RcModule");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; } /* eslint-disable @typescript-eslint/no-unused-vars */
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
