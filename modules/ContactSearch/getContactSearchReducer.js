'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getContactSearchStatusReducer = getContactSearchStatusReducer;
exports.getSearchingReducer = getSearchingReducer;
exports.getSearchCriteriaReducer = getSearchCriteriaReducer;
exports.default = getContactSearchReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _contactSearchStatus = require('./contactSearchStatus');

var _contactSearchStatus2 = _interopRequireDefault(_contactSearchStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContactSearchStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _contactSearchStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.search:
        return _contactSearchStatus2.default.searching;

      case types.prepareSearch:
      case types.searchSuccess:
      case types.searchError:
        return _contactSearchStatus2.default.idle;

      default:
        return state;
    }
  };
}

function getSearchingReducer(types) {
  var initialState = {
    searchOnSources: [],
    searchString: '',
    result: []
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        searchOnSources = _ref2.searchOnSources,
        searchString = _ref2.searchString,
        entities = _ref2.entities;

    switch (type) {
      case types.searchSuccess:
        if (state.searchString === searchString && state.searchOnSources.join(',') === searchOnSources.join(',')) {
          return (0, _extends3.default)({}, state, {
            result: state.result.concat(entities)
          });
        }
        return {
          searchOnSources: searchOnSources,
          searchString: searchString,
          result: entities
        };
      case types.prepareSearch:
      case types.reset:
      case types.searchError:
        return initialState;
      case types.search:
      default:
        return state;
    }
  };
}

function getSearchCriteriaReducer(types) {
  var initialState = {
    sourceName: '',
    searchText: '',
    pageNumber: 1
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        sourceName = _ref3.sourceName,
        searchText = _ref3.searchText,
        pageNumber = _ref3.pageNumber;

    switch (type) {
      case types.updateSearchCriteria:
        if (state.sourceName !== sourceName || state.searchText !== searchText || state.pageNumber !== pageNumber) {
          return {
            sourceName: sourceName,
            searchText: searchText,
            pageNumber: pageNumber
          };
        }
        return state;
      default:
        return state;
    }
  };
}

function getContactSearchReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    searchStatus: getContactSearchStatusReducer(types),
    searching: getSearchingReducer(types),
    searchCriteria: getSearchCriteriaReducer(types)
  }));
}
//# sourceMappingURL=getContactSearchReducer.js.map
