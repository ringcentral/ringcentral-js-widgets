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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
