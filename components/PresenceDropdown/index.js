"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceDropdown = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _getPresenceStatusName = require("../../lib/getPresenceStatusName");
var _usePresenceItems2 = require("./usePresenceItems");
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var Wrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  padding-left: ", ";\n  z-index: 2;\n  cursor: pointer;\n\n  ", " {\n    box-sizing: content-box;\n  }\n"])), (0, _juno.spacing)(5), _juno.RcPresence);
var PresenceDropdown = exports.PresenceDropdown = function PresenceDropdown(_ref) {
  var userStatus = _ref.userStatus,
    dndStatus = _ref.dndStatus,
    currentLocale = _ref.currentLocale,
    setAvailable = _ref.setAvailable,
    setBusy = _ref.setBusy,
    setDoNotDisturb = _ref.setDoNotDisturb,
    setInvisible = _ref.setInvisible,
    isReady = _ref.isReady,
    className = _ref.className;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var handleClick = function handleClick(event) {
    if (!isReady) return;
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    return setAnchorEl(null);
  };
  var _usePresenceItems = (0, _usePresenceItems2.usePresenceItems)({
      currentLocale: currentLocale,
      userStatus: userStatus,
      dndStatus: dndStatus,
      onChange: function onChange(type) {
        switch (type) {
          case 'available':
            setAvailable();
            break;
          case 'busy':
            setBusy();
            break;
          case 'DND':
            setDoNotDisturb();
            break;
          case 'offline':
            setInvisible();
            break;
          default:
            break;
        }
        handleClose();
      }
    }),
    presenceElements = _usePresenceItems.elements,
    selectedItem = _usePresenceItems.selectedItem;
  var type = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.type;
  if (!type) {
    return null;
  }

  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  var title = (0, _getPresenceStatusName.getPresenceStatusName)(userStatus, dndStatus, currentLocale);
  return /*#__PURE__*/_react["default"].createElement(Wrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcPresence, {
    role: "button",
    "aria-label": "presence state",
    size: "large",
    type: type,
    title: title,
    onClick: handleClick,
    className: className
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
    open: Boolean(anchorEl),
    anchorEl: anchorEl,
    onClose: handleClose,
    "aria-label": "choice a presence state"
  }, presenceElements));
};
//# sourceMappingURL=index.js.map
