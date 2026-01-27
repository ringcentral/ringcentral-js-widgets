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
exports.Header = void 0;
require("core-js/modules/es.array.is-array.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _components = require("../../../components");
var _hooks = require("../../../hooks");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Header = exports.Header = function Header(_ref) {
  var title = _ref.title,
    children = _ref.children,
    menu = _ref.menuHeader,
    menuList = _ref.menuList,
    _ref$onActionClick = _ref.onActionClick,
    onActionClick = _ref$onActionClick === void 0 ? _rxjs.noop : _ref$onActionClick,
    action = _ref.action;
  var _useAppHeader = (0, _components.useAppHeader)({
      // we not have any default element to render, but keep that here to avoid user want set null
      defaultNav: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null)
    }),
    nav = _useAppHeader.nav,
    override = _useAppHeader.override,
    appTitle = _useAppHeader.title;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    fullMenuAnchor = _useState2[0],
    setFullMenuAnchor = _useState2[1];
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var avatarRoot = (0, _react.useMemo)(function () {
    if (/*#__PURE__*/_react["default"].isValidElement(children) && _react["default"].Children.count(children) === 1) {
      return /*#__PURE__*/_react["default"].cloneElement(children, {
        onClick: function onClick(e) {
          setFullMenuAnchor(e.currentTarget);
        }
      });
    }
    return children;
  }, [children]);
  (0, _react.useImperativeHandle)(action, function () {
    return {
      closeMenu: function closeMenu() {
        setFullMenuAnchor(null);
      }
    };
  }, []);
  var menuOpened = Boolean(fullMenuAnchor);
  return /*#__PURE__*/_react["default"].createElement("header", {
    className: "flex-none"
  }, override ? nav : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex relative gap-10 justify-center items-center px-3 w-full bg-neutral-base h-9"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3 justify-center items-center"
  }, avatarRoot, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-subtitle text-neutral-b0",
    "data-sign": "title"
  }, appTitle !== null && appTitle !== void 0 ? appTitle : title)), /*#__PURE__*/_react["default"].createElement("i", {
    className: "flex-auto"
  }), /*#__PURE__*/_react["default"].createElement("nav", {
    className: "flex gap-3 justify-center items-center"
  }, nav)),
  // TODO: spring-ui Menu in test show how never close, so we hide that in test
  (process.env.NODE_ENV === 'test' && menuOpened || process.env.NODE_ENV !== 'test') && /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    PopperProps: {
      role: 'menu',
      'aria-label': 'user information'
    },
    variant: "pointed",
    open: menuOpened
    // eslint-disable-next-line jsx-a11y/no-autofocus
    ,
    autoFocus: false,
    anchorEl: fullMenuAnchor,
    onClose: function onClose() {
      setFullMenuAnchor(null);
    }
  }, menu, /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, menuList, /*#__PURE__*/_react["default"].createElement(_springUi.MenuDivider, null), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    onClick: function onClick() {
      onActionClick('logout');
    },
    classes: {
      container: 'justify-center gap-3 p-0 min-h-4',
      root: 'px-3 py-2 h-8'
    }
  }, t('logout'))))));
};
//# sourceMappingURL=Header.js.map
