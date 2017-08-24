'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getDndStatusReducer = getDndStatusReducer;
exports.getLastNotDisturbDndStatusReducer = getLastNotDisturbDndStatusReducer;
exports.getPresenceStatusReducer = getPresenceStatusReducer;
exports.getUserStatusReducer = getUserStatusReducer;
exports.getMessageReducer = getMessageReducer;
exports.default = getPresenceReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _dndStatus = require('./dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

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
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.updateError:
      case types.update:
        return dndStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getLastNotDisturbDndStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        dndStatus = _ref2.dndStatus,
        _ref2$lastDndStatus = _ref2.lastDndStatus,
        lastDndStatus = _ref2$lastDndStatus === undefined ? state : _ref2$lastDndStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
        if (lastDndStatus !== _dndStatus2.default.doNotAcceptAnyCalls && lastDndStatus !== dndStatus) {
          return lastDndStatus;
        }
        return state;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getPresenceStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$presenceStatus = _ref3.presenceStatus,
        presenceStatus = _ref3$presenceStatus === undefined ? state : _ref3$presenceStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
        return presenceStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getUserStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        _ref4$userStatus = _ref4.userStatus,
        userStatus = _ref4$userStatus === undefined ? state : _ref4$userStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
      case types.updateError:
        return userStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getMessageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        _ref5$message = _ref5.message,
        message = _ref5$message === undefined ? state : _ref5$message;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
        return message;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getPresenceReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    dndStatus: getDndStatusReducer(types),
    presenceStatus: getPresenceStatusReducer(types),
    userStatus: getUserStatusReducer(types),
    message: getMessageReducer(types)
  }));
}
//# sourceMappingURL=getPresenceReducer.js.map
