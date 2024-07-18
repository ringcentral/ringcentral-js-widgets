"use strict";

require("core-js/modules/es.array.find");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationBarMoreMenu = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var NavigationBarMoreMenu = function NavigationBarMoreMenu(_ref) {
  var tabs = _ref.tabs,
    currentPath = _ref.currentPath,
    currentVirtualPath = _ref.currentVirtualPath,
    ChildNavigationView = _ref.childNavigationView,
    goTo = _ref.goTo;
  var dropdownMenuTab = tabs.find(function (tab) {
    return tab.childTabs && tab.isActive && tab.isActive(currentPath, currentVirtualPath);
  });
  var dropdownMenu = (dropdownMenuTab === null || dropdownMenuTab === void 0 ? void 0 : dropdownMenuTab.childTabs) || [];
  return dropdownMenu.length > 0 && ChildNavigationView ? /*#__PURE__*/_react["default"].createElement(ChildNavigationView, {
    tabs: dropdownMenu,
    goTo: goTo,
    currentPath: currentPath,
    currentVirtualPath: currentVirtualPath
  }) : null;
};
exports.NavigationBarMoreMenu = NavigationBarMoreMenu;
//# sourceMappingURL=NavigationBarMoreMenu.js.map
