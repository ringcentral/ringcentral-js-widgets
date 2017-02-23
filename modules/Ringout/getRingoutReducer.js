'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRingoutStatusReducer = getRingoutStatusReducer;
exports.default = getRingoutReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _ringoutStatus = require('./ringoutStatus');

var _ringoutStatus2 = _interopRequireDefault(_ringoutStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRingoutStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ringoutStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.startToConnect:
        return _ringoutStatus2.default.connecting;

      case types.connectSuccess:
      case types.connectError:
        return _ringoutStatus2.default.idle;

      default:
        return state;
    }
  };
}

function getRingoutReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    ringoutStatus: getRingoutStatusReducer(types)
  });
}
//# sourceMappingURL=getRingoutReducer.js.map
