"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

var _redux = require("redux");

var _RcModule = require("./RcModule");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
