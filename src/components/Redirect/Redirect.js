"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redirect = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _react = require("react");
var _hooks = require("../../hooks");
/**
 * not extend react-router-dom link, just return null and replace route though server sync
 */
var Redirect = exports.Redirect = function Redirect(props) {
  var router = (0, _hooks.useContainer)('Router');
  (0, _react.useLayoutEffect)(function () {
    router.replace(props.to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.to]);
  return null;
};
//# sourceMappingURL=Redirect.js.map
