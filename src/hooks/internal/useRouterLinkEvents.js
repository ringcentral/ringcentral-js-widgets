"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterLinkEvents = void 0;
var _useContainer = require("../useContainer");
/**
 * prevent default router click event and handle that by `Router` module to navigate to target link with tab sync
 */
var useRouterLinkEvents = exports.useRouterLinkEvents = function useRouterLinkEvents(_ref) {
  var to = _ref.to;
  var router = (0, _useContainer.useContainer)('Router');
  var onClick = function onClick(e) {
    e.preventDefault();
    if (router.currentPath !== to) {
      router.push(to);
    }
  };
  return {
    onClick: onClick
  };
};
//# sourceMappingURL=useRouterLinkEvents.js.map
