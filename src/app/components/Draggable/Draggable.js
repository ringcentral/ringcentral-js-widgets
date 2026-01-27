"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Draggable = void 0;
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _px = require("@ringcentral/juno/es6/foundation/styles/px.js");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Draggable = exports.Draggable = function Draggable(_ref) {
  var children = _ref.children;
  var ref = (0, _react.useRef)(null);
  var elementPos = (0, _react.useRef)({
    x: 0,
    y: 0
  });
  var isDragging = (0, _react.useRef)(false);
  (0, _reactHooks.useHammer)(ref, function (hammer) {
    var pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 0
    });
    hammer.add(pan);
    hammer.on('pan', function (ev) {
      var elem = ev.target;
      if (!isDragging.current) {
        isDragging.current = true;
        elementPos.current.x = elem.offsetLeft;
        elementPos.current.y = elem.offsetTop;
      }
      var _ref2 = elementPos.current || {},
        x = _ref2.x,
        y = _ref2.y;
      var posX = ev.deltaX + x;
      var posY = ev.deltaY + y;
      if ((0, _utils.isCoordInViewport)(posX, posY)) {
        elem.style.left = (0, _px.px)(posX);
        elem.style.top = (0, _px.px)(posY);
      }
      if (ev.isFinal) {
        isDragging.current = false;
      }
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "draggable-root",
    ref: ref,
    "data-sign": "draggable-root"
  }, children);
};
//# sourceMappingURL=Draggable.js.map
