"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _constant = require("../constant");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable @typescript-eslint/no-explicit-any */
if (process.env.NODE_ENV !== 'production') {
  globalThis.checkModules = function () {
    var _globalThis$app$modul;
    var needCheckModules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var checkedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var pickedModules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var isObject = toString.call(needCheckModules) === '[object Object]';
    var _needCheckModules = isObject ? [needCheckModules] : needCheckModules !== null && needCheckModules !== void 0 ? needCheckModules : Object.values((_globalThis$app$modul = globalThis.app.modules) !== null && _globalThis$app$modul !== void 0 ? _globalThis$app$modul : {});
    _needCheckModules.forEach(function (module) {
      if (module && typeof module.ready === 'boolean' && !module.ready) {
        var notReadyModules = module[_constant.notReadyModulesKey];
        if (notReadyModules.length > 0 && !checkedModules.includes(module)) {
          checkedModules.push(module);
          globalThis.checkModules(notReadyModules, checkedModules, pickedModules);
          return;
        } else if (!pickedModules.includes(module) && notReadyModules.length === 0) {
          pickedModules.push(module);
        }
      }
    });
    if (!needCheckModules || isObject) {
      var error = 0;
      // please check `_shouldInit()`, `onInit()` or `onInitOnce`.
      pickedModules.forEach(function (module) {
        if (!module._shouldInit() && module.pending) {
          console.warn("Please check the ".concat(module.constructor.name, "._shouldInit method."));
          console.log(module._shouldInit);
          error++;
        } else {
          if (module.onInit) {
            console.warn("Please check the ".concat(module.constructor.name, ".onInit method."));
            error++;
          }
          if (module.onInitOnce) {
            console.warn("Please check the ".concat(module.constructor.name, ".onInitOnce method."));
            error++;
          }
        }
      });
      if (error === 0) {
        console.log('✨✨✨✨✨ All modules pass check ✨✨✨✨✨');
      } else if (!needCheckModules) {
        var _globalThis$app$modul2;
        return Object.entries((_globalThis$app$modul2 = globalThis.app.modules) !== null && _globalThis$app$modul2 !== void 0 ? _globalThis$app$modul2 : {}).reduce(function (obj, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          if (value.ready === false) {
            obj[key] = function () {
              return globalThis.checkModules(value);
            };
          }
          return obj;
        }, {});
      }
    }
  };
}
//# sourceMappingURL=checkModules.js.map
