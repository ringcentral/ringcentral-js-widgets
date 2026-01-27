"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
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
exports.useAnnouncementHeight = exports.AppAnnouncementRender = exports.AppAnnouncement = void 0;
require("core-js/modules/es.array.is-array.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _AppContext = require("./AppContext");
var _PortalWithCheckAgain = require("./PortalWithCheckAgain");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var AppAnnouncementRender = exports.AppAnnouncementRender = function AppAnnouncementRender(_ref) {
  var children = _ref.children;
  var _useContext = (0, _react.useContext)(_AppContext.AppContext),
    announcementRef = _useContext.announcementRef,
    announcementBottomAnchorRef = _useContext.announcementBottomAnchorRef;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    ref: announcementRef
  }, children), /*#__PURE__*/_react["default"].createElement("div", {
    ref: announcementBottomAnchorRef,
    className: "w-full h-0"
  }));
};

/**
 * render content at the announcement content area.
 */
var AppAnnouncement = exports.AppAnnouncement = function AppAnnouncement(_ref2) {
  var children = _ref2.children;
  var _useContext2 = (0, _react.useContext)(_AppContext.AppContext),
    announcementRef = _useContext2.announcementRef;
  return /*#__PURE__*/_react["default"].createElement(_PortalWithCheckAgain.PortalWithCheckAgain, {
    container: announcementRef
  }, children);
};
var useAnnouncementHeight = exports.useAnnouncementHeight = function useAnnouncementHeight() {
  var _announcementRef$curr;
  var _useContext3 = (0, _react.useContext)(_AppContext.AppContext),
    announcementRef = _useContext3.announcementRef;
  var _useState = (0, _react.useState)(((_announcementRef$curr = announcementRef.current) === null || _announcementRef$curr === void 0 ? void 0 : _announcementRef$curr.clientHeight) || 0),
    _useState2 = _slicedToArray(_useState, 2),
    height = _useState2[0],
    setHeight = _useState2[1];
  (0, _springUi.useResizeObserver)(announcementRef, function () {
    var _announcementRef$curr2;
    setHeight(((_announcementRef$curr2 = announcementRef.current) === null || _announcementRef$curr2 === void 0 ? void 0 : _announcementRef$curr2.clientHeight) || 0);
  }, {
    mode: 'none'
  });
  return height;
};
//# sourceMappingURL=AppAnnouncement.js.map
