'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageSenderStatusReducer = getMessageSenderStatusReducer;
exports.default = getMessageSenderReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _messageSenderStatus = require('./messageSenderStatus');

var _messageSenderStatus2 = _interopRequireDefault(_messageSenderStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMessageSenderStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _messageSenderStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.validate:
        return _messageSenderStatus2.default.validating;
      case types.send:
        return _messageSenderStatus2.default.sending;
      case types.sendOver:
      case types.sendError:
      case types.validateError:
      case types.validateOver:
        return _messageSenderStatus2.default.idle;
      default:
        return state;
    }
  };
}

function getMessageSenderReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    sendStatus: getMessageSenderStatusReducer(types)
  });
}
//# sourceMappingURL=getMessageSenderReducer.js.map
