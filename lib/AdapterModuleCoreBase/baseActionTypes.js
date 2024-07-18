"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.baseActionTypes = void 0;
var _moduleActionTypes = require("@ringcentral-integration/commons/enums/moduleActionTypes");
var _proxyActionTypes = require("@ringcentral-integration/commons/enums/proxyActionTypes");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
var baseActionTypes = _ObjectMap.ObjectMap.prefixKeys([].concat(_toConsumableArray(_ObjectMap.ObjectMap.keys(_moduleActionTypes.moduleActionTypes)), _toConsumableArray(_ObjectMap.ObjectMap.keys(_proxyActionTypes.proxyActionTypes)), ['syncClosed', 'syncMinimized', 'syncSize', 'syncFocus', 'syncPosition', 'showAdapter']), 'adapterModuleCore');
exports.baseActionTypes = baseActionTypes;
var _default = baseActionTypes;
exports["default"] = _default;
//# sourceMappingURL=baseActionTypes.js.map
