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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var baseActionTypes = _ObjectMap.ObjectMap.prefixKeys([].concat(_toConsumableArray(_ObjectMap.ObjectMap.keys(_moduleActionTypes.moduleActionTypes)), _toConsumableArray(_ObjectMap.ObjectMap.keys(_proxyActionTypes.proxyActionTypes)), ['syncClosed', 'syncMinimized', 'syncSize', 'syncFocus', 'syncPosition', 'showAdapter']), 'adapterModuleCore');
exports.baseActionTypes = baseActionTypes;
var _default = baseActionTypes;
exports["default"] = _default;
//# sourceMappingURL=baseActionTypes.js.map
