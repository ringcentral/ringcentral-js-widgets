"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyServerReducer;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _baseActionTypes = require("./baseActionTypes");

var _handleProxyAction = require("./handleProxyAction");

function getProxyServerReducer(_ref) {
  var moduleReducer = _ref.moduleReducer,
      transport = _ref.transport,
      prefix = _ref.prefix;

  var actionTypes = _ObjectMap.ObjectMap.prefixValues(_baseActionTypes.baseActionTypes, prefix);

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      target: moduleReducer(undefined, {
        type: actionTypes.initModule
      }),
      lastAction: null,
      actionNumber: -1
    };
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (!action) return state;
    var nextActionNumber = state.actionNumber + 1;
    transport.push({
      payload: {
        type: actionTypes.action,
        action: (0, _handleProxyAction.dropStates)(action),
        actionNumber: nextActionNumber
      }
    });
    return {
      target: moduleReducer(state.target, action),
      lastAction: (0, _handleProxyAction.dropStates)(action),
      actionNumber: nextActionNumber
    };
  };
}
//# sourceMappingURL=getProxyServerReducer.js.map
