'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDndStatusReducer = getDndStatusReducer;
exports.default = getPresenceReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDndStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$dndStatus = _ref.dndStatus,
        dndStatus = _ref$dndStatus === undefined ? state : _ref$dndStatus;

    switch (type) {
      case types.notification:
        return dndStatus;
      case types.fetchSuccess:
        return dndStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getPresenceReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    dndStatus: getDndStatusReducer(types)
  });
}
//# sourceMappingURL=getPresenceReducer.js.map
