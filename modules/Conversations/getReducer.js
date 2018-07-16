'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getSearchInputReducer = getSearchInputReducer;
exports.getTypeFilterReducer = getTypeFilterReducer;
exports.getOldConversationsReducer = getOldConversationsReducer;
exports.getFetchConversationsStatusReducer = getFetchConversationsStatusReducer;
exports.getCurrentPageReducer = getCurrentPageReducer;
exports.getCurrentConversationIdReducer = getCurrentConversationIdReducer;
exports.getOldMessagesReducer = getOldMessagesReducer;
exports.getFetchMessagesStatusReducer = getFetchMessagesStatusReducer;
exports.getMessageTextsReducer = getMessageTextsReducer;
exports.getConversationStatusReducer = getConversationStatusReducer;
exports.default = getReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _messageTypes = require('../../enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

var _messageHelper = require('../../lib/messageHelper');

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSearchInputReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$input = _ref.input,
        input = _ref$input === undefined ? '' : _ref$input;

    switch (type) {
      case types.updateSearchInput:
        return input;
      case types.resetSuccess:
        return '';
      default:
        return state;
    }
  };
}

function getTypeFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _messageTypes2.default.all;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        typeFilter = _ref2.typeFilter;

    switch (type) {
      case types.updateTypeFilter:
        return typeFilter;
      case types.resetSuccess:
        return _messageTypes2.default.all;
      default:
        return state;
    }
  };
}

function getOldConversationsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref3 = arguments[1];
    var type = _ref3.type,
        records = _ref3.records,
        conversationId = _ref3.conversationId;

    switch (type) {
      case types.fetchOldConverstaionsSuccess:
        return [].concat(state).concat(records.map(_messageHelper.normalizeRecord));
      case types.deleteConversation:
        return state.filter(function (c) {
          return c.conversationId !== conversationId;
        });
      case types.cleanOldConversatioans:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getFetchConversationsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status2.default.idle;
    var _ref4 = arguments[1];
    var type = _ref4.type;

    switch (type) {
      case types.fetchOldConverstaions:
        return _status2.default.fetching;
      case types.fetchOldConverstaionsSuccess:
      case types.fetchOldConverstaionsError:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return _status2.default.idle;
      default:
        return state;
    }
  };
}

function getCurrentPageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var _ref5 = arguments[1];
    var type = _ref5.type;

    switch (type) {
      case types.increaseCurrentPage:
      case types.fetchOldConverstaionsSuccess:
        return state + 1;
      case types.updateTypeFilter:
      case types.resetSuccess:
      case types.initSuccess:
      case types.resetCurrentPage:
        return 1;
      default:
        return state;
    }
  };
}

function getCurrentConversationIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref6 = arguments[1];
    var type = _ref6.type,
        conversationId = _ref6.conversationId;

    switch (type) {
      case types.updateCurrentConversationId:
        return conversationId;
      case types.initSuccess:
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getOldMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref7 = arguments[1];
    var type = _ref7.type,
        records = _ref7.records;

    switch (type) {
      case types.fetchOldMessagesSuccess:
        return [].concat(state).concat(records.map(_messageHelper.normalizeRecord));
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getFetchMessagesStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status2.default.idle;
    var _ref8 = arguments[1];
    var type = _ref8.type;

    switch (type) {
      case types.fetchOldMessages:
        return _status2.default.fetching;
      case types.fetchOldMessagesSuccess:
      case types.fetchOldMessagesError:
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return _status2.default.idle;
      default:
        return state;
    }
  };
}

function getMessageTextsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref9 = arguments[1];
    var type = _ref9.type,
        text = _ref9.text,
        conversationId = _ref9.conversationId;

    switch (type) {
      case types.updateMessageText:
        return [{ conversationId: conversationId, text: text }].concat(state.filter(function (msg) {
          return (typeof msg === 'undefined' ? 'undefined' : (0, _typeof3.default)(msg)) === 'object' && msg.conversationId !== conversationId;
        }));
      case types.removeMessageText:
        return state.filter(function (msg) {
          return (typeof msg === 'undefined' ? 'undefined' : (0, _typeof3.default)(msg)) === 'object' && msg.conversationId !== conversationId;
        });
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getConversationStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status2.default.idle;
    var _ref10 = arguments[1];
    var type = _ref10.type;

    switch (type) {
      case types.reply:
        return _status2.default.pushing;
      case types.replySuccess:
      case types.replyError:
        return _status2.default.idle;
      default:
        return state;
    }
  };
}

function getReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    searchInput: getSearchInputReducer(types),
    typeFilter: getTypeFilterReducer(types),
    oldConversations: getOldConversationsReducer(types),
    currentPage: getCurrentPageReducer(types),
    fetchConversationsStatus: getFetchConversationsStatusReducer(types),
    currentConversationId: getCurrentConversationIdReducer(types),
    oldMessages: getOldMessagesReducer(types),
    fetchMessagesStatus: getFetchMessagesStatusReducer(types),
    messageTexts: getMessageTextsReducer(types),
    conversationStatus: getConversationStatusReducer(types)
  });
}
//# sourceMappingURL=getReducer.js.map
