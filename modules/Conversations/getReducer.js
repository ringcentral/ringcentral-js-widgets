"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
exports.getCorrespondentMatch = getCorrespondentMatch;
exports.getCorrespondentResponse = getCorrespondentResponse;
exports.default = getReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _messageTypes = _interopRequireDefault(require("../../enums/messageTypes"));

var _messageHelper = require("../../lib/messageHelper");

var _status = _interopRequireDefault(require("./status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getSearchInputReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$input = _ref.input,
        input = _ref$input === void 0 ? '' : _ref$input;

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
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _messageTypes.default.all;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        typeFilter = _ref2.typeFilter;

    switch (type) {
      case types.updateTypeFilter:
        return typeFilter;

      case types.resetSuccess:
        return _messageTypes.default.all;

      default:
        return state;
    }
  };
}

function getOldConversationsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
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
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status.default.idle;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type;

    switch (type) {
      case types.fetchOldConverstaions:
        return _status.default.fetching;

      case types.fetchOldConverstaionsSuccess:
      case types.fetchOldConverstaionsError:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return _status.default.idle;

      default:
        return state;
    }
  };
}

function getCurrentPageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        isIncreaseCurrentPage = _ref5.isIncreaseCurrentPage;

    switch (type) {
      case types.increaseCurrentPage:
        return state + 1;

      case types.fetchOldConverstaionsSuccess:
        return isIncreaseCurrentPage ? state + 1 : state;

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

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
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

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
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
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status.default.idle;

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type;

    switch (type) {
      case types.fetchOldMessages:
        return _status.default.fetching;

      case types.fetchOldMessagesSuccess:
      case types.fetchOldMessagesError:
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return _status.default.idle;

      default:
        return state;
    }
  };
}

function getMessageTextsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref9.type,
        text = _ref9.text,
        conversationId = _ref9.conversationId;

    switch (type) {
      case types.updateMessageText:
        return [{
          conversationId: conversationId,
          text: text
        }].concat(state.filter(function (msg) {
          return _typeof(msg) === 'object' && msg.conversationId !== conversationId;
        }));

      case types.removeMessageText:
        return state.filter(function (msg) {
          return _typeof(msg) === 'object' && msg.conversationId !== conversationId;
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
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status.default.idle;

    var _ref10 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref10.type;

    switch (type) {
      case types.reply:
        return _status.default.pushing;

      case types.replySuccess:
      case types.replyError:
        return _status.default.idle;

      default:
        return state;
    }
  };
}

function getCorrespondentMatch(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref11 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref11.type,
        _ref11$entities = _ref11.entities,
        entities = _ref11$entities === void 0 ? [] : _ref11$entities,
        _ref11$entity = _ref11.entity,
        entity = _ref11$entity === void 0 ? {} : _ref11$entity;

    switch (type) {
      case types.addEntities:
        {
          var newState = _toConsumableArray(entities);

          return newState;
        }

      case types.removeEntity:
        {
          var _newState = _toConsumableArray(state);

          var filteredState = _newState.filter(function (item) {
            return item.rawId !== entity.id && item.id !== entity.id;
          });

          return filteredState;
        }

      default:
        return state;
    }
  };
}

function getCorrespondentResponse(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref12 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref12.type,
        _ref12$responses = _ref12.responses,
        responses = _ref12$responses === void 0 ? [] : _ref12$responses,
        _ref12$phoneNumber = _ref12.phoneNumber,
        phoneNumber = _ref12$phoneNumber === void 0 ? '' : _ref12$phoneNumber;

    switch (type) {
      case types.addResponses:
        {
          var formatResponses = responses.reduce(function (accumulator, response) {
            var to = response.to,
                from = response.from,
                direction = response.direction,
                id = response.conversation.id;
            var number = direction === 'Inbound' ? from : to[0];
            phoneNumber = number.phoneNumber || number.extensionNumber;
            return _objectSpread({}, accumulator, _defineProperty({}, phoneNumber, id));
          }, {});
          return formatResponses;
        }

      case types.removeResponse:
        {
          var newState = _objectSpread({}, state);

          delete newState[phoneNumber];
          return newState;
        }

      default:
        return state;
    }
  };
}

function getReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    searchInput: getSearchInputReducer(types),
    typeFilter: getTypeFilterReducer(types),
    oldConversations: getOldConversationsReducer(types),
    currentPage: getCurrentPageReducer(types),
    fetchConversationsStatus: getFetchConversationsStatusReducer(types),
    currentConversationId: getCurrentConversationIdReducer(types),
    oldMessages: getOldMessagesReducer(types),
    fetchMessagesStatus: getFetchMessagesStatusReducer(types),
    messageTexts: getMessageTextsReducer(types),
    conversationStatus: getConversationStatusReducer(types),
    correspondentMatch: getCorrespondentMatch(types),
    correspondentResponse: getCorrespondentResponse(types)
  });
}
//# sourceMappingURL=getReducer.js.map
