"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilenameMap = getFilenameMap;
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Returns a map of chunk names to their corresponding filename based on the given compilation and chunkInfoMap.
 *
 * @param compilation - The webpack compilation object.
 * @param chunkInfoMap - A map of chunk names to their corresponding asset info.
 * @returns A map of chunk names to their corresponding filename.
 */
function getFilenameMap(compilation, chunkInfoMap) {
  var assetsInfo = compilation.assetsInfo;
  var infoList = Array.from(assetsInfo.entries());
  var filenameMap = new Map();
  chunkInfoMap.forEach(function (value, key) {
    var _value$fullhash, _value$contenthash, _value$modulehash, _value$chunkhash, _infoList$infoIndex;
    var fullhash = value === null || value === void 0 ? void 0 : (_value$fullhash = value.fullhash) === null || _value$fullhash === void 0 ? void 0 : _value$fullhash.toString();
    var contenthash = value === null || value === void 0 ? void 0 : (_value$contenthash = value.contenthash) === null || _value$contenthash === void 0 ? void 0 : _value$contenthash.toString();
    var modulehash = value === null || value === void 0 ? void 0 : (_value$modulehash = value.modulehash) === null || _value$modulehash === void 0 ? void 0 : _value$modulehash.toString();
    var chunkhash = value === null || value === void 0 ? void 0 : (_value$chunkhash = value.chunkhash) === null || _value$chunkhash === void 0 ? void 0 : _value$chunkhash.toString();
    var infoIndex = infoList.findIndex(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        _ = _ref2[0],
        asset = _ref2[1];
      var assetsFullhash = asset === null || asset === void 0 ? void 0 : asset.fullhash;
      var assetsContenthash = asset === null || asset === void 0 ? void 0 : asset.contenthash;
      var assetsModulehash = asset === null || asset === void 0 ? void 0 : asset.modulehash;
      var assetsChunkhash = asset === null || asset === void 0 ? void 0 : asset.chunkhash;
      return fullhash && fullhash === assetsFullhash || contenthash && contenthash === assetsContenthash || modulehash && modulehash === assetsModulehash || chunkhash && chunkhash === assetsChunkhash;
    });
    var filename = (_infoList$infoIndex = infoList[infoIndex]) === null || _infoList$infoIndex === void 0 ? void 0 : _infoList$infoIndex[0];
    if (filename) {
      filenameMap.set(key, filename);
    }
  });
  return filenameMap;
}
//# sourceMappingURL=getFilenameMap.js.map
