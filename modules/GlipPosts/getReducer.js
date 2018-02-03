'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getGlipPostsStatusReducer = getGlipPostsStatusReducer;
exports.getGlipPostsCreateStatusReducer = getGlipPostsCreateStatusReducer;
exports.getGlipPostsStoreReducer = getGlipPostsStoreReducer;
exports.getGlipPostsInputsReducer = getGlipPostsInputsReducer;
exports.default = getGlipPostsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGlipPostsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.fetch:
        return _status2.default.fetching;
      case types.fetchError:
      case types.fetchSuccess:
        return _status2.default.idle;
      default:
        return state;
    }
  };
}

function getGlipPostsCreateStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status2.default.idle;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.create:
        return _status2.default.creating;
      case types.createError:
      case types.createSuccess:
        return _status2.default.idle;
      default:
        return state;
    }
  };
}

function getGlipPostsStoreReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref3 = arguments[1];
    var type = _ref3.type,
        groupId = _ref3.groupId,
        records = _ref3.records,
        record = _ref3.record,
        oldRecordId = _ref3.oldRecordId,
        isSendByMe = _ref3.isSendByMe;

    var newState = void 0;
    var newPosts = void 0;
    var oldPostIndex = void 0;
    switch (type) {
      case types.fetchSuccess:
        newState = (0, _extends3.default)({}, state);
        newState[groupId] = records;
        return newState;
      case types.create:
      case types.createSuccess:
      case types.createError:
        newState = (0, _extends3.default)({}, state);
        newPosts = newState[groupId] && [].concat((0, _toConsumableArray3.default)(newState[groupId])) || [];
        if (oldRecordId) {
          oldPostIndex = newPosts.findIndex(function (p) {
            return p.id === oldRecordId;
          });
        }
        if (oldPostIndex > -1) {
          newPosts.splice(oldPostIndex, 1, record);
          newState[groupId] = newPosts;
        } else if (isSendByMe) {
          oldPostIndex = newPosts.findIndex(function (p) {
            return p.creatorId === record.creatorId && p.text === record.text && p.sendStatus === _status2.default.creating;
          });
          if (oldPostIndex === -1) {
            newState[groupId] = [record].concat(newPosts);
          }
        } else {
          newState[groupId] = [record].concat(newPosts);
        }
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

function getGlipPostsInputsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref4 = arguments[1];
    var type = _ref4.type,
        groupId = _ref4.groupId,
        textValue = _ref4.textValue;

    var newState = void 0;
    switch (type) {
      case types.updatePostInput:
        newState = (0, _extends3.default)({}, state);
        newState[groupId] = {
          text: textValue
        };
        return newState;
      default:
        return state;
    }
  };
}

function getGlipPostsReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    fetchStatus: getGlipPostsStatusReducer(types),
    glipPostsStore: getGlipPostsStoreReducer(types),
    createStatus: getGlipPostsCreateStatusReducer(types),
    postInputs: getGlipPostsInputsReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map
