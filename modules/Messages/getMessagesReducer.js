'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentMessagesReducer = getCurrentMessagesReducer;
exports.getCurrentPageReducer = getCurrentPageReducer;
exports.getLastUpdatedAtReducer = getLastUpdatedAtReducer;
exports.getMessageStoreUpdatedAt = getMessageStoreUpdatedAt;
exports.getSearingStringReducer = getSearingStringReducer;
exports.getSearchingResultsReducer = getSearchingResultsReducer;
exports.default = getMessagesReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        messages = _ref.messages;

    switch (type) {
      case types.updateMessages:
        return messages;
      case types.pushMessages:
        return state.concat(messages);
      default:
        return state;
    }
  };
}

function getCurrentPageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.nextPage:
        return state + 1;
      case types.resetPage:
        return 1;
      default:
        return state;
    }
  };
}

function getLastUpdatedAtReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        updatedAt = _ref3.updatedAt;

    switch (type) {
      case types.updateLastUpdatedAt:
        {
          return updatedAt;
        }
      default:
        return state;
    }
  };
}

function getMessageStoreUpdatedAt(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        updatedAt = _ref4.updatedAt;

    switch (type) {
      case types.updateMessageStoreUpdateAt:
        {
          return updatedAt;
        }
      default:
        return state;
    }
  };
}

function getSearingStringReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref5 = arguments[1];
    var type = _ref5.type,
        searchingString = _ref5.searchingString;

    switch (type) {
      case types.updateSearchingString:
        return searchingString;
      case types.cleanSearchingString:
        return '';
      default:
        return state;
    }
  };
}

function getSearchingResultsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref6 = arguments[1];
    var type = _ref6.type,
        searchResults = _ref6.searchResults;

    switch (type) {
      case types.updateSearchResults:
        return searchResults;
      default:
        return state;
    }
  };
}

function getMessagesReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    messages: getCurrentMessagesReducer(types),
    currentPage: getCurrentPageReducer(types),
    lastUpdatedAt: getLastUpdatedAtReducer(types),
    messageStoreUpdatedAt: getMessageStoreUpdatedAt(types),
    searchingString: getSearingStringReducer(types),
    searchingResults: getSearchingResultsReducer(types)
  });
}
//# sourceMappingURL=getMessagesReducer.js.map
