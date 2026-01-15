"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceItem = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _getPresenceStatusName = require("../../lib/getPresenceStatusName");
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding-left: ", ";\n  padding-right: ", ";\n  font-size: 13px;\n\n  ", " {\n    margin-right: ", ";\n  }\n"])), (0, _juno.spacing)(2), (0, _juno.spacing)(2), _juno.RcPresence, (0, _juno.spacing)(1.5));
var PresenceItem = exports.PresenceItem = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var selected = _ref.selected,
    classNameProp = _ref.className,
    userStatus = _ref.userStatus,
    dndStatus = _ref.dndStatus,
    onClick = _ref.onClick,
    type = _ref.type,
    currentLocale = _ref.currentLocale;
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  var name = (0, _getPresenceStatusName.getPresenceStatusName)(userStatus, dndStatus, currentLocale);
  return /*#__PURE__*/_react["default"].createElement(StyledListItem, {
    ref: ref,
    selected: selected,
    disableGutters: true,
    className: classNameProp,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcPresence, {
    size: "medium",
    type: type
  }), /*#__PURE__*/_react["default"].createElement("span", null, name));
});
//# sourceMappingURL=index.js.map
