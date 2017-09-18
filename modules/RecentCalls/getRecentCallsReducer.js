'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.getCallsReducer = getCallsReducer;
exports.getCallStatusReducer = getCallStatusReducer;
exports.default = getRecentCallsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _callStatus = require('./callStatus');

var _callStatus2 = _interopRequireDefault(_callStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        contact = _ref.contact,
        calls = _ref.calls,
        sessionId = _ref.sessionId;

    var contactId = String(contact && contact.id);
    if (type === types.loadSuccess) {
      return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, sessionId ? contactId + '-' + sessionId : contactId, calls));
    } else if (type === types.loadReset) {
      var _ = state[sessionId ? contactId + '-' + sessionId : contactId],
          rest = (0, _objectWithoutProperties3.default)(state, [sessionId ? contactId + '-' + sessionId : contactId]);

      return rest;
    }
    return state;
  };
}

function getCallStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.initLoad:
        return _callStatus2.default.loading;
      case types.loadReset:
      case types.loadSuccess:
        return _callStatus2.default.loaded;
      default:
        return state;
    }
  };
}

function getRecentCallsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    calls: getCallsReducer(types),
    callStatus: getCallStatusReducer(types)
  });
}
//# sourceMappingURL=getRecentCallsReducer.js.map
