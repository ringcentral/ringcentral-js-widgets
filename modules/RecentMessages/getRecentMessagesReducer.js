'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.getContactsReducer = getContactsReducer;
exports.getMessagesReducer = getMessagesReducer;
exports.getMessageStatusReducer = getMessageStatusReducer;
exports.default = getRecentMessagesReducer;

var _redux = require('redux');

var _messageStatus = require('./messageStatus');

var _messageStatus2 = _interopRequireDefault(_messageStatus);

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContactsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        contact = _ref.contact,
        sessionId = _ref.sessionId;

    var contactId = String(contact && contact.id);
    if (type === types.loadSuccess) {
      return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, sessionId ? contactId + '-' + sessionId : contactId, contact));
    } else if (type === types.loadReset) {
      var _ = state[sessionId ? contactId + '-' + sessionId : contactId],
          rest = (0, _objectWithoutProperties3.default)(state, [sessionId ? contactId + '-' + sessionId : contactId]);

      return rest;
    }
    return state;
  };
}

function getMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        contact = _ref2.contact,
        messages = _ref2.messages,
        sessionId = _ref2.sessionId;

    var contactId = String(contact && contact.id);
    if (type === types.loadSuccess) {
      return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, sessionId ? contactId + '-' + sessionId : contactId, messages));
    } else if (type === types.loadReset) {
      var _ = state[sessionId ? contactId + '-' + sessionId : contactId],
          rest = (0, _objectWithoutProperties3.default)(state, [sessionId ? contactId + '-' + sessionId : contactId]);

      return rest;
    }
    return state;
  };
}

function getMessageStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type;

    switch (type) {
      case types.initLoad:
        return _messageStatus2.default.loading;
      case types.loadReset:
      case types.loadSuccess:
        return _messageStatus2.default.loaded;
      default:
        return state;
    }
  };
}

function getRecentMessagesReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    contacts: getContactsReducer(types),
    messages: getMessagesReducer(types),
    messageStatus: getMessageStatusReducer(types)
  });
}
//# sourceMappingURL=getRecentMessagesReducer.js.map
