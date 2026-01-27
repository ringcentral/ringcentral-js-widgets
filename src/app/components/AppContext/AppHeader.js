"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppHeader = exports.AppHeaderNav = void 0;
var _react = require("react");
var _AppContext = require("./AppContext");
/**
 * render content at the header navigation area.
 *
 * by default that is not override the default nav header, will keep the default user avatar and title
 *
 * if you need full customize that header, set the `override` to `true` to override the default nav header.
 */
var AppHeaderNav = exports.AppHeaderNav = function AppHeaderNav(_ref) {
  var children = _ref.children,
    _ref$override = _ref.override,
    override = _ref$override === void 0 ? false : _ref$override,
    title = _ref.title,
    _ref$resetImmediately = _ref.resetImmediately,
    resetImmediately = _ref$resetImmediately === void 0 ? true : _ref$resetImmediately;
  // for non spring-ui project, just return the children
  if (process.env.THEME_SYSTEM !== 'spring-ui') {
    return children;
  }
  var _useContext =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _react.useContext)(_AppContext.AppContext),
    setNav = _useContext.setNav,
    setNavOverrideMode = _useContext.setNavOverrideMode,
    setTitle = _useContext.setTitle,
    reset = _useContext.reset,
    cancelReset = _useContext.cancelReset;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useLayoutEffect)(function () {
    cancelReset();
    setNav(children);
    setNavOverrideMode(override);
    setTitle(title);
    return function () {
      return reset(resetImmediately);
    };
  }, [children, title, override, setNavOverrideMode, setNav, setTitle, cancelReset, reset, resetImmediately]);
  return null;
};
var useAppHeader = exports.useAppHeader = function useAppHeader(_ref2) {
  var defaultNav = _ref2.defaultNav;
  var _useContext2 = (0, _react.useContext)(_AppContext.AppContext),
    nav = _useContext2.nav,
    override = _useContext2.navOverrideMode,
    title = _useContext2.title;
  return {
    nav: nav || defaultNav,
    override: override,
    title: title
  };
};
//# sourceMappingURL=AppHeader.js.map
