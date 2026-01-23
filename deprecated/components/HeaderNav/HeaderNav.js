"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderNav = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
var _MoreMenu = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/MoreMenu.svg"));
var _MoreMenuHover = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/MoreMenuHover.svg"));
var _combineProps = require("@ringcentral/juno/es6/foundation/utils/combineProps.js");
var _classes = require("@ringcentral/juno/es6/foundation/utils/classes.js");
var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");
var _ListItemIcon = require("@ringcentral/juno/es6/components/List/ListItemIcon/ListItemIcon.js");
var _ListItemText = require("@ringcentral/juno/es6/components/List/ListItemText/ListItemText.js");
var _Menu = require("@ringcentral/juno/es6/components/Menu/Menu/Menu.js");
var _MenuItem = require("@ringcentral/juno/es6/components/Menu/MenuItem/MenuItem.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _react = _interopRequireWildcard(require("react"));
var _NavBar = require("../NavBar");
var _excluded = ["tabs", "maxTabCount", "moreMenuLabel", "NavItemProps", "onChange", "currentPath"],
  _excluded2 = ["moreMenuSymbol"];
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var IntFullMenuClasses = (0, _classes.RcClasses)(['paper'], 'Int');
var FullMenu = (0, _styledComponents["default"])(_Menu.RcMenu)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .", " {\n    min-width: 100%;\n  }\n  ", " {\n    ", " {\n      margin-right: ", ";\n    }\n  }\n"])), IntFullMenuClasses.paper, _ListItemIcon.RcListItemIcon, _Icon.RcIcon, (0, _spacing.spacing)(3));
var HeaderNav = exports.HeaderNav = function HeaderNav(props) {
  var tabs = props.tabs,
    _props$maxTabCount = props.maxTabCount,
    maxTabLength = _props$maxTabCount === void 0 ? 5 : _props$maxTabCount,
    moreMenuLabel = props.moreMenuLabel,
    NavItemPropsProp = props.NavItemProps,
    onChange = props.onChange,
    currentPath = props.currentPath,
    rest = _objectWithoutProperties(props, _excluded);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var moreMenuRef = (0, _react.useRef)(null);
  var open = Boolean(anchorEl);
  var _useMemo = (0, _react.useMemo)(function () {
      var currTabs = tabs;
      var moreIcon = _MoreMenu["default"];
      var moreActiveIcon = _MoreMenuHover["default"];
      var moreTabs = [];
      var activeTab;
      var showMoreButton = false;
      if (tabs.length > maxTabLength) {
        showMoreButton = true;
        var showLength = maxTabLength - 1;
        moreTabs = currTabs.slice(showLength);
        currTabs = currTabs.slice(0, showLength);
        activeTab = moreTabs.find(function (tab) {
          var _tab$active;
          var isActive = (_tab$active = tab.active) !== null && _tab$active !== void 0 ? _tab$active : currentPath === tab.to;
          return isActive;
        });
        if (activeTab) {
          var _activeTab = activeTab,
            moreMenuSymbol = _activeTab.moreMenuSymbol;
          moreIcon = moreMenuSymbol;
          moreActiveIcon = moreMenuSymbol;
        }
      }
      return {
        currTabs: currTabs.map(function (_ref) {
          var moreMenuSymbol = _ref.moreMenuSymbol,
            rest = _objectWithoutProperties(_ref, _excluded2);
          return rest;
        }),
        moreIcon: moreIcon,
        moreActiveIcon: moreActiveIcon,
        moreTabs: moreTabs,
        activeTab: activeTab,
        showMoreButton: showMoreButton
      };
    }, [currentPath, maxTabLength, tabs]),
    currTabs = _useMemo.currTabs,
    moreIcon = _useMemo.moreIcon,
    moreActiveIcon = _useMemo.moreActiveIcon,
    moreTabs = _useMemo.moreTabs,
    activeTab = _useMemo.activeTab,
    showMoreButton = _useMemo.showMoreButton;
  var NavItemProps = (0, _react.useMemo)(function () {
    return (0, _combineProps.combineProps)({
      onClick: function onClick(e, path) {
        return onChange === null || onChange === void 0 ? void 0 : onChange(path);
      }
    }, NavItemPropsProp);
  }, [NavItemPropsProp, onChange]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_NavBar.NavBar, _extends({}, rest, {
    currentPath: currentPath,
    NavItemComponent: _NavBar.NavButton,
    NavItemProps: NavItemProps,
    tabs: currTabs,
    moreTab: showMoreButton && /*#__PURE__*/_react["default"].createElement(_NavBar.NavButton, {
      to: "more",
      symbol: moreIcon,
      activeSymbol: moreActiveIcon,
      active: Boolean(activeTab),
      title: moreMenuLabel || 'More Menu',
      dataSign: "moreMenu",
      ref: moreMenuRef,
      onClick: function onClick() {
        setAnchorEl(moreMenuRef.current);
      }
    })
  })), showMoreButton && /*#__PURE__*/_react["default"].createElement(FullMenu, {
    autoClose: true,
    classes: IntFullMenuClasses,
    anchorEl: anchorEl,
    open: open,
    variant: "menu",
    onClose: function onClose() {
      setAnchorEl(null);
    },
    marginThreshold: 0
  }, moreTabs.map(function (tab) {
    var title = tab.title,
      dataSign = tab.dataSign,
      symbol = tab.symbol,
      activeSymbol = tab.activeSymbol,
      active = tab.active,
      to = tab.to,
      moreMenuSymbol = tab.moreMenuSymbol;
    var isActive = active !== null && active !== void 0 ? active : currentPath === to;
    return /*#__PURE__*/_react["default"].createElement(_MenuItem.RcMenuItem, {
      key: title,
      "data-sign": dataSign,
      title: title,
      selected: isActive,
      size: "large",
      onClick: function onClick() {
        return onChange === null || onChange === void 0 ? void 0 : onChange(to);
      },
      icon: /*#__PURE__*/_react["default"].createElement(_ListItemIcon.RcListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
        size: "medium",
        symbol: isActive ? activeSymbol : symbol,
        color: "interactive.f01"
      }))
    }, /*#__PURE__*/_react["default"].createElement(_ListItemText.RcListItemText, {
      primary: title,
      primaryTypographyProps: {
        color: active ? 'interactive.f01' : 'neutral.f05'
      }
    }));
  })));
};
//# sourceMappingURL=HeaderNav.js.map
