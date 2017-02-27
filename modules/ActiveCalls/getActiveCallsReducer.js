'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data;

    switch (type) {
      case types.fetchSuccess:
        return data.map(function (call) {
          return (0, _callLogHelpers.normalizeStartTime)((0, _removeUri2.default)(call));
        }).sort(_callLogHelpers.sortByStartTime);
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getActiveCallsReducer.js.map
