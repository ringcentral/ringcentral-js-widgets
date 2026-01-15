"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DropdownNavigationView = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _DropdownNavigationItem = _interopRequireDefault(require("../DropdownNavigationItem"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var DropdownNavigation = function DropdownNavigation(_ref) {
  var tabs = _ref.tabs,
    goTo = _ref.goTo,
    currentPath = _ref.currentPath,
    currentVirtualPath = _ref.currentVirtualPath;
  var childNavigationElementRef = (0, _react.useRef)(null);
  var windowClickCountRef = (0, _react.useRef)(0);

  // TODO: should switch to Juno menu
  (0, _juno.useGlobalListener)('click', function (ev) {
    var menuElm = childNavigationElementRef.current;

    // ignore first time click, cause that first click will also trigger window click
    if (windowClickCountRef.current === 0) {
      windowClickCountRef.current = 1;
      return;
    }
    if (!menuElm ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    ev.target && (
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    menuElm === ev.target || menuElm.contains(ev.target))) {
      return;
    }
    goTo({
      virtualPath: ''
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root,
    ref: childNavigationElementRef
  }, tabs.map(function (tab, index) {
    var Icon = tab.icon;
    var ActiveIcon = tab.activeIcon;
    var active = !!(tab.isActive && tab.isActive(currentPath, currentVirtualPath) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath);
    var isReverseFillIcon = tab.path === '/contacts' && !active;
    return /*#__PURE__*/_react["default"].createElement(_DropdownNavigationItem["default"], _extends({}, tab, {
      key: index,
      onClick: function onClick() {
        goTo(tab);
      },
      active: active,
      icon: typeof Icon === 'function' ? /*#__PURE__*/_react["default"].createElement(Icon, null) : Icon,
      isReverseFillIcon: isReverseFillIcon,
      activeIcon: typeof ActiveIcon === 'function' ? /*#__PURE__*/_react["default"].createElement(ActiveIcon, null) : ActiveIcon
    }));
  }));
};

// TODO: that check should move to outside
var DropdownNavigationView = exports.DropdownNavigationView = function DropdownNavigationView(props) {
  var tabs = props.tabs;
  return tabs.length ? /*#__PURE__*/_react["default"].createElement(DropdownNavigation, props) : null;
};
var _default = exports["default"] = DropdownNavigationView;
//# sourceMappingURL=DropdownNavigationView.js.map
