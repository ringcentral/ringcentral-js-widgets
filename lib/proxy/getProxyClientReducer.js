"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyClientReducer;
exports.getActionNumberReducer = getActionNumberReducer;
exports.getLastActionReducer = getLastActionReducer;
exports.getTargetReducer = getTargetReducer;

var _redux = require("redux");

var _handleProxyAction = require("./handleProxyAction");

function getLastActionReducer(_ref) {
  var types = _ref.types;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        action = _ref2.action,
        lastAction = _ref2.lastAction;

    switch (type) {
      case types.action:
        return (0, _handleProxyAction.dropStates)(action);

      case types.sync:
        return (0, _handleProxyAction.dropStates)(lastAction);

      default:
        return state;
    }
  };
}

function getActionNumberReducer(_ref3) {
  var types = _ref3.types;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        actionNumber = _ref4.actionNumber;

    switch (type) {
      case types.action:
      case types.sync:
        return actionNumber !== null && actionNumber !== void 0 ? actionNumber : state;

      default:
        return state;
    }
  };
}

function getTargetReducer(_ref5) {
  var targetReducer = _ref5.targetReducer,
      types = _ref5.types;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : targetReducer(undefined, {
      type: types.initModule
    });

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        target = _ref6.target,
        action = _ref6.action;

    switch (type) {
      case types.action:
        return targetReducer(state, action);

      case types.sync:
        return target;

      default:
        return state;
    }
  };
}

function getProxyClientReducer(_ref7) {
  var targetReducer = _ref7.targetReducer,
      proxyReducer = _ref7.proxyReducer,
      types = _ref7.types;
  return (0, _redux.combineReducers)({
    target: getTargetReducer({
      targetReducer: targetReducer,
      types: types
    }),
    proxy: proxyReducer,
    lastAction: getLastActionReducer({
      types: types
    }),
    actionNumber: getActionNumberReducer({
      types: types
    })
  });
}
//# sourceMappingURL=getProxyClientReducer.js.map
