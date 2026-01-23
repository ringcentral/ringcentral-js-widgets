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
exports.PresenceItem = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _usePresenceText = require("./usePresenceText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PresenceItem = exports.PresenceItem = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var selected = _ref.selected,
    className = _ref.className,
    presenceStatus = _ref.presenceStatus,
    dndStatus = _ref.dndStatus,
    onClick = _ref.onClick,
    variant = _ref.variant,
    divider = _ref.divider;
  var name = (0, _usePresenceText.usePresenceText)({
    dndStatus: dndStatus,
    presenceStatus: presenceStatus
  });
  return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
    size: "small",
    "aria-label": name,
    ref: ref,
    selected: selected,
    className: (0, _clsx["default"])('typography-subtitleMini', className),
    onClick: onClick,
    divider: divider
  }, /*#__PURE__*/_react["default"].createElement(_springUi.StatusIndicator, {
    size: "medium",
    variant: variant,
    className: "mr-3"
  }), /*#__PURE__*/_react["default"].createElement("span", null, name));
});
//# sourceMappingURL=PresenceItem.js.map
