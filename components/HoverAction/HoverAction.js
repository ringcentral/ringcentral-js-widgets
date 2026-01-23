"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoverAction = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var HoverAction = exports.HoverAction = function HoverAction(_ref) {
  var children = _ref.children,
    open = _ref.open;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "hover-actions",
    className: (0, _clsx["default"])('flex gap-1 absolute right-0 top-0 h-full items-center bg-inherit transition-neutral-01-fast transition-transform pl-4 pr-2', 'group-hover:translate-x-0 group-[.sui-focus-visible-within]:translate-x-0', open ? 'translate-x-0' : 'translate-x-full')
  }, children);
};
//# sourceMappingURL=HoverAction.js.map
