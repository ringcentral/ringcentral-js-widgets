"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDndStatusReducer = getDndStatusReducer;
exports.getLastNotDisturbDndStatusReducer = getLastNotDisturbDndStatusReducer;
exports.getPresenceStatusReducer = getPresenceStatusReducer;
exports.getUserStatusReducer = getUserStatusReducer;
exports.getMessageReducer = getMessageReducer;
exports.default = getPresenceReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _dndStatus = _interopRequireDefault(require("./dndStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDndStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$dndStatus = _ref.dndStatus,
        dndStatus = _ref$dndStatus === void 0 ? state : _ref$dndStatus;

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

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        dndStatus = _ref2.dndStatus,
        _ref2$lastDndStatus = _ref2.lastDndStatus,
        lastDndStatus = _ref2$lastDndStatus === void 0 ? state : _ref2$lastDndStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
        if (lastDndStatus !== _dndStatus.default.doNotAcceptAnyCalls && lastDndStatus !== dndStatus) {
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

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$presenceStatus = _ref3.presenceStatus,
        presenceStatus = _ref3$presenceStatus === void 0 ? state : _ref3$presenceStatus;

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

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$userStatus = _ref4.userStatus,
        userStatus = _ref4$userStatus === void 0 ? state : _ref4$userStatus;

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

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        _ref5$message = _ref5.message,
        message = _ref5$message === void 0 ? state : _ref5$message;

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
  return (0, _redux.combineReducers)(_objectSpread({}, reducers, {
    status: (0, _getModuleStatusReducer.default)(types),
    dndStatus: getDndStatusReducer(types),
    presenceStatus: getPresenceStatusReducer(types),
    userStatus: getUserStatusReducer(types),
    message: getMessageReducer(types)
  }));
}
//# sourceMappingURL=getPresenceReducer.js.map
