"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDropArea = void 0;
require("core-js/modules/es.array.is-array.js");
var _useEventListener = require("@ringcentral/juno/es6/foundation/hooks/useEventListener/useEventListener.js");
var _react = require("react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * provide you a easy way to support drop files to area
 * that have bug in `react-use`, so we implement that by ourself
 *
 * ref: https://github.com/streamich/react-use/blob/master/src/useDropArea.ts
 * @see https://github.com/streamich/react-use/issues/2368
 */
var useDropArea = exports.useDropArea = function useDropArea(ref, onDrop) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    disabled: false
  };
  var disabled = options.disabled;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    dragging = _useState2[0],
    setDragging = _useState2[1];
  var draggingCountRef = (0, _react.useRef)(0);
  (0, _useEventListener.useEventListener)(ref, 'dragenter', function (ev) {
    if (disabled) return;
    ev.preventDefault();
    ev.stopPropagation();
    draggingCountRef.current++;
    if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
      setDragging(true);
    }
  });
  (0, _useEventListener.useEventListener)(ref, 'dragleave', function (ev) {
    if (disabled) return;
    ev.preventDefault();
    ev.stopPropagation();
    draggingCountRef.current--;
    if (draggingCountRef.current > 0) return;
    setDragging(false);
  });
  (0, _useEventListener.useEventListener)(ref, 'dragover', function (ev) {
    if (disabled) return;
    ev.preventDefault();
    ev.stopPropagation();
  });
  (0, _useEventListener.useEventListener)(ref, 'drop', function (ev) {
    if (disabled) return;
    ev.preventDefault();
    ev.stopPropagation();
    setDragging(false);
    draggingCountRef.current = 0;
    var eventFiles = ev.dataTransfer.files;
    if (eventFiles && eventFiles.length > 0) {
      onDrop(eventFiles);
    }
  });
  return dragging;
};
//# sourceMappingURL=useDropArea.js.map
