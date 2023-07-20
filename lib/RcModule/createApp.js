"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.values");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = void 0;
var _redux = require("redux");
var _RcModule = require("./RcModule");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Create app with FactoryModule based on RcModuleV2.
 * !! Please ensure that all dependency injection modules are based on the RcModuleV2 module.
 */
var createApp = function createApp(_ref) {
  var main = _ref.main,
    _ref$modules = _ref.modules,
    modules = _ref$modules === void 0 ? {} : _ref$modules,
    reduxEnhancer = _ref.reduxEnhancer;
  (0, _RcModule.createStore)({
    modules: [].concat(_toConsumableArray(Object.values(modules)), [main]),
    // disable AutoFreeze
    strict: false
  }, undefined, {
    reduxEnhancer: reduxEnhancer,
    handleReducers: function handleReducers(reducers) {
      Object.entries(modules).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          module = _ref3[1];
        if (key !== 'storage' && key !== 'globalStorage' && module instanceof _RcModule.RcModuleV2) {
          module[_RcModule.spawnStorageReducersKey]();
        }
      });
      if (modules.storage) {
        Object.assign(reducers, {
          storage: modules.storage.reducer
        });
      }
      if (modules.globalStorage) {
        Object.assign(reducers, {
          globalStorage: modules.globalStorage.reducer
        });
      }
      return (0, _redux.combineReducers)(reducers);
    }
  });
  main._initModule().then(function () {
    // For scenarios without dependency injection
    Object.values(modules).forEach(function (module) {
      var _module$_initModule;
      return module === null || module === void 0 ? void 0 : (_module$_initModule = module._initModule) === null || _module$_initModule === void 0 ? void 0 : _module$_initModule.call(module);
    });
  });
  return main;
};
exports.createApp = createApp;
//# sourceMappingURL=createApp.js.map
