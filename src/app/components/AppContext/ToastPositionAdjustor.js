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
exports.ToastPositionAdjustor = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _AppContext = require("./AppContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/**
 * ToastPositionAdjustor is a component that can adjust the toast position according to the footer height.
 *
 * normally you should use `AppFooter` for that, but if you use `ExpandedLayoutPopper`, because that render not in the App main context, that render at another portal, so you will need use this component to adjust the toast position.
 */
var ToastPositionAdjustor = exports.ToastPositionAdjustor = function ToastPositionAdjustor(_ref) {
  var children = _ref.children,
    additionalFooterHeight = _ref.additionalFooterHeight;
  var _useContext = (0, _react.useContext)(_AppContext.AppContext),
    setFooterHeight = _useContext.setFooterHeight,
    additionalFooterHeightRef = _useContext.additionalFooterHeightRef;
  var footerRef = (0, _react.useRef)(null);
  var updateHeight = function updateHeight() {
    var _footerRef$current;
    setFooterHeight((((_footerRef$current = footerRef.current) === null || _footerRef$current === void 0 ? void 0 : _footerRef$current.clientHeight) || 0) + additionalFooterHeightRef.current + (additionalFooterHeight || 0));
  };
  (0, _springUi.useResizeObserver)(footerRef, updateHeight);
  return /*#__PURE__*/_react["default"].cloneElement(children, {
    ref: footerRef
  });
};
//# sourceMappingURL=ToastPositionAdjustor.js.map
