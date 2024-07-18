"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceItem = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _getPresenceStatusName = require("../../lib/getPresenceStatusName");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding-left: ", ";\n  padding-right: ", ";\n  font-size: 13px;\n\n  ", " {\n    margin-right: ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject(), (0, _juno.spacing)(2), (0, _juno.spacing)(2), _juno.RcPresence, (0, _juno.spacing)(1.5));
var PresenceItem = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
exports.PresenceItem = PresenceItem;
//# sourceMappingURL=index.js.map
