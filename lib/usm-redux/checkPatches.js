"use strict";

require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPatches = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var checkPatches = function checkPatches(oldStateTree, options) {
  var _options$_patches;
  var patches = (_options$_patches = options._patches) !== null && _options$_patches !== void 0 ? _options$_patches : [];
  var _iterator = _createForOfIteratorHelper(patches),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var patch = _step.value;
      var op = patch.op,
        path = patch.path,
        value = patch.value;
      if (op === 'replace' && (toString.call(value) === '[object Object]' && !!Object.keys(value).length || Array.isArray(value) && !!value.length)) {
        var oldState = path.reduce(function (state, _path) {
          return state === null || state === void 0 ? void 0 : state[_path];
        }, oldStateTree);
        if (oldState && _typeof(oldState) === 'object') {
          var length = Array.isArray(oldState) ? oldState.length : Object.keys(oldState).length;
          if (length > 0) {
            return true;
          }
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
};
exports.checkPatches = checkPatches;
//# sourceMappingURL=checkPatches.js.map
