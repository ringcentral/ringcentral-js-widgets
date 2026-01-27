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
exports.PortalWithCheckAgain = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/**
 * for the case that the container is not ready when the children is ready, this component will check the container again to ensure the children can be rendered.
 */
var PortalWithCheckAgain = exports.PortalWithCheckAgain = function PortalWithCheckAgain(_ref) {
  var container = _ref.container,
    children = _ref.children;
  var forceUpdate = (0, _springUi.useForceUpdate)();
  var node = container.current;
  (0, _react.useLayoutEffect)(function () {
    if (children && !node) {
      forceUpdate();
    }
  }, [children, forceUpdate, node]);
  return children && node ? /*#__PURE__*/_react["default"].createElement(_springUi.Portal, {
    container: node
  }, children) : null;
};
//# sourceMappingURL=PortalWithCheckAgain.js.map
