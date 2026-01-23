"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContainer = void 0;
var _react = require("react");
var _reactantShare = require("reactant-share");
/**
 * Get the container from the context.
 *
 * @param optional is that instance can be optional
 *
 * ### ☢️☢️☢️ if you want get some service from container, try use view module system at first, if there are cross too many modules and use in very deep level, try to use this hook.
 *
 * ### !!! if you want to get state via the hook, you should also use `useConnector` hook.
 */
var useContainer = exports.useContainer = function useContainer(moduleKey) {
  var container = (0, _react.useContext)(_reactantShare.ContainerContext);
  if (process.env.NODE_ENV !== 'production' && !container) {
    throw new Error('Container is not found');
  }
  var portDetector = container.got(_reactantShare.PortDetector);
  if (!portDetector) {
    throw new Error('PortDetector is not found');
  }
  var instance = (0, _reactantShare.getRef)(portDetector).modules[moduleKey];
  return instance;
};
//# sourceMappingURL=useContainer.js.map
