"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DropdownNavigationView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _DropdownNavigationItem = _interopRequireDefault(require("../DropdownNavigationItem"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var DropdownNavigationView = function DropdownNavigationView(props) {
  var tabs = props.tabs;
  return tabs.length ? /*#__PURE__*/_react["default"].createElement(DropdownNavigation, props) : null;
};
exports.DropdownNavigationView = DropdownNavigationView;
var _default = DropdownNavigationView;
exports["default"] = _default;
//# sourceMappingURL=DropdownNavigationView.js.map
