'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSenderNumberReducer = getSenderNumberReducer;
exports.default = getCacheReducer;

var _redux = require('redux');

function getSenderNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        number = _ref.number;

    switch (type) {
      case types.updateSenderNumber:
        return number;
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getCacheReducer(types) {
  return (0, _redux.combineReducers)({
    senderNumber: getSenderNumberReducer(types)
  });
}
//# sourceMappingURL=getCacheReducer.js.map
