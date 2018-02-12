'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;

var _callLogHelpers = require('../../lib/callLogHelpers');

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data;

    switch (type) {
      case types.fetchSuccess:
        return data.map(function (call) {
          return (0, _callLogHelpers.normalizeStartTime)(call);
        }).sort(_callLogHelpers.sortByStartTime);
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getActiveCallsReducer.js.map
