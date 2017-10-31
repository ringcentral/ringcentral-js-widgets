'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getMessageStoreStatusReducer = getMessageStoreStatusReducer;
exports.default = getMessageStoreReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _messageStoreStatus = require('./messageStoreStatus');

var _messageStoreStatus2 = _interopRequireDefault(_messageStoreStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMessageStoreStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _messageStoreStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.sync:
        return _messageStoreStatus2.default.syncing;
      case types.syncError:
      case types.syncSuccess:
        return _messageStoreStatus2.default.idle;
      default:
        return state;
    }
  };
}

function getMessageStoreReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    messageStoreStatus: getMessageStoreStatusReducer(types)
  }));
}
//# sourceMappingURL=getMessageStoreReducer.js.map
