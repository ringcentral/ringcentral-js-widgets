"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConnector = void 0;
var _reactantShare = require("reactant-share");
var useConnector = exports.useConnector = function useConnector(selector, shallowEqual) {
  return (0, _reactantShare.useConnector)(function (container) {
    return selector(function (moduleKey) {
      return (0, _reactantShare.getRef)(container.got(_reactantShare.PortDetector)).modules[moduleKey];
    });
  }, shallowEqual);
};
//# sourceMappingURL=useConnector.js.map
